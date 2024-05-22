from django.db import models
from django.forms import ValidationError
from userApp.models import User
from planApp.models import MainGoal
from planApp.models import KPI
from userApp.models import Division
from userApp.models import Sector
from datetime import timedelta


class Trackings(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    main_goal = models.ForeignKey(
        MainGoal, on_delete=models.CASCADE, null=True, blank=True
    )
    sector = models.ForeignKey(Sector, on_delete=models.SET_NULL, null=True, blank=True)
    division = models.ForeignKey(
        Division, on_delete=models.SET_NULL, null=True, blank=True
    )
    kpi = models.ForeignKey(KPI, on_delete=models.SET_NULL, null=True, blank=True)
    ratting = models.CharField(max_length=250, null=True, blank=True)
    comment = models.CharField(max_length=250, null=True, blank=True)
    status = models.CharField(max_length=250, null=True, blank=True)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.user}"


class SystemSetting(models.Model):
    logo_image = models.ImageField(upload_to="logo")
