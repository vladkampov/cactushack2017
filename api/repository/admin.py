from django.contrib import admin
from .models import Repository, Commit, Track


@admin.register(Repository)
class RepositoryAdmin(admin.ModelAdmin):
    pass


@admin.register(Commit)
class CommitAdmin(admin.ModelAdmin):
    pass


@admin.register(Track)
class TrackAdmin(admin.ModelAdmin):
    pass
