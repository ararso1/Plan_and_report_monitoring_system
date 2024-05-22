from rest_framework import serializers
from .models import KPIDescription, Measure, Summary

class KPIDescriptionSerializer(serializers.ModelSerializer):
    kpi_name = serializers.CharField(source='kpi_id.name', read_only=True) 
    class Meta:
        model = KPIDescription
        fields = ['id', 'description', 'file', 'kpi_id', 'kpi_name']


class MeasureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Measure
        fields = '__all__'


class SummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Summary
        fields = '__all__' 