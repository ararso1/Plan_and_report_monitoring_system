from django.contrib import admin
from django.urls import path
from.views import KPIDescriptionListCreate, KPIDescriptionRetrieveUpdateDelete
from .views import SummaryListCreate, SummaryRetrieveUpdateDelete
from .views import MeasureListCreate, MeasureRetrieveUpdateDelete

urlpatterns = [
    path('kpidescription/', KPIDescriptionListCreate.as_view(), name= 'Create-KPID-List'),
    path('kpidescription/<int:pk>/', KPIDescriptionRetrieveUpdateDelete.as_view(), name= 'KPID-Details'),
    path('measure/', MeasureListCreate.as_view(), name = 'Create-Measure-List'),
    path('measure/<int:pk>/', MeasureRetrieveUpdateDelete.as_view(), name = 'Measure-Details'),
    path('summary/', SummaryListCreate.as_view(), name = 'Create-Summary-List' ),
    path('summary/<int:pk>/', SummaryRetrieveUpdateDelete.as_view(), name = 'Summary-Details')
]
