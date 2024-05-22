# Generated by Django 4.2.1 on 2024-05-08 09:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('roleApp', '0002_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='permission',
            name='added_by',
        ),
        migrations.RemoveField(
            model_name='permission',
            name='grouped_id',
        ),
        migrations.RemoveField(
            model_name='permissiongroup',
            name='added_by',
        ),
        migrations.RemoveField(
            model_name='permissiongroup',
            name='permissions',
        ),
        migrations.RemoveField(
            model_name='role',
            name='added_by',
        ),
        migrations.RemoveField(
            model_name='role',
            name='division_id',
        ),
        migrations.RemoveField(
            model_name='role',
            name='monitoring_id',
        ),
        migrations.RemoveField(
            model_name='role',
            name='permission_id',
        ),
        migrations.RemoveField(
            model_name='role',
            name='sector_id',
        ),
        migrations.RemoveField(
            model_name='role',
            name='updated_by',
        ),
        migrations.RemoveField(
            model_name='rolepermission',
            name='added_by',
        ),
        migrations.RemoveField(
            model_name='rolepermission',
            name='permission_id',
        ),
        migrations.RemoveField(
            model_name='rolepermission',
            name='role_id',
        ),
        migrations.RemoveField(
            model_name='userpermission',
            name='added_by',
        ),
        migrations.RemoveField(
            model_name='userpermission',
            name='permission_id',
        ),
        migrations.RemoveField(
            model_name='userpermission',
            name='user_id',
        ),
        migrations.RemoveField(
            model_name='userrole',
            name='added_by',
        ),
        migrations.RemoveField(
            model_name='userrole',
            name='role_id',
        ),
        migrations.RemoveField(
            model_name='userrole',
            name='updated_by',
        ),
        migrations.RemoveField(
            model_name='userrole',
            name='user_id',
        ),
        migrations.DeleteModel(
            name='AuditLog',
        ),
        migrations.DeleteModel(
            name='Permission',
        ),
        migrations.DeleteModel(
            name='PermissionGroup',
        ),
    ]