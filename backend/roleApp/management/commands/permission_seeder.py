# permission_seeder.py

import datetime
from django.core.management.base import BaseCommand
from userApp.models import Permission

class Command(BaseCommand):
    help = 'Seed data for permissions'

    def handle(self, *args, **kwargs):
        # Define seed data for permissions
        permissions_data = [
            {'name': 'createUser'},
            {'name': 'readUser'},
            {'name': 'updateUser'},
            {'name': 'deleteUser'},
            {'name': 'createRole'},
            {'name': 'readRole'},
            {'name': 'updateRole'},
            {'name': 'deleteRole'},
            {'name': 'createSummmary'},
            {'name': 'readSummmary'},
            {'name': 'updateSummmary'},
            {'name': 'deleteSummmary'},
            {'name': 'createDivision'},
            {'name': 'readDivision'},
            {'name': 'updateDivision'},
            {'name': 'deleteDivision'},
            {'name': 'createKpi'},
            {'name': 'readKpi'},
            {'name': 'updateKpi'},
            {'name': 'deleteKpi'},
            {'name': 'createMainActivity'},
            {'name': 'readMainActivity'},
            {'name': 'updateMainActivity'},
            {'name': 'deleteMainActivity'},
            {'name': 'createStrategicGoal'},
            {'name': 'readStrategicGoal'},
            {'name': 'updateStrategicGoal'},
            {'name': 'deleteStrategicGoal'},
            {'name': 'createKpiDescription'},
            {'name': 'readKpiDescription'},
            {'name': 'updateKpiDescription'},
            {'name': 'deleteKpiDescription'},
            {'name': 'createMeasure'},
            {'name': 'readMeasure'},
            {'name': 'updateMeasure'},
            {'name': 'deleteMeasure'},
            {'name': 'createMonitoring'},
            {'name': 'readMonitoring'},
            {'name': 'updateMonitoring'},
            {'name': 'deleteMonitoring'},
            {'name': 'createSector'},
            {'name': 'readSector'},
            {'name': 'updateSector'},
            {'name': 'deleteSector'},
            {'name': 'createAdmin'},
            {'name': 'readAdmin'},
            {'name': 'updateAdmin'},
            {'name': 'deleteAdmin'},
            {'name': 'createSetting'},
            {'name': 'readSetting'},
            {'name': 'updateSetting'},
            {'name': 'deleteSetting'},
            {'name': 'createAssign'},
            {'name': 'readAssign'},
            {'name': 'updateAssign'},
            {'name': 'deleteAssign'},
                                # Cresions
        ]
        for data in permissions_data:
            permission = Permission.objects.create(**data)
            self.stdout.write(self.style.SUCCESS(f'Permission created: {permission.name}'))
