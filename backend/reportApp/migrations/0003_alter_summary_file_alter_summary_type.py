# Generated by Django 4.2.11 on 2024-05-13 06:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reportApp', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='summary',
            name='file',
            field=models.FileField(blank=True, null=True, upload_to='kpi_files'),
        ),
        migrations.AlterField(
            model_name='summary',
            name='type',
            field=models.CharField(blank=True, max_length=450, null=True),
        ),
    ]
