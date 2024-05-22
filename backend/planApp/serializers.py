# serializers.py
from rest_framework import serializers
from .models import StrategicGoal
from .models import StrategicGoal, MainGoal,KPI


class StrategicGoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = StrategicGoal
        fields = ['id',  'name', 'year','assigned','added_by','weight','sector_id']  

    def create(self, validated_data):
        return StrategicGoal.objects.create(**validated_data)
        fields = ['id', 'name', 'year', 'weight']  


class MainGoalSerializer(serializers.ModelSerializer):
    strategic_name = serializers.CharField(source='strategic_goal_id.name', read_only=True) 
    class Meta:
        model = MainGoal
        fields = ['id', 'name', 'strategic_name', 'strategic_goal_id','weight','added_by', 'sector_id', 'monitoring_id', 'division_id']  

    def create(self, validated_data):
        return MainGoal.objects.create(**validated_data)
    

    
    
class KPISerializer(serializers.ModelSerializer):
    maingoal_name = serializers.CharField(source='main_goal_id.name', read_only=True) 
    class Meta:
        model = KPI
        fields = ['id', 'name', 'main_goal_id', 'maingoal_name', 'weight','division_id', 'measure_id', 'initial','added_by', 'first_quarter_plan', 'second_quarter_plan', 'third_quarter_plan', 'fourth_quarter_plan']

    def create(self, validated_data):
        return KPI.objects.create(**validated_data)



