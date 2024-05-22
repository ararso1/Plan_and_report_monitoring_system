from rest_framework import serializers
from .models import Trackings, SystemSetting
from userApp.models import Division, User, Sector
from planApp.models import MainGoal
from planApp.models import KPI
from userApp.serializers import DivisionSerializer
from django.core.files.storage import default_storage


# class TrackingsSerializer(serializers.ModelSerializer):
#     division = serializers.PrimaryKeyRelatedField(
#         queryset=Division.objects.all(), required=False
#     )
#     main_goal = serializers.PrimaryKeyRelatedField(
#         queryset=MainGoal.objects.all(), required=False
#     )
#     kpi = serializers.PrimaryKeyRelatedField(queryset=KPI.objects.all(), required=False)

#     # ... other fields and Meta class

#     def to_representation(self, instance):
#         representation = super().to_representation(instance)

#         # Handle fields with potential for multiple selections
#         field_names_for_multiple_selection = [
#             "division",
#             "main_goal",
#             "kpi",
#         ]  # Customize as needed

#         for field_name in field_names_for_multiple_selection:
#             related_field = self.fields[field_name]

#             # Check if the field allows multiple selections (ManyToManyRelatedField)
#             if isinstance(related_field, ManyToManyRelatedField):
#                 representation[field_name] = [
#                     obj.pk for obj in getattr(instance, field_name).all()
#                 ]
#             else:
#                 # Handle PrimaryKeyRelatedField as before (fetch and replace with name)
#                 related_objects = representation.get(field_name)
#                 if related_objects:
#                     representation[field_name] = related_objects.name

#         return representation


class TrackingsSerializer(serializers.ModelSerializer):
    division = serializers.PrimaryKeyRelatedField(queryset=Division.objects.all())
    main_goal = serializers.PrimaryKeyRelatedField(queryset=MainGoal.objects.all())
    kpi = serializers.PrimaryKeyRelatedField(queryset=KPI.objects.all())
    sector = serializers.PrimaryKeyRelatedField(queryset=Sector.objects.all())
    given_date = serializers.SerializerMethodField()

    class Meta:
        model = Trackings
        fields = [
            "id",
            "sector",
            "division",
            "main_goal",
            "kpi",
            "ratting",
            "comment",
            "status",
            "given_date",
        ]

    def get_given_date(self, Trackings):
        start_date = Trackings.start_date
        end_date = Trackings.end_date
        if start_date and end_date:
            return (end_date - start_date).days
        return None

    def validate(self, data):
        start_date = data.get("start_date")
        end_date = data.get("end_date")

        if start_date and end_date:
            if start_date > end_date:
                raise serializers.ValidationError(
                    "Start date cannot be greater than end date."
                )

        return data

    def create(self, validated_data):
        sector_data = validated_data.pop("sector")
        division_data = validated_data.pop("division")
        main_goal_data = validated_data.pop("main_goal")
        kpi_data = validated_data.pop("kpi")
        trackings = Trackings.objects.create(**validated_data)
        trackings.sector = sector_data
        trackings.division = division_data
        trackings.main_goal = main_goal_data
        trackings.kpi = kpi_data
        trackings.save()
        return trackings


class TrackingserializerForSector(serializers.ModelSerializer):
    division = serializers.PrimaryKeyRelatedField(queryset=Division.objects.all())
    main_goal = serializers.PrimaryKeyRelatedField(queryset=MainGoal.objects.all())
    given_date = serializers.SerializerMethodField()

    class Meta:
        model = Trackings
        fields = [
            "id",
            "user",
            "division",
            "main_goal",
            "ratting",
            "comment",
            "start_date",
            "end_date",
            "status",
            "given_date",
        ]

    def get_given_date(self, Trackings):
        start_date = Trackings.start_date
        end_date = Trackings.end_date
        if start_date and end_date:
            return (end_date - start_date).days
        return None

    def validate(self, data):
        start_date = data.get("start_date")
        end_date = data.get("end_date")

        if start_date and end_date:
            if start_date > end_date:
                raise serializers.ValidationError(
                    "Start date cannot be greater than end date."
                )

        return data

    def create(self, validated_data):
        division_data = validated_data.pop("division")
        main_goal_data = validated_data.pop("main_goal")
        trackings = Trackings.objects.create(**validated_data)
        trackings.division = division_data
        trackings.main_goal = main_goal_data
        trackings.save()
        return trackings


class TrackingserializerForDivision(serializers.ModelSerializer):
    kpi = serializers.PrimaryKeyRelatedField(queryset=KPI.objects.all())
    given_date = serializers.SerializerMethodField()

    class Meta:
        model = Trackings
        fields = [
            "id",
            "user",
            "kpi",
            "start_date",
            "end_date",
            "ratting",
            "comment",
            "status",
            "given_date",
        ]

    def get_given_date(self, Trackings):
        start_date = Trackings.start_date
        end_date = Trackings.end_date
        if start_date and end_date:
            return (end_date - start_date).days
        return None

    def validate(self, data):
        start_date = data.get("start_date")
        end_date = data.get("end_date")

        if start_date and end_date:
            if start_date > end_date:
                raise serializers.ValidationError(
                    "Start date cannot be greater than end date."
                )

        return data

    def create(self, validated_data):
        kpi_data = validated_data.pop("kpi")
        trackings = Trackings.objects.create(**validated_data)
        trackings.kpi = kpi_data
        trackings.save()
        return trackings


class SystemSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = SystemSetting
        fields = ["id", "logo_image"]

    def create(self, validated_data):
        if SystemSetting.objects.exists():
            existing_setting = SystemSetting.objects.first()
            if existing_setting.logo_image:
                if default_storage.exists(existing_setting.logo_image.path):
                    default_storage.delete(existing_setting.logo_image.path)
            existing_setting.delete()
        return SystemSetting.objects.create(**validated_data)
