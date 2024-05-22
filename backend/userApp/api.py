from rest_framework import viewsets,permissions,status
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import *
from django.contrib.auth.models import Group
from rest_framework.decorators import action
from .models import *
from roleApp.models import *
import re
from collections import defaultdict
from django.db.models import F
from django.db.models import Q


User = get_user_model()  # Get the user model

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Override to exclude users marked as 'is_deleted'.
        """
        user_sector_id = self.request.user.sector_id
        user_monitoring_id = self.request.user.monitoring_id
        user_division_id = self.request.user.division_id
        print("User sector ID:", user_sector_id)  # Updated print statement for clarity
        
        if user_sector_id:
            # Get the first division ID in the sector
            admin_division_id = Division.objects.filter(sector_id=user_sector_id).values_list('id', flat=True).first()
            # Get all admin users in that division
            admin_users = User.objects.filter(is_admin=True, division_id=admin_division_id)
            # Extract their division IDs
            admin_division_ids = admin_users.values_list('division_id', flat=True)
            # Return users in those divisions
            if admin_division_ids:
                return User.objects.filter(
                    Q(sector_id=user_sector_id, division_id= None) | Q(division_id__in=admin_division_ids, is_admin=True, sector_id=None)
                ).exclude(id=self.request.user.id)
            else:
                return User.objects.filter(is_deleted=False, sector_id=user_sector_id).exclude(id=self.request.user.id)
        elif user_monitoring_id:
            return User.objects.filter(is_deleted=False, monitoring_id=user_monitoring_id).exclude(id=self.request.user.id)
        elif user_division_id:
            return User.objects.filter(is_deleted=False, division_id=user_division_id).exclude(id=self.request.user.id)
        elif self.request.user.is_superuser:
            return User.objects.filter(is_deleted=False).exclude(id=self.request.user.id)
        else:
            return User.objects.none()

        # user = self.request.user
        # if user.is_superuser:
        #     # If the user is a superadmin, return all users not marked as deleted.
        #     return User.objects.filter(is_deleted=False)
        # else:
        #     # Otherwise, return only the users added by the current user.
        #     return User.objects.filter(is_deleted=False, added_by=user)
    
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def my_profile(self, request):
 
        try:
            user = request.user.id
            user_data = User.objects.get(id=user)
            user_permissions_instances = UserPermission.objects.filter(user_id=user)
            permissions_dict = []
            for user_permission in user_permissions_instances:
                for permission in user_permission.permission_id.all():
                    #permissions_dict[permission.name] = user_permission.value  # Assuming Permission model has 'value' attribute
                    permissions_dict.append(permission.name)

            user_role_instances = UserRole.objects.get(user_id=user)
            #userRoles = [role_instance.role_id.name for role_instance in user_role_instances]
            userRoles = user_role_instances.role_id.name 
            
            # Serialize user profile data
            profile_data = self.get_serializer(user_data).data
            
            # Add user permissions to the profile data
            profile_data['userRole'] = userRoles
            profile_data['userPermissions'] = permissions_dict
            
            return Response(profile_data)
        except User.DoesNotExist:
            return Response({"error": "User does not exist."}, status=status.HTTP_404_NOT_FOUND)
        
    def perform_create(self, serializer):
        user = serializer.save(added_by=self.request.user)
  
        role_permissions = user.role.permission_id.all()
        all_permissions = Permission.objects.all()
        user_roles = UserRole.objects.create(user_id=user, role_id=user.role)
        user_roles.save()
        for permission in all_permissions:
            user_permission_instance = UserPermission.objects.create(user_id=user, added_by=user)
            user_permission_instance.permission_id.set([permission])
            user_permission_instance.value = permission in role_permissions
            user_permission_instance.save()

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user, status_changed_by=self.request.user)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        # instance.deleted_by = request.user
        # instance.is_deleted = True  # Mark as deleted rather than removing
        # instance.save()

        # Optionally, you could also return a custom message or data
        return Response({"message": "User marked as deleted successfully."}, status=status.HTTP_204_NO_CONTENT)


""" class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserProfileSerializer

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def my_profile(self, request):
        
        #Returns the profile information of the authenticated user.
        
        try:
                    # Fetch user permissions
        
            user_permissions_instance = UserPermission.objects.get(user_id=user)
            permissions = user_permissions_instance.permission_id.all()
            userPermissions = [permission.name for permission in permissions]  # Assuming 'name' is a field in your Permission model
        
            user_profile = UserProfile.objects.get(user=request.user)
            serializer = self.get_serializer(user_profile)
            print(serializer.data)
            return Response(serializer.data)
        except UserProfile.DoesNotExist:
            return Response({"error": "User profile does not exist."}, status=404)
 """

""" class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserProfileSerializer

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def my_profile(self, request):
 
        try:
            user = request.user
            user_profile = UserProfile.objects.get(user=user)
            user_permissions_instances = UserPermission.objects.filter(user_id=user, value=True)
            permissions_dict = {}
            for user_permission in user_permissions_instances:
                for permission in user_permission.permission_id.all():
                    permissions_dict[permission.name] = user_permission.value  # Assuming Permission model has 'value' attribute

            

            user_role_instances = UserRole.objects.get(user_id=user)
            #userRoles = [role_instance.role_id.name for role_instance in user_role_instances]
            userRoles = user_role_instances.role_id.name 
            
            # Serialize user profile data
            profile_data = self.get_serializer(user_profile).data
            
            # Add user permissions to the profile data
            profile_data['userRole'] = userRoles
            profile_data['userPermissions'] = permissions_dict
            
            return Response(profile_data)
        except UserProfile.DoesNotExist:
            return Response({"error": "User profile does not exist."}, status=status.HTTP_404_NOT_FOUND)
"""

class MonitoringViewSet(viewsets.ModelViewSet):
    queryset = Monitoring.objects.all()
    serializer_class = MonitoringSerializer
    permission_classes = [permissions.IsAuthenticated]  # Adjusted permission
    
    def get_queryset(self):
        """
        Override to exclude monitor marked as 'is_deleted'.
        """
        return Monitoring.objects.filter(is_deleted=False, added_by=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(added_by=self.request.user)

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user, status_changed_by=self.request.user)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        # instance.deleted_by = request.user
        # instance.is_deleted = True  # Mark as deleted rather than removing
        # instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class SectorViewSet(viewsets.ModelViewSet):
    queryset = Sector.objects.all()
    permission_classes = [permissions.IsAuthenticated]  # Consider adjusting permissions as needed
    serializer_class = SectorSerializer

    def get_queryset(self):
        """
        Override to exclude sector marked as 'is_deleted'.
        """
        if self.request.user.monitoring_id:
            return Sector.objects.filter(is_deleted=False)
        else:
            return Sector.objects.filter(is_deleted=False, added_by=self.request.user)
        
    def perform_create(self, serializer):
        serializer.save(added_by=self.request.user)

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user, status_changed_by=self.request.user)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        # instance.deleted_by = request.user
        # instance.is_deleted = True  # Mark as deleted rather than removing
        # instance.save()
        # Soft delete all divisions under this sector
        divisions = Division.objects.filter(sector=instance)
        for division in divisions:
            division.deleted_by = request.user
            division.is_deleted = True
            division.save()

        return Response(status=status.HTTP_204_NO_CONTENT)

class DivisionViewSet(viewsets.ModelViewSet):
    queryset = Division.objects.filter(sector__is_deleted=False)  # Assuming you want to filter by sector
    permission_classes = [permissions.IsAuthenticated]  # Consider adjusting permissions as needed
    serializer_class = DivisionSerializer

    def get_queryset(self):
        """
        Override to exclude sector marked as 'is_deleted'.
        """
        return Division.objects.filter(is_deleted=False, added_by=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(added_by=self.request.user)

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user, status_changed_by=self.request.user)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        # instance.deleted_by = request.user
        # instance.is_deleted = True  # Mark as deleted rather than removing
        # instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

""" class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = GroupSerializer

class GroupInfoViewSet(viewsets.ModelViewSet):
    queryset = GroupInfo.objects.all()
    serializer_class = GroupInfoSerializer  """
