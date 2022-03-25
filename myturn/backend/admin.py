from django.contrib import admin

from .models import *

class TurnInLine(admin.TabularInline):
    model = Turn
    extra = 1

class MeetingAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Meeting ID', {'fields': ['meeting_id']}),
        ('Meeting Moderator', {'fields':['meeting_mod']}),
        ('Meeting Name', {'fields':['meeting_name']})
    ]
    inlines = [TurnInLine]

admin.site.register(Meeting, MeetingAdmin)