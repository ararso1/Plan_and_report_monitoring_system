from django.db import models
from django.core.validators import MinValueValidator
import datetime


# Create your models here.

class KPIDescription(models.Model):
    id = models.AutoField(primary_key=True)
    description = models.CharField(max_length=500)
    file =   models.FileField(upload_to='kpi_files', null=True, blank=True)
    kpi_id = models.ForeignKey('planApp.KPI', related_name='kpidescription', on_delete=models.SET_NULL, null=True)


class Measure(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=450)
    type = models.CharField(max_length=450)


class Summary(models.Model):
    id = models.AutoField(primary_key=True)
    body = models.CharField(max_length=500)
    file =   models.FileField(upload_to='kpi_files', null=True, blank=True)
    type = models.CharField(max_length=450, null=True, blank=True)
    sector_id = models.ForeignKey('userApp.Sector', related_name='sector_summary', null=True, on_delete=models.SET_NULL)
    monitoring_id = models.ForeignKey('userApp.Monitoring', related_name='monitoring_summary', null=True, on_delete=models.SET_NULL)
    division_id = models.ForeignKey('userApp.Division', related_name='division_summary', null=True, on_delete=models.SET_NULL)




