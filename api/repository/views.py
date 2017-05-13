from repository.models import Repository, Commit, Track
from repository.serializers import RepositorySerializer, CommitSerializer
from rest_framework import viewsets


class RepositoryViewSet(viewsets.ModelViewSet):
    serializer_class = RepositorySerializer

    def get_queryset(self):
        queryset = Repository.objects.all()
        owner = self.request.query_params.get('owner', None)
        if owner is not None:
            queryset = queryset.filter(owner__username=owner)
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
