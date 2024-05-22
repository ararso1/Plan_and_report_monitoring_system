from django.contrib import admin
from .models import KPIDescription, Summary, Measure
# Register your models here.
admin.site.register(KPIDescription)
admin.site.register(Summary)
admin.site.register(Measure)