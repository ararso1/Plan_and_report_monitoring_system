# Generated by Django 4.2.1 on 2024-05-09 07:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('comApp', '0002_alter_chatmessage_options_remove_chatmessage_user'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='chatmessage',
            options={'ordering': ['date'], 'verbose_name_plural': 'Message'},
        ),
    ]
