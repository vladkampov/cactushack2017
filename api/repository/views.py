import os

import git
from repository.converters.gtp2abc import convert as gtp2abc
from repository.models import Repository, Commit, Track
from repository.serializers import RepositorySerializer, CommitSerializer, TrackSerializer
from rest_framework import viewsets


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
        queryset = Commit.objects.all()
        commiter = self.request.query_params.get('commiter', None)
        if commiter is not None:
            queryset = queryset.filter(commiter__username=commiter)
        repository = self.request.query_params.get('repository', None)

        if repository is not None:
            queryset = queryset.filter(repository__title=repository)
        return queryset


class TrackViewSet(viewsets.ModelViewSet):
    serializer_class = TrackSerializer

    def get_queryset(self):
        queryset = Track.objects.all()
        repository = self.request.query_params.get('repository', None)

        if repository is not None:
            queryset = queryset.filter(repository__title=repository)
        return queryset

    def convert(self, file):
        extension = os.path.splitext(file._get_name())[-1]
        if extension == "gt5":
            return gtp2abc(file)
        return file.read()

    def create(self, request):
        file = request.data['file']
        tracks = self.convert(file)
        repository = Repository.objects.get(title=request.data['repository'],
                                            owner=request.user)
        files_list = []
        for track_title, score in tracks.items():
            # Save file to disk
            file_path = os.path.join(repository.path_to_repo, track_title)
            files_list.append(file_path)

            with open(file_path, "w") as text_file:
                print(score, file=text_file)

            Track.objects.create(title=track_title)

        # Add files to commit
        index = repository.git_repository.index
        index.add(files_list)
        author = git.Actor(repository.owner.username, "test@test.com")
        committer = git.Actor(request.user.username, "test@test.com")
        commit_message = "Added tracks: {}".format(tracks.keys())
        commit = index.commit(message=commit_message,
                              author=author,
                              committer=committer)

        # Create Commit object
        Commit.objects.create(message=commit_message,
                              committer=request.user.username,
                              repository=repository,
                              hash=commit.hexsha)
