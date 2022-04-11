from django.contrib import admin

from .models import *

class TurnInLine(admin.TabularInline):
    model = Turn
    extra = 1

class MeetingAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Meeting ID', {'fields': ['meeting_id']}),
        ('Meeting Moderator', {'fields':['meeting_mod']}),
        ('Meeting Name', {'fields':['meeting_name']}),
        ('Block Turns', {'fields':['block_turns']}),
    ]
    inlines = [TurnInLine]

class MeetingUserListAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Meeting ID', {'fields': ['meeting_id']}),
        ('User', {'fields':['user']}),
    ]

admin.site.register(Meeting, MeetingAdmin)
admin.site.register(MeetingUserList, MeetingUserListAdmin)