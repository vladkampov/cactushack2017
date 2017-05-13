import os

import git
from django.contrib.auth import get_user_model
from rest_framework import serializers

from repository.models import Repository, Commit, Track


class RepositorySerializer(serializers.ModelSerializer):
    owner = serializers.CharField()

    class Meta:
        model = Repository
        fields = ('title', 'owner', 'description')

    def create(self, validated_data):
        validated_data['owner'] = get_user_model().objects.get(username=validated_data['owner'])
        obj = Repository.objects.create(**validated_data)

        # Create empty Git repository
        git.Repo.init(obj.path_to_repo, bare=True)
        return obj


class CommitSerializer(serializers.ModelSerializer):
    repository = serializers.CharField()

    class Meta:
        model = Commit
        fields = ('commiter', 'message', 'repository')

    def create(self, validated_data):
        repository = Repository.objects.get(title=validated_data['repository'],
                                            owner__username=validated_data['commiter'])

        get_repo = repository.git_repository
        index = get_repo.index
        files = os.listdir(repository.path_to_repo)
        index.add(files)

        author = git.Actor(repository.owner.username, "test@test.com")
        committer = git.Actor(validated_data['commiter'], "test@test.com")
        # commit by commit message and author and committer
        index.commit(validated_data['message'], author=author, committer=committer)

        obj = Commit.objects.create(message=validated_data['message'],
                                    committer=validated_data['commiter'],
                                    repository=repository)
        return obj
