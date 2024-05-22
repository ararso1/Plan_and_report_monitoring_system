from django.urls import path
from .views import (
    get_strategic_goals, set_strategic_goal, delete_strategic_goal, update_strategic_goal,
    get_main_goals, set_main_goal, delete_main_goal, update_main_goal ,get_kpi,create_kpi,update_kpi,delete_kpi,get_measure,generate_table_data,assign
)

urlpatterns = [
        path('strategicGoals/', get_strategic_goals, name='get_strategic_goals'),
        path('setStrategicGoal/', set_strategic_goal, name='set_strategic_goal'),
        path('updateStrategicGoal/<int:id>/', update_strategic_goal, name='update_strategic_goal'),
        path('deleteStrategicGoal/<int:id>/', delete_strategic_goal, name='delete_strategic_goal'),
        path('mainGoals/', get_main_goals, name='get_main_goals'),
        path('setMainGoal/', set_main_goal, name='set_main_goal'),
        path('updateMainGoal/<int:id>/', update_main_goal, name='update_main_goal'),
        path('deleteMainGoal/<int:id>/', delete_main_goal, name='delete_main_goal'),
        path('getKPI/',get_kpi,name='get_kpi'),
        path('createKPI/',create_kpi,name='create_kpi'),
        path('updateKPI/<int:id>/',update_kpi,name='update_kpi'),
        path('deleteKPI/<int:id>/',delete_kpi,name='delete_kpi'),
        path('measures/', get_measure, name='get_main_goals'),
        path('table-data/', generate_table_data, name='table-data'),
        path('assignGoal/', assign, name='assign'),
        
]
