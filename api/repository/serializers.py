import os

import git
from django.contrib.auth import get_user_model
from rest_framework import serializers

from repository.models import Repository, Commit, Track


class CommitSerializer(serializers.ModelSerializer):
    repository = serializers.CharField()

    class Meta:
        model = Commit
        fields = ('commiter', 'message', 'repository')

    def create(self, validated_data):
        repository = Repository.objects.get(title=validated_data['repository'],
                                            owner__username=validated_data['commiter'])

        git_repo = repository.git_repository
        index = git_repo.index
        files = os.listdir(repository.path_to_repo)
        index.add(files)

        author = git.Actor(repository.owner.username, "test@test.com")
        committer = git.Actor(validated_data['commiter'], "test@test.com")
        # commit by commit message and author and committer
        commit = index.commit(validated_data['message'], author=author, committer=committer)

        obj = Commit.objects.create(message=validated_data['message'],
                                    committer=validated_data['commiter'],
                                    repository=repository,
                                    hash=commit.hexsha)
        return obj


class TrackSerializer(serializers.ModelSerializer):
    repository = serializers.CharField()

    class Meta:
        model = Track
        fields = ('instrument', 'abc_score', 'repository')


class RepositorySerializer(serializers.ModelSerializer):
    owner = serializers.CharField()
    description = serializers.CharField(allow_blank=True, required=False)
    tracks = TrackSerializer(many=True, read_only=True)
    commits = CommitSerializer(many=True, read_only=True)

    class Meta:
        model = Repository
        fields = ('title', 'owner', 'description', 'tracks', 'commits')

    def create(self, validated_data):
        print(validated_data)
        validated_data['owner'] = get_user_model().objects.get(username=validated_data['owner'])
        obj = Repository.objects.create(**validated_data)

        # Create empty Git repository
        git.Repo.init(obj.path_to_repo, bare=True)
        return obj
