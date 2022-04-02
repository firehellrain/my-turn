# Generated by Django 4.0 on 2022-04-02 14:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('backend', '0003_alter_meeting_id_alter_turn_id'),
    ]

    operations = [
        migrations.CreateModel(
            name='MeetingUserList',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('meeting_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.meeting')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='auth.user')),
            ],
        ),
    ]