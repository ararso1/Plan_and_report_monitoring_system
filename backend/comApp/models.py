from django.db import models
from django.contrib.auth import get_user_model
from userApp.models import *

# Chat App Model
class ChatMessage(models.Model):
    # user = models.ForeignKey('userApp.User', on_delete=models.SET_NULL, null=True, related_name="user")
    sender = models.ForeignKey('userApp.User', on_delete=models.SET_NULL, null=True, related_name="sender")
    reciever = models.ForeignKey('userApp.User', on_delete=models.SET_NULL, null=True, related_name="reciever")
    message = models.CharField(max_length=10000000000)
    is_read = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['date']
        verbose_name_plural = "Message"

    def __str__(self):
        return f"{self.sender} - {self.reciever}"

    @property
    def sender_profile(self):
        sender_profile = User.objects.get(user=self.sender)
        return sender_profile
    
    @property
    def reciever_profile(self):
        reciever_profile = User.objects.get(user=self.reciever)
        return reciever_profile
    
    def send_message(sender, recipient, content):
        # Logic to send the message (not shown)
        # ...
        
        # Create a notification for the recipient
        Notifications.objects.create(
            recipient=recipient,
            message=f"You received a new message from {sender.username}",
            is_read=False
        )


class Notifications(models.Model):
    recipient = models.ForeignKey('userApp.User', on_delete=models.CASCADE, related_name='notifications')
    message = models.CharField(max_length=255)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Notification for {self.recipient.username}: {self.message}"


