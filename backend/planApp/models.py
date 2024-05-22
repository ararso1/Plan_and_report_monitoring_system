from urllib import request
from django.db import models
from django.core.validators import MinValueValidator
import datetime
from django.core.exceptions import ValidationError
from django.db.models import Sum
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from userApp.models import *
from django.db.models.signals import pre_save
import datetime


class KPI(models.Model):
    name = models.CharField(max_length=500)
    main_goal_id = models.ForeignKey('MainGoal', on_delete=models.CASCADE)
    sector_id = models.ForeignKey('userApp.Sector', on_delete=models.SET_NULL, null=True,blank=True)
    monitoring_id = models.ForeignKey('userApp.Monitoring', on_delete=models.SET_NULL, null=True,blank=True)
    division_id = models.ForeignKey('userApp.Division', on_delete=models.SET_NULL, null=True,blank=True)
    weight = models.FloatField(null=True, blank=True)
    measure_id = models.ForeignKey('reportApp.Measure', on_delete=models.CASCADE,null=True)
    initial = models.CharField(max_length=45)
    first_quarter_plan = models.CharField(max_length=45)
    second_quarter_plan = models.CharField(max_length=45)
    third_quarter_plan = models.CharField(max_length=45)
    fourth_quarter_plan = models.CharField(max_length=45)
    first_quarter_performance = models.CharField(max_length=45, null=True,blank=True)
    second_quarter_performance = models.CharField(max_length=45, null=True,blank=True)
    third_quarter_performance = models.CharField(max_length=45 , null=True,blank=True)
    fourth_quarter_performance = models.CharField(max_length=45, null=True,blank=True)
    performance_in_percent = models.CharField(max_length=45, null=True,blank=True)
    is_deleted = models.BooleanField(default=False)
    added_by = models.ForeignKey('userApp.User', related_name='added_kpis', null=True,blank=True, on_delete=models.SET_NULL)
    updated_by = models.ForeignKey('userApp.User', related_name='updated_kpis', null=True,blank=True,on_delete=models.SET_NULL)
    deleted_by = models.ForeignKey('userApp.User', related_name='deleted_kpis', null=True,blank=True, on_delete=models.SET_NULL)
    approved_by = models.ForeignKey('userApp.User', null=True, on_delete=models.SET_NULL,blank=True)
    status = models.BooleanField(default=False)
    is_approved = models.CharField(max_length=45, default='pending', choices=[('pending', 'Pending'), ('approved', 'Approved'), ('rejected', 'Rejected')])
    comment = models.TextField(blank=True)

    def __str__(self):
        return self.name


    def save(self, *args, **kwargs):
        if not self.is_deleted:  # Skip validation if the instance is being soft deleted
            if self.pk is None:  
                if self.division_id:  # Check if division is provided
                    existing_total_weight = KPI.objects.filter(division_id=self.division_id, is_deleted=False).aggregate(total_weight=models.Sum('weight'))['total_weight'] or 0
                    total_weight = existing_total_weight + (self.weight or 0)
                    left_weight = 100 - existing_total_weight
                    if total_weight > 100:
                        raise ValidationError("Total weight of KPIs cannot exceed 100. Current weight is: {}, the remaining weight is: {}".format(existing_total_weight, left_weight))
                
            elif self.pk:  # Check if the instance is being updated
                original_instance = KPI.objects.get(pk=self.pk)
                existing_total_weight = (KPI.objects.filter(division_id=self.division_id, is_deleted=False).exclude(pk=self.pk).aggregate(total_weight=Sum('weight'))['total_weight'] or 0) + original_instance.weight
                total_weight = existing_total_weight + (self.weight or 0) - original_instance.weight
                left_weight = 100 - existing_total_weight

                if total_weight > 100:
                    raise ValidationError("Total weight of Strategic Goals cannot exceed 100. Current weight is: {}, the remaining weight is: {}".format(existing_total_weight, left_weight))

        super(KPI, self).save(*args, **kwargs)



class MainGoal(models.Model):
    name = models.CharField(max_length=500)
    strategic_goal_id = models.ForeignKey('StrategicGoal', on_delete=models.CASCADE)
    weight = models.FloatField(null=True, blank=True)
    sector_id = models.ForeignKey('userApp.Sector', on_delete=models.CASCADE, null=True, blank=True)
    monitoring_id = models.ForeignKey('userApp.Monitoring', on_delete=models.CASCADE, null=True, blank=True)
    division_id = models.ForeignKey('userApp.Division', on_delete=models.CASCADE, null=True, blank=True)
    added_by = models.ForeignKey('userApp.User', related_name='added_main_goals', null=True, on_delete=models.SET_NULL, blank=True)
    updated_by = models.ForeignKey('userApp.User', related_name='updated_main_goals', null=True, on_delete=models.SET_NULL, blank=True)
    deleted_by = models.ForeignKey('userApp.User', related_name='deleted_main_goals', null=True, on_delete=models.SET_NULL, blank=True)
    approved_by = models.ForeignKey('userApp.User', null=True, on_delete=models.SET_NULL, blank=True)
    status = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)
    is_approved = models.CharField(max_length=45, default='pending', choices=[('pending', 'Pending'), ('approved', 'Approved'), ('rejected', 'Rejected')])
    comment = models.TextField(blank=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
            if self.pk is None:  # Check if the instance is being created
                if self.weight is None:
                    self.weight = 0
                elif not isinstance(self.weight, (int, float)):
                    raise ValidationError("Weight must be an integer or float.")
                existing_total_weight = MainGoal.objects.filter(sector_id=self.sector_id, is_deleted=False).aggregate(total_weight=models.Sum('weight'))['total_weight'] or 0
                total_weight = existing_total_weight + self.weight
                left_weight = 100 - existing_total_weight
                if total_weight > 100:
                    raise ValidationError("Total weight of Main Goals cannot exceed 100. Current weight is: {}, the remaining weight is: {}".format(existing_total_weight, left_weight))


            elif self.pk:  # Check if the instance is being updated
                original_instance = MainGoal.objects.get(pk=self.pk)
                existing_total_weight = (MainGoal.objects.filter(sector_id=self.sector_id, is_deleted=False).exclude(pk=self.pk).aggregate(total_weight=Sum('weight'))['total_weight'] or 0) + original_instance.weight
                total_weight = existing_total_weight + (self.weight or 0) - original_instance.weight
                left_weight = 100 - existing_total_weight

                if total_weight > 100:
                    raise ValidationError("Total weight of Strategic Goals cannot exceed 100. Current weight is: {}, the remaining weight is: {}".format(existing_total_weight, left_weight))

            super(MainGoal, self).save(*args, **kwargs)




class StrategicGoal(models.Model):
    name = models.CharField(max_length=500)
    year = models.PositiveIntegerField(validators=[MinValueValidator(limit_value=datetime.MINYEAR)])
    weight = models.IntegerField(null=True)
    sector_id = models.ManyToManyField('userApp.Sector', blank=True,null=True)
    assigned = models.BooleanField(null=True, blank=True,default=False)
    added_by = models.ForeignKey('userApp.User', related_name='added_strategic_goals', null=True, on_delete=models.SET_NULL,blank=True)
    updated_by = models.ForeignKey('userApp.User', related_name='updated_strategic_goals', null=True, on_delete=models.SET_NULL,blank=True)
    deleted_by = models.ForeignKey('userApp.User', related_name='deleted_strategic_goals', null=True, on_delete=models.SET_NULL,blank=True)
    status = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.name



    def save(self, *args, **kwargs):
        if self.pk is None:  # Check if the instance is being created
            if self.weight is None:
                self.weight = 0
            elif not isinstance(self.weight, (int, float)):
                raise ValidationError("Weight must be an integer or float.")

            existing_total_weight = StrategicGoal.objects.filter(is_deleted=False).aggregate(total_weight=Sum('weight'))['total_weight'] or 0
            total_weight = existing_total_weight + self.weight
            left_weight = 100 - existing_total_weight

            if total_weight > 100:
                raise ValidationError("Total weight of Strategic Goals cannot exceed 100. Current weight is: {}, the remaining weight is: {}".format(existing_total_weight, left_weight))
        
        else:  # Check if the instance is being updated
            original_instance = StrategicGoal.objects.get(pk=self.pk)
            existing_total_weight = (StrategicGoal.objects.filter(is_deleted=False).exclude(pk=self.pk).aggregate(total_weight=Sum('weight'))['total_weight'] or 0) + original_instance.weight
            total_weight = existing_total_weight + (self.weight or 0) - original_instance.weight
            left_weight = 100 - existing_total_weight

            if total_weight > 100:
                raise ValidationError("Total weight of Strategic Goals cannot exceed 100. Current weight is: {}, the remaining weight is: {}".format(existing_total_weight, left_weight))

        super(StrategicGoal, self).save(*args, **kwargs)
