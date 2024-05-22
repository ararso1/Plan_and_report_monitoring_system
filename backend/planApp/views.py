# views.py
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import StrategicGoal, MainGoal, KPI
from userApp.models import *
from reportApp.models import Measure
from .serializers import (
    StrategicGoalSerializer,
    MainGoalSerializer,
    KPISerializer,
)
from reportApp.serializer import MeasureSerializer
from rest_framework import permissions, status
from django.core.exceptions import ValidationError
from rest_framework.exceptions import APIException

class CustomErrorException(APIException):
    status_code = 403
    default_detail = 'Custom error message.'
#Here we will define the functions for strategic goals 
@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def set_strategic_goal(request):
    if request.method == 'POST':
        try:
            request.data['added_by'] = request.user.id

            print(request.data)
            serializer = StrategicGoalSerializer(data=request.data)
            if serializer.is_valid():
                # Save the strategic goal instance
                serializer.save()
                return Response({'message': 'Strategic goal set successfully'}, status=200)
            else:
                return Response(serializer.errors, status=400)
        except ValidationError as e:
            # Custom error response for ValidationError
            error_message = str(e)
            print(error_message)
            return Response({'message':str(e)}, status=403)
    else:
        return Response({'error': 'Method not allowed'}, status=405)
    
    
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_strategic_goals(request):
    if request.method == 'GET':
        strategic_goals = StrategicGoal.objects.filter(is_deleted=0)  # Filter only non-deleted goals
        serializer = StrategicGoalSerializer(strategic_goals, many=True)
        return Response(serializer.data)
    else:
        return Response({'error': 'Method not allowed'}, status=405)


@api_view(['DELETE'])
@permission_classes([permissions.IsAuthenticated])
def delete_strategic_goal(request, id):
    if request.method == 'DELETE':
        try:
            goal = StrategicGoal.objects.get(pk=id)
            # Soft delete by setting is_deleted to True
            goal.is_deleted = True  
            # Set the deleted_by field to the ID of the authenticated user
            goal.deleted_by_id = request.user.id
            goal.delete()  # Save the changes to the database
            return Response({'message': 'Strategic goal soft deleted successfully'}, status=200)
        except StrategicGoal.DoesNotExist:
            return Response({'error': 'Strategic goal not found'}, status=404)
    else:
        return Response({'error': 'Method not allowed'}, status=405)
        
@api_view(['PUT'])  # Specify the HTTP method
@permission_classes([permissions.IsAuthenticated])
def update_strategic_goal(request, id):  # Accept the id parameter
    try:
        strategic_goal = StrategicGoal.objects.get(pk=id)
        strategic_goal.updated_by_id = request.user.id
    except StrategicGoal.DoesNotExist:
        return Response({'error': 'Strategic goal does not exist'}, status=404)

    if request.method == 'PUT':
        serializer = StrategicGoalSerializer(strategic_goal, data=request.data)
        try:
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=200)
            return Response(serializer.errors, status=400)
        except ValidationError as e:
            error_message = str(e)
            print(error_message)
            return Response({'message':str(e)}, status=403)
    else:
        return Response({'error': 'Method not allowed'}, status=405)
    

#Here we will define the main goal functions
@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def set_main_goal(request):
    if request.method == 'POST':
            try:
                serializer = MainGoalSerializer(data=request.data)
                request.data['added_by'] = request.user.id
                request.data['sector_id']= request.user.sector_id_id
                for attr, value in vars(request.user).items():
                    print(f"{attr}: {value}")
                if serializer.is_valid():
                    # Save the main goal instance
                    serializer.save()
                    return Response({'message': 'Main goal set successfully'}, status=200)
                else:
                    return Response(serializer.errors, status=400)
            except ValidationError as e:
            # Custom error response for ValidationError
                error_message = str(e)
                print(error_message)
                return Response({'message':str(e)}, status=403)
    else:
        return Response({'error': 'Method not allowed'}, status=405)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_main_goals(request):
    if request.method == 'GET':
        user = request.user
        main_goals = MainGoal.objects.filter(is_deleted=False)
        
        if user.monitoring_id:  # If the user has a monitoring_id, they can access all main goals
            pass  # No additional filtering needed
        elif user.division_id_id or user.sector_id_id:  # If the user has a division_id
            user_sector_id = Division.objects.filter(id=user.division_id_id).values_list('sector_id', flat=True).first()
            user_sector_id_id = user.sector_id_id
            print("sector id", user_sector_id)
            if user_sector_id or user_sector_id_id:  # If the division has a sector_id
                
                main_goals = main_goals.filter(sector_id_id=user_sector_id or user_sector_id_id)
            else:
                # If the division has no sector, return an empty queryset
                main_goals = main_goals.none()
        
        serializer = MainGoalSerializer(main_goals, many=True)
        return Response(serializer.data)
    else:
        return Response({'error': 'Method not allowed'}, status=405)


@api_view(['DELETE'])  # Ensure the view only accepts DELETE requests
@permission_classes([permissions.IsAuthenticated])
def delete_main_goal(request, id):  # Add id parameter
    if request.method == 'DELETE':
        try:
            goal = MainGoal.objects.get(pk=id)
            goal.delete()  # Normal delete
            return Response({'message': 'Main goal deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except MainGoal.DoesNotExist:
            return Response({'error': 'Main goal not found'}, status=status.HTTP_404_NOT_FOUND)
    else:
        return Response({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['PUT'])
@permission_classes([permissions.IsAuthenticated])
def update_main_goal(request, id):
    try:
        main_goal = MainGoal.objects.get(pk=id)
        main_goal.updated_by_id = request.user.id
    except MainGoal.DoesNotExist:
        return Response({'error': 'Main goal does not exist'}, status=404)
    if request.method == 'PUT':
        serializer = MainGoalSerializer(main_goal, data=request.data, partial=True)  # Allow partial updates
        try:
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=200)
            return Response(serializer.errors, status=400)
        except ValidationError as e:
            error_message = str(e)
            print(error_message)
            return Response({'message':str(e)}, status=403)
    else:
        return Response({'error': 'Method not allowed'}, status=405)



#Here we will define functions related to KPI
@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def create_kpi(request):
    if request.method == 'POST':
        try:
            serializer = KPISerializer(data=request.data)
            request.data['added_by'] = request.user.id
            request.data['division_id']=request.user.division_id_id
            print(serializer)
            if serializer.is_valid():
                # Save the main goal instance
                serializer.save()
                return Response({'message': 'Main goal set successfully'}, status=200)
            else:
                return Response(serializer.errors, status=400)
        except ValidationError as e:
            error_message = str(e)
            print(error_message)
            return Response({'message':str(e)}, status=403)
    else:
        return Response({'error': 'Method not allowed'}, status=405)
    

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_kpi(request):
    if request.method == 'GET':
        user = request.user
        kpis = KPI.objects.filter(is_deleted=False)
        
        if user.monitoring_id:  # If the user has a monitoring_id, they can access all kpi
            pass  # No additional filtering needed
        elif user.division_id_id:  # If the user has a division_id
            print(user.division_id_id)
            user_division = user.division_id_id
            kpis = kpis.filter(division_id_id=user_division)
        serializer = KPISerializer(kpis, many=True)
        return Response(serializer.data)
    else:
        return Response({'error': 'Method not allowed'}, status=405)



@api_view(['PUT'])
@permission_classes([permissions.IsAuthenticated])
def update_kpi(request,id):
    try:
        kpis = KPI.objects.get(pk=id)
        kpis.updated_by_id = request.user.id
    except KPI.DoesNotExist:
        return Response({'error': 'Main goal does not exist'}, status=404)
    
    if request.method == 'PUT':
        serializer = KPISerializer(kpis, data=request.data, partial=True)  # Allow partial updates
        try:
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=200)
            return Response(serializer.errors, status=400)
        except ValidationError as e:
            error_message = str(e)
            print(error_message)
            return Response({'message':str(e)}, status=403)
    else:
        return Response({'error': 'Method not allowed'}, status=405)

@api_view(['DELETE'])
@permission_classes([permissions.IsAuthenticated])
def delete_kpi(request,id):
    if request.method == 'DELETE':
        try:
            goal = KPI.objects.get(pk=id)
            goal.is_deleted = True  # Soft delete by setting is_deleted to True
            goal.deleted_by_id = request.user.id
            goal.delete()  # Save the changes to the database
            return Response({'message': 'KPI goal deleted successfully'}, status=200)

        except KPI.DoesNotExist:
            return Response({'error': 'Strategic goal not found'}, status=404)
    else:
        return Response({'error': 'Method not allowed'}, status=405)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_measure(request):
    if request.method == 'GET':
        measures = Measure.objects.all()
        serializer = MeasureSerializer(measures, many=True)
        return Response(serializer.data)
    else:
        return Response({'error': 'Method not allowed'}, status=405)



@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def generate_table_data(request):
    # Retrieve all strategic goals
    strategic_goals = StrategicGoal.objects.filter(is_deleted=False)

    # Create a list to hold the table data
    table_data = []

    # Loop through strategic goals
    for index, strategic_goal in enumerate(strategic_goals, start=1):
        strategic_goal_data = {
            'index': index,
            'strategic_goal_name': strategic_goal.name,
            'main_goals': []
        }

        # Loop through main goals for each strategic goal
        for main_goal in strategic_goal.maingoal_set.filter(is_deleted=False):
            main_goal_data = {
                'main_goal_name': main_goal.name,
                'kpis': []
            }

            # Loop through KPIs for each main goal
            for kpi in main_goal.kpi_set.filter(is_deleted=False):
                # Fetch associated measure data for the current KPI
                measure_data = None
                if kpi.measure_id:
                    measure_data = {
                        'measure_id': kpi.measure_id.id,
                        'measure_name': kpi.measure_id.name,
                         
                    }

                kpi_data = {
                    'kpi_name': kpi.name,
                    'main_goal_name': main_goal.name,
                    'weight': kpi.weight,
                    'measure': measure_data,  # Include measure data in the KPI data dictionary
                    'initial': kpi.initial,
                    'first_quarter_plan': kpi.first_quarter_plan,
                    'second_quarter_plan': kpi.second_quarter_plan,
                    'third_quarter_plan': kpi.third_quarter_plan,
                    'fourth_quarter_plan': kpi.fourth_quarter_plan
                }
                main_goal_data['kpis'].append(kpi_data)

            strategic_goal_data['main_goals'].append(main_goal_data)

        table_data.append(strategic_goal_data)

    # Serialize the data and return as JSON response
    return JsonResponse(table_data, safe=False)


@api_view(['POST', 'PUT', 'GET'])
@permission_classes([permissions.IsAuthenticated])
def assign(request):
    if request.method == 'GET':
        # Handle GET request here, maybe return some information or form.
        strategic_goal_id = request.query_params.get('strategic_goal_id')
        if not strategic_goal_id:
            return Response({'error': 'strategic_goal_id is required in query parameters.'}, status=400)
        try:
            # Retrieve StrategicGoal instance
            strategic_goal = StrategicGoal.objects.get(id=strategic_goal_id)
        except StrategicGoal.DoesNotExist:
            return Response({'error': 'Strategic goal does not exist.'}, status=404)

        # Retrieve sector_ids associated with the strategic goal
        sector_ids = strategic_goal.sector_id.values_list('id', flat=True)

        return Response({'sector_ids': list(sector_ids)}, status=200)
    elif request.method == 'PUT':
        # Extract data from the request query parameters
        strategic_goal_id = request.query_params.get('strategic_goal_id')
        sector_id = request.query_params.get('sector_id')

        # Ensure strategic_goal_id and sector_id are provided
        if not strategic_goal_id or not sector_id:
            return Response({'error': 'Both strategic_goal_id and sector_id are required in query parameters.'}, status=400)

        try:
            # Retrieve StrategicGoal instance
            strategic_goal = StrategicGoal.objects.get(id=strategic_goal_id)
        except StrategicGoal.DoesNotExist:
            return Response({'error': 'Strategic goal does not exist.'}, status=404)

        try:
            # Retrieve Sector instance
            sector = Sector.objects.get(id=sector_id)
        except Sector.DoesNotExist:
            return Response({'error': f'Sector with ID {sector_id} does not exist.'}, status=404)

        # Check if sector is assigned to the strategic goal
        if sector in strategic_goal.sector_id.all():
            # Unassign the sector
            strategic_goal.sector_id.remove(sector)

            # Check if there are any sectors left assigned to the strategic goal
            if strategic_goal.sector_id.exists():
                # At least one sector is still assigned, so keep assigned field True
                strategic_goal.save()
            else:
                # No sectors left assigned, so set assigned field to False
                strategic_goal.assigned = False
                strategic_goal.save()

            return Response({'success': 'Sector unassigned from strategic goal successfully.'}, status=200)
        else:
            return Response({'error': 'Sector is not assigned to the specified strategic goal.'}, status=400)

    elif request.method =='POST':
        # Extract data from the request
        data = request.data
        sector_ids = data.get('sector_id', [])  # Get sector_id as a list, default to empty list if not provided
        strategic_goal_id = data.get('strategic_goal_id')

        # Ensure strategic_goal_id is provided
        if not strategic_goal_id:
            return Response({'error': 'strategic_goal_id is required.'}, status=400)

        try:
            # Retrieve StrategicGoal instance
            strategic_goal = StrategicGoal.objects.get(id=strategic_goal_id)
        except StrategicGoal.DoesNotExist:
            return Response({'error': 'Strategic goal does not exist.'}, status=404)

        # Iterate over sector_ids and assign each sector to the strategic goal
        for sector_id in sector_ids:
            try:
                # Retrieve Sector instance
                sector = Sector.objects.get(id=sector_id)
            except Sector.DoesNotExist:
                return Response({'error': f'Sector with ID {sector_id} does not exist.'}, status=404)

            # Add the sector to the strategic goal's many-to-many relationship
            strategic_goal.sector_id.add(sector)

        # Set assigned field to True if at least one sector_id has a value
        if sector_ids:
            strategic_goal.assigned = True
            strategic_goal.save()

        return Response({'success': 'Sectors assigned to strategic goal successfully.'}, status=200)
