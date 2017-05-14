import os

import git
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser

from repository.converters.gtp2abc import convert as gtp2abc
from repository.models import Repository, Commit, Track
from repository.serializers import RepositorySerializer, CommitSerializer, TrackSerializer


class RepositoryViewSet(viewsets.ModelViewSet):
    serializer_class = RepositorySerializer

    def get_queryset(self):
        queryset = Repository.objects.all()
        owner = self.request.query_params.get('owner', None)
        if owner is not None:
            queryset = queryset.filter(owner__username=owner)

        title = self.request.query_params.get('title', None)
        if title is not None:
            queryset = queryset.filter(title=title)
        return queryset


class CommitViewSet(viewsets.ModelViewSet):
    serializer_class = CommitSerializer

    def get_queryset(self):
        queryset = Commit.objects.all().order_by('-time')
        commiter = self.request.query_params.get('commiter', None)
        if commiter is not None:
            queryset = queryset.filter(commiter__username=commiter)
        repository = self.request.query_params.get('repository', None)

        if repository is not None:
            queryset = queryset.filter(repository__title=repository)
        return queryset


class TrackViewSet(viewsets.ModelViewSet):
    serializer_class = TrackSerializer
    parser_classes = (MultiPartParser, FormParser,)

    def get_queryset(self):
        queryset = Track.objects.all()
        repository = self.request.query_params.get('repository', None)

        if repository is not None:
            queryset = queryset.filter(repository__title=repository)

        username = self.request.query_params.get('username', None)

        if username is not None:
            queryset = queryset.filter(username__title=username)
        return queryset

    def convert(self, file):
        extension = os.path.splitext(file._get_name())[-1]
        if extension == ".gp5":
            return gtp2abc(file)
        return {'Track': file.read()}

    def create_or_update(self, request, update=False):
        file = request.data['file']
        tracks = self.convert(file)
        repository = Repository.objects.get(title=request.data['repository'],
                                            owner=request.user)
        files_list = []
        created_tracks = []
        for track_title, score in tracks.items():
            # Save file to disk
            file_path = os.path.join(repository.path_to_repo, track_title)
            files_list.append(file_path)

            with open(file_path, "w") as text_file:
                print(score, file=text_file)

            if not update:
                created_tracks.append(Track.objects.create(title=track_title, repository=repository))

        # Add files to commit
        index = repository.git_repository.index
        index.add(files_list)
        author = git.Actor(repository.owner.username, "test@test.com")
        commiter = git.Actor(request.user.username, "test@test.com")
        commit_message = "Added tracks: {}".format(tracks.keys())
        commit = index.commit(message=commit_message,
                              author=author,
                              committer=commiter)

        # Create Commit object
        Commit.objects.create(message=commit_message,
                              commiter=request.user.username,
                              repository=repository,
                              hash=commit.hexsha)
        return created_tracks

    def create(self, request):
        update = request.data.get('update')
        file = request.data['file']
        tracks = self.convert(file)
        repository = Repository.objects.get(title=request.data['repository'],
                                            owner=request.user)
        files_list = []
        created_tracks = []
        for track_title, score in tracks.items():
            # Save file to disk
            file_path = os.path.join(repository.path_to_repo, track_title)
            files_list.append(file_path)

            with open(file_path, "w") as text_file:
                print(score, file=text_file)

            if not update:
                created_tracks.append(Track.objects.create(title=track_title, repository=repository))

        # Add files to commit
        index = repository.git_repository.index
        index.add(files_list)
        author = git.Actor(repository.owner.username, "test@test.com")
        commiter = git.Actor(request.user.username, "test@test.com")
        commit_message = request.data.get('desription') or "Added tracks: {}".format(tracks.keys())
        commit = index.commit(message=commit_message,
                              author=author,
                              committer=commiter)

        # Create Commit object
        Commit.objects.create(message=commit_message,
                              commiter=request.user.username,
                              repository=repository,
                              hash=commit.hexsha)
        if update:
            tracks = Track.objects.filter(repository__owner=request.user,
                                          repository__title=request.data['repository'])
            serializer = self.get_serializer(list(tracks), many=True)
        else:
            serializer = self.get_serializer(created_tracks, many=True)
        return Response(serializer.data)

    def update(self, request, pk=None):
        self.create_or_update(request, update=True)
        tracks = Track.objects.filter(repository__owner=request.user,
                                      repository__title=request.data['repository'])
        serializer = self.get_serializer(list(tracks), many=True)
        return Response(serializer.data)


class RepositoryDiffView(APIView):
    def get(self, request, format=None):
        old_commit_hash = request.query_params['old_commit']
        new_commit_hash = request.query_params['new_commit']

        git_repo = Commit.objects.get(hash=new_commit_hash).repository.git_repository
        new_commit = git_repo.commit(new_commit_hash)
        diff = new_commit.diff(old_commit_hash, create_patch=True)[0].diff.decode()
        # I'm sorry
        before, after = diff.split('-b')[-1].split('+b')
        before = before.split('/n')
        after = after.split('/n')

        old_diffs = set(before.split('|')) - set(after.split('|'))
        new_diffs = set(after.split('|')) - set(before.split('|'))
        result = {
            'sources': {
                'before': git_repo.git.show('{}:{}'.format(old_commit_hash, "Track")),
                'after': git_repo.git.show('{}:{}'.format(new_commit_hash, "Track")),
            },
            'changes': {
                'before': [before.split('|').index(item) for item in old_diffs],
                'after': [after.split('|').index(item) for item in new_diffs],
            }
        }

        return Response(result)
