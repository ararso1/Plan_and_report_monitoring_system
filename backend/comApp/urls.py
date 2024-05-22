from django.urls import path
from . import views

urlpatterns = [
    path("endpoints", views.getRoutes, name='endpoints'),
    # Chat/Text Messaging Functionality
    path("my-messages/<user_id>/", views.MyInbox.as_view()),
    path("get-messages/<sender_id>/<reciever_id>/", views.GetMessages.as_view()),
    path("send-messages/", views.SendMessages.as_view()),

    #search user with username
    path("search/<username>/", views.SearchUser.as_view()),

]
 
