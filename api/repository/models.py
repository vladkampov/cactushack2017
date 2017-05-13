import os
import shutil

from django.contrib.auth import get_user_model
from django.conf import settings
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.db import models
from django.db.models.signals import pre_delete
from django.dispatch import receiver
import git


class Repository(models.Model):
    """Represent GuitarPro track with possble multiple tracks.
    """
    title = models.CharField(max_length=256)
    owner = models.ForeignKey(get_user_model(), related_name="repository_owner")
    collaborators = models.ManyToManyField(get_user_model(), blank=True)
    description = models.TextField(default="")
    # tracks is field for Tracks model, that has reverse connection
    # commits is field for Commits model, that has reverse connection

    class Meta:
        unique_together = ('owner', 'title')

    def __str__(self):
        return "%s - %s" % (self.owner.username, self.title)

    @property
    def path_to_repo(self):
        return os.path.join(settings.GIT_ROOT, self.title)

    @property
    def git_repository(self):
        return git.Repo(self.path_to_repo)


@receiver(pre_delete, sender=Repository)
def repo_delete(sender, instance, **kwargs):
    shutil.rmtree(instance.path_to_repo)


class Track(models.Model):
    """Represent single track in repository.
    """
    instrument = models.CharField(max_length=256)
    abc_score = models.TextField()
    tempo = models.IntegerField()
    repository = models.ForeignKey(Repository, related_name="tracks")


class Commit(models.Model):
    message = models.TextField()
    hash = models.CharField(max_length=45, primary_key=True)
    time = models.DateTimeField(auto_now_add=True)
    repository = models.ForeignKey(Repository, related_name='commits')
    commiter = models.CharField(max_length=100)

    def __str__(self):
        return "%s - %s" % (self.description, self.track.title)


class Comment(models.Model):
    """Represent comment to any track measure.
    """
    text = models.CharField(max_length=100)
    track = models.ForeignKey(Track, related_name="comments")
