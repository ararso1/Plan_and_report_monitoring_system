from django.contrib import admin
from .models import StrategicGoal, MainGoal, KPI 
# Register your models here.
admin.site.register(StrategicGoal)
admin.site.register(MainGoal)
admin.site.register(KPI)