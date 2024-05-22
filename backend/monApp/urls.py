from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("testtraking", views.TrackingsView)
router.register(
    "divisiontraking", views.TrackingsViewDivision, basename="division-tracking"
)
router.register("teamtraking", views.TrackingsViewTeam, basename="team-tracking")
router.register("systemsetting", views.SystemSettingViewSet, basename="system-setting")
urlpatterns = router.urls
