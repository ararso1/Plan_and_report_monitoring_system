# Generated by Django 4.2.1 on 2024-05-08 09:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userApp', '0003_permission_role_userrole_userpermission_and_more'),
        ('roleApp', '0003_remove_permission_added_by_and_more'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Role',
        ),
        migrations.DeleteModel(
            name='RolePermission',
        ),
        migrations.DeleteModel(
            name='UserPermission',
        ),
        migrations.DeleteModel(
            name='UserRole',
        ),
    ]