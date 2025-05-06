from django.contrib import admin

# from .models import Note 
from .models import User,UserFollower, Post, Comment, File, Chat

# Register your models here.

class UserAdmin(admin.ModelAdmin):
      # exclude = ("groups", "user_permissions", )
      exclude = ("password", "groups", "user_permissions", )


# admin.site.register(Note)
admin.site.register(User, UserAdmin)
admin.site.register(UserFollower)
# admin.site.register(UserFollowing)
admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(File)
admin.site.register(Chat)
