from rest_framework import serializers
from django.contrib.auth.models import User, Group
from .models import *
from userApp.serializers import UserSerializer
#from userApp.serializers import UserProfileSerializer

class MessageSerializer(serializers.ModelSerializer):
    receiver_profile = UserSerializer(read_only=True, source="receiver.profile")
    sender_profile = UserSerializer(read_only=True, source="sender.profile")

    class Meta:
        model = ChatMessage
        fields = ['id', 'sender', 'reciever', 'receiver_profile', 'sender_profile', 'message', 'is_read', 'date']
        read_only_fields = ('sender',)  # Make 'sender' read-only to set it programmatically

    def create(self, validated_data):
        # Set the sender to the current user from the request context
        validated_data['sender'] = self.context['request'].user
        return super().create(validated_data)
    
class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notifications
        fields = ['id', 'recipient', 'message', 'is_read', 'created_at']
