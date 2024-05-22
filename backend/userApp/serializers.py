from rest_framework import serializers,status
from rest_framework.response import Response
from django.contrib.auth.models import Group
from .models import *
from django.contrib.auth.hashers import make_password
from django.contrib.auth import get_user_model  # Import the User model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken 
import re
from django.core.exceptions import ObjectDoesNotExist
from .models import UserRole ,Role

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    monitoring_id = serializers.PrimaryKeyRelatedField(queryset=Monitoring.objects.all(), allow_null=True, required=False)
    sector_id = serializers.PrimaryKeyRelatedField(queryset=Sector.objects.all(), allow_null=True, required=False)
    division_id = serializers.PrimaryKeyRelatedField(queryset=Division.objects.all(), allow_null=True, required=False)
    role_name = serializers.CharField(source='role.name', read_only=True)  # Custom field for role name

    class Meta:
        model = User
        fields = [
            'id', 'username', 'first_name', 'last_name', 'password', 'email', 'phone', 'gender', 'monitoring_id', 'sector_id', 
            'division_id', 'role', 'role_name', 'is_superadmin', 'is_admin', 'is_user', 'last_seen', 'is_deleted', 'status', 'deleted_by', 
            'added_by', 'status_changed_by', 'created_at'
        ]
        extra_kwargs = {
            'password': {'write_only': True, 'required': False},
            'username': {'required': False}  # Removing read_only and using required=False
        }

    def create(self, validated_data):
        email = validated_data.pop('email')
        password = validated_data.pop('password', None)

        # Set username to email automatically
        validated_data['username'] = email
        validated_data['email'] = email

        creator = self.context['request'].user
        sector_id = validated_data.pop('sector_id', None)
        monitoring_id = validated_data.pop('monitoring_id', None)
        division_id = validated_data.pop('division_id', None)
        #print(creator,creator.is_admin, monitoring_id, sector_id, division_id)
        
        # Assign creator's values if they are not provided
        if sector_id is None:
            sector_id = creator.sector_id
        if monitoring_id is None:
            monitoring_id = creator.monitoring_id
        if division_id is None:
            division_id = creator.division_id

        # Update validated_data with the final values
        validated_data['sector_id'] = sector_id
        validated_data['monitoring_id'] = monitoring_id
        validated_data['division_id'] = division_id

        # if creator.monitoring_id:
        #     validated_data['monitoring_id'] = creator.monitoring_id
        # elif creator.sector_id:
        #     validated_data['sector_id'] = creator.sector_id
        # elif creator.division_id:
        #     validated_data['division_id'] = creator.division_id

        user = User(**validated_data)

        if password:
            user.set_password(password)
        else:
            user.set_password('123456789')  # Consider using a more secure default password

        user.save()

        return user


class MonitoringSerializer(serializers.ModelSerializer):
    class Meta:
        model = Monitoring
        fields = '__all__'

class SectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sector
        fields = '__all__'

class DivisionSerializer(serializers.ModelSerializer):
    sector_name = serializers.CharField(source='sector.name', read_only=True) 
    class Meta:
        model = Division
        fields = [ 'id', 'sector', 'name', 'email', 'phone_no', 'status', 'added_by', 'updated_by', 
            'status_changed_by', 'deleted_by', 'is_deleted', 'sector_name'
        ]

    def create(self, validated_data):
       
        creator = self.context['request'].user
        sector_id = validated_data.pop('sector', None)
        
        if sector_id is None:
            validated_data['sector'] = creator.sector_id
        else:
            validated_data['sector'] = sector_id

        division = Division(**validated_data)
        division.save()
        return division

    def validate_phone(self, value):
        # Define the regex patterns for the phone numbers
        pattern_international = r'^2519\d{8}$'  # Pattern for numbers starting with '2519' followed by 8 digits
        pattern_local = r'^09\d{8}$'  # Pattern for numbers starting with '09' followed by 8 digits

        # Check if the provided value matches one of the patterns
        if re.match(pattern_international, value) or re.match(pattern_local, value):
            return value
        else:
            raise serializers.ValidationError("Phone number must be in the format 251934408928 or 0934408928.")


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        """ # Custom data addition starts here
        user_permissions_instances = UserPermission.objects.filter(user_id=user)
        permissions = []
        for user_permission in user_permissions_instances:
            permissions.extend(user_permission.permission_id.all())
        userPermissions = [permission.name for permission in permissions]

        token['userPermissions'] = userPermissions """

        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        # Extract userPermissions from the token for the response
        #data['userPermissions'] = refresh['userPermissions']
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        
        return data

  