from django.db import models
from django.contrib.auth.models import User

class Meeting(models.Model):
    meeting_id = models.IntegerField(default=0)
    meeting_name = models.CharField(max_length=50)
    meeting_mod = models.OneToOneField(User, on_delete=models.CASCADE)
    block_turns = models.BooleanField(default=False)

    def __str__(self):
        return str(self.meeting_id)

class Turn(models.Model):
    meeting_turns = models.ForeignKey(Meeting, on_delete=models.CASCADE)
    turn_type = models.CharField(max_length=20)
    turn_user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.turn_type + ", " + self.turn_user.username

class MeetingUserList(models.Model):
    meeting_id = models.ForeignKey(Meeting, on_delete=models.CASCADE)
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.meeting_id) + ": " + self.user.username