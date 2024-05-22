# traking and monitoring with athunitication and athorizations
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import (
    BasePermission,
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
)
from rest_framework.viewsets import ModelViewSet
from monApp.models import Trackings, SystemSetting
from .serializers import (
    TrackingserializerForSector,
    TrackingserializerForDivision,
    SystemSettingSerializer,
)


# class CustomPermission(BasePermission):
#     def has_permission(self, request, view):
#         user_id = request.session.get("user_id")
#         if user_id is not None:
#             sector_id = request.session.get("sector_id")
#             division_id = request.session.get("division_id")
#             if user_id == sector_id or user_id == division_id:
#                 return True

#         return False


# class TrackingsView(ModelViewSet):
#     queryset = Trackings.objects.all()

#     def list(self, request, *args, **kwargs):
#         if CustomPermission().has_permission(request, self):
#             user_id = request.session.get("user_id")
#             sector_id = request.session.get("sector_id")
#             division_id = request.session.get("division_id")
#             if user_id == sector_id:
#                 queryset = Trackings.objects.filter(creator__sector_id=sector_id)
#             elif user_id == division_id:
#                 queryset = Trackings.objects.filter(creator__division_id=division_id)
#             else:
#                 raise ValidationError(
#                     "User does not have permission to access this data."
#                 )
#             serializer = self.get_serializer(queryset, many=True)
#             return Response(serializer.data)
#         else:
#             raise ValidationError("User does not have permission to access this data.")

#     def retrieve(self, request, *args, **kwargs):
#         instance = self.get_object()
#         if CustomPermission().has_permission(request, self):
#             user_id = request.session.get("user_id")
#             creator_id = instance.creator_id
#             if user_id == creator_id:
#                 serializer = self.get_serializer(instance)
#                 return Response(serializer.data)
#             else:
#                 raise ValidationError(
#                     "User does not have permission to access this data."
#                 )
#         else:
#             raise ValidationError("User does not have permission to access this data.")

#     def get_serializer_context(self):
#         return {"request": self.request}

#     serializer_class = None

#     def get_serializer_class(self):
#         user_id = self.request.session.get("user_id")
#         if CustomPermission().has_permission(self.request, self):
#             sector_id = self.request.session.get("sector_id")
#             division_id = self.request.session.get("division_id")
#             if user_id == sector_id:
#                 return TrackingserializerForSector
#             elif user_id == division_id:
#                 return TrackingserializerForDivision
#         raise ValidationError("User does not have permission to access this view.")

#     def create(self, request, *args, **kwargs):
#         if CustomPermission().has_permission(request, self):
#             serializer = self.get_serializer(data=request.data)
#             serializer.is_valid(raise_exception=True)
#             track = serializer.save()
#             return Response(serializer.data)
#         else:
#             raise ValidationError("User does not have permission to create.")

#     def update(self, request, *args, **kwargs):
#         instance = self.get_object()
#         if CustomPermission().has_permission(request, self):
#             serializer = self.get_serializer(instance, data=request.data, partial=False)
#             serializer.is_valid(raise_exception=True)
#             serializer.save()
#             return Response(serializer.data)
#         else:
#             raise ValidationError("User does not have permission to update.")

#     def partial_update(self, request, *args, **kwargs):
#         instance = self.get_object()
#         if CustomPermission().has_permission(request, self):
#             serializer = self.get_serializer(instance, data=request.data, partial=True)
#             serializer.is_valid(raise_exception=True)
#             serializer.save()
#             return Response(serializer.data)
#         else:
#             raise ValidationError("User does not have permission to partially update.")

#     def destroy(self, request, *args, **kwargs):
#         instance = self.get_object()
#         if CustomPermission().has_permission(request, self):
#             instance.delete()
#             return Response(status=status.HTTP_204_NO_CONTENT)
#         else:
#             raise ValidationError("User does not have permission to delete.")


# traking and monitoring without permissions
from django.forms import ValidationError
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import BasePermission
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from monApp.models import Trackings
from planApp.models import MainGoal
from userApp.models import Division
from .serializers import (
    TrackingsSerializer,
    TrackingserializerForSector,
    TrackingserializerForDivision,
)


class TrackingsView(ModelViewSet):
    queryset = Trackings.objects.all()
    serializer_class = TrackingsSerializer

    def get_serializer_context(self):
        return {"request": self.request}

    def create(self, request, *args, **kwargs):
        serializer = TrackingsSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        track = serializer.save()
        serializer = TrackingsSerializer(track)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TrackingsViewDivision(ModelViewSet):
    queryset = Trackings.objects.all()
    serializer_class = TrackingserializerForSector

    def get_serializer_context(self):
        return {"request": self.request}

    def create(self, request, *args, **kwargs):
        serializer = TrackingserializerForSector(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        track = serializer.save()
        serializer = TrackingserializerForSector(track, context={"request": request})
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TrackingsViewTeam(ModelViewSet):
    queryset = Trackings.objects.all()
    serializer_class = TrackingserializerForDivision

    def get_serializer_context(self):
        return {"request": self.request}

    def create(self, request, *args, **kwargs):
        serializer = TrackingserializerForDivision(data=request.data)
        serializer.is_valid(raise_exception=True)
        track = serializer.save()
        serializer = TrackingserializerForDivision(track)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class SystemSettingViewSet(ModelViewSet):
    queryset = SystemSetting.objects.all()
    serializer_class = SystemSettingSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    """     def list(self, request, *args, **kwargs):
        try:
            queryset = super().get_queryset()
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        except SystemSetting.DoesNotExist:
            return Response({"error": "No SystemSettings found."}, status=status.HTTP_404_NOT_FOUND)
     """
    def list(self, request, *args, **kwargs):
            try:
                queryset = super().get_queryset()
                if queryset.exists():  # Check if queryset has at least one instance
                    if len(queryset) == 1:  # If queryset has only one instance
                        instance = queryset.first()
                        serializer = self.get_serializer(instance)
                        return Response(serializer.data)
                    else:  # If queryset has more than one instance
                        serializer = self.get_serializer(queryset, many=True)
                        return Response(serializer.data)
                else:  # If queryset is empty
                    return Response({"error": "No SystemSettings found."}, status=status.HTTP_404_NOT_FOUND)
            except SystemSetting.DoesNotExist:
                return Response({"error": "No SystemSettings found."}, status=status.HTTP_404_NOT_FOUND)
    # def get_queryset(self):
    #     """
    #     Override to exclude monitor marked as 'is_deleted'.
    #     """
    #     try:
    #         query = SystemSetting.objects.get()
    #         return query
    #     except:
    #         pass

    def perform_create(self, serializer):
        serializer.save()


    
