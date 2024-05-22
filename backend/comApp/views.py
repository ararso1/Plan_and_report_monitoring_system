from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics
from .serializers import *
from django.db.models import OuterRef, Subquery
from django.db.models import Q
from userApp.serializers import UserSerializer
#from userApp.models import UserProfile
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
#from .models import Notifications

# Create your views here.
@api_view(['GET'])
def getRoutes(request):
    routes = {
        "chat_endpoints": [
            { 
            "url": "/my-messages/<user_id>/",
            "method": "GET",
            "description": "Retrieve all messages for a user, both sent and received, identified by their user ID."
            },
            {
            "url": "/get-messages/<sender_id>/<receiver_id>/",
            "method": "GET",
            "description": "Fetch all messages exchanged between two users, identified by their sender and receiver IDs."
            },
            {
            "url": "/send-messages/",
            "method": "POST",
            "description": "Send a new message from one user to another. Requires message content and sender and receiver IDs in the request body."
            }
        ],
        "user_search_endpoints": [

            {
            "url": "/search/<username>/",
            "method": "GET",
            "description": "Search for a user by their username and retrieve their profile information."
            }
        ]
    }
    return JsonResponse(routes)

# Chat App
class MyInbox(generics.ListAPIView):
    serializer_class = MessageSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']

        messages = ChatMessage.objects.filter(
            id__in =  Subquery(
                User.objects.filter(
                    Q(sender__reciever=user_id) |
                    Q(reciever__sender=user_id)
                ).distinct().annotate(
                    last_msg=Subquery(
                        ChatMessage.objects.filter(
                            Q(sender=OuterRef('id'),reciever=user_id) |
                            Q(reciever=OuterRef('id'),sender=user_id)
                        ).order_by('-id')[:1].values_list('id',flat=True) 
                    )
                ).values_list('last_msg', flat=True).order_by("-id")
            )
        ).order_by("-id")
            
        return messages
    
class GetMessages(generics.ListAPIView):
    serializer_class = MessageSerializer
    
    def get_queryset(self):
        sender_id = self.kwargs['sender_id']
        reciever_id = self.kwargs['reciever_id']
        messages =  ChatMessage.objects.filter(sender__in=[sender_id, reciever_id], reciever__in=[sender_id, reciever_id])
        return messages


class SendMessages(generics.CreateAPIView):
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        '''
        Extra context provided to the serializer class.
        '''
        return {'request': self.request}

    def perform_create(self, serializer):
        '''
        Override perform_create to create a notification after the message is saved.
        '''
        message_instance = serializer.save()  # Save the message instance

        # Assuming your message model has 'sender' and 'recipient' fields
        sender = message_instance.sender
        recipient = message_instance.reciever

        # Create a notification for the recipient
        Notifications.objects.create(
            recipient=recipient,
            message=f"You received a new message from {sender.username}",
            is_read=False
        )


class SearchUser(generics.ListAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]  

    def list(self, request, *args, **kwargs):
        username = self.kwargs['username']
        logged_in_user = self.request.user
        users = User.objects.filter(Q(user__username__icontains=username) | Q(first_name__icontains=username) | Q(user__email__icontains=username) & 
                                       ~Q(user=logged_in_user))

        if not users.exists():
            return Response(
                {"detail": "No users found."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = self.get_serializer(users, many=True)
        return Response(serializer.data)
    

class NotificationListView(generics.ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Notifications.objects.filter(recipient=user).order_by('-created_at')