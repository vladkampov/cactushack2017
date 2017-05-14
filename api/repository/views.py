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
                if isinstance(score, bytes):
                    score = score.decode()
                print(score, file=text_file)

            if not update:
                created_tracks.append(Track.objects.create(title=track_title, repository=repository))

        # Add files to commit
        index = repository.git_repository.index
        index.add(files_list)
        author = git.Actor(repository.owner.username, "test@test.com")
        commiter = git.Actor(request.user.username, "test@test.com")
        commit_message = request.data.get('message') or "Added tracks: {}".format(tracks.keys())
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


class RepositoryDiffView(APIView):
    def get(self, request, format=None):
        old_commit_hash = request.query_params['old_commit']
        new_commit_hash = request.query_params['new_commit']

        git_repo = Commit.objects.get(hash=new_commit_hash).repository.git_repository

        old_source = git_repo.git.show('{}:{}'.format(old_commit_hash, "Track"))
        new_source = git_repo.git.show('{}:{}'.format(new_commit_hash, "Track"))
        result = {
            'sources': {
                'before': old_source,
                'after': new_source,
            }
        }

        # #new_commit = git_repo.commit(new_commit_hash)
        # #diff = new_commit.diff(old_commit_hash, create_patch=True)[0].diff.decode()
        # # I'm sorry
        # diffs = {
        #     'before': [],
        #     'after': []
        # }

        # new_source = new_source.split('|')
        # old_source = old_source.split('|')
        # for i in len(new_source):
        #     if new_source[i] != old_source[i]:
        #         new_chords = new_source[i].split(" ")
        #         old_chords = old_source[i].split(" ")
        #         for j in len(new_source):
        #             if new_chords[j] != new_chords[j]:


        # measures = {}
        # cur_measure = 0
        # buf = ""
        # sign = ""
        # drop_sign = False
        # for i, char in enumerate(diff):
        #     if char in ['+', '-']:
        #         sign = char
        #     elif char == '\\' and diff[i+1] == "n":
        #         drop_sign = True
        #     elif char == '|':
        #         measures[cur_measure] = (sign, buf)
        #         if drop_sign:
        #             sign = ""
        #         cur_measure += 1
        #         buf = ""
        #     else:
        #         buf += char

        # print(diff)
        # print(measures)
        # for i, measure in measures.items():
        #     if measure[0] == '-' and i < len(measures) and measures[i+1][0] == '+':
        #         next_line = measures[i+1][1]
        #         line = measure[1]

        #         line_diffs = set(line.split(' ')) - set(next_line.split(' '))
        #         next_line_diffs = set(next_line.split(' ')) - set(line.split(' '))

        #         diffs['before'] = [(i, line.split(' ').index(item)) for item in line_diffs]
        #         diffs['after'] = [(i, next_line.split(' ').index(item)) for item in next_line_diffs]

        # for i, line in enumerate(diff):
        #     if line.startswith('-') and i < len(diff) and diff[i+1].startswith('+'):
        #             # Cut +-
        #             next_line = diff[i+1][1:]
        #             line = line[1:]

        #             line_diffs = set(line.split(' ')) - set(next_line.split(' '))
        #             next_line_diffs = set(next_line.split(' ')) - set(line.split(' '))

        #             diffs['before'] = [(i, line.split(' ').index(item)) for item in line_diffs]
        #             diffs['after'] = [(i, next_line.split(' ').index(item)) for item in next_line_diffs]

            # elif line.startswith('+') and i < len(diff) and next_line.startswith('-'):
            #         # Cut +-
            #         next_line = diff[i+1][1:]
            #         line = line[1:]

            #         line_diffs = set(line.split(' ')) - set(next_line.split(' '))
            #         next_line_diffs = set(next_line.split(' ')) - set(line.split(' '))

            #         diffs['after'] = [(i, line.split(' ').index(item)) for item in line]
            #         diffs['before'] = [(i, next_line.split(' ').index(item)) for item in next_line_diffs]
        # result['diffs'] = diffs

        return Response(result)
