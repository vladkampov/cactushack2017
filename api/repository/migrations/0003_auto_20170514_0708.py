# -*- coding: utf-8 -*-
# Generated by Django 1.11.1 on 2017-05-14 07:08
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('repository', '0002_auto_20170514_0420'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='track',
            unique_together=set([('repository', 'title')]),
        ),
    ]
