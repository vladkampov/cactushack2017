from django.contrib.auth import get_user_model
from django.db import models


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

    @classmethod
    def create(cls, title, owner):
        obj = cls(title=title, owner=owner)
        obj.save()


class Commit(models.Model):
    description = models.TextField()
    hash = models.CharField(max_length=45, primary_key=True)
    time = models.DateTimeField(auto_now_add=True)
    track = models.ForeignKey(Repository, related_name='commits')

    def __str__(self):
        return "%s - %s" % (self.description, self.track.title)


class Track(models.Model):
    """Represent single track in repository.
    """
    instrument = models.CharField(max_length=256)
    abc_score = models.TextField()
    tempo = models.IntegerField()
    repository = models.ForeignKey(Repository, related_name="tracks")


class Comment(models.Model):
    """Represent comment to any track measure.
    """
    text = models.CharField(max_length=100)
    track = models.ForeignKey(Track, related_name="comments")
