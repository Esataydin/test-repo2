from django.urls import path

from . import views

urlpatterns = [
    path("users/", views.UserList.as_view(), name="user-list"),
    path("users/<int:pk>/update/", views.UserProfileUpdate.as_view(), name="user-update"),
    # path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    # path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
    path("posts/", views.PostListCreate.as_view(), name="post-list"),
    path("posts/delete/<int:pk>/", views.PostDelete.as_view(), name="delete-post"),
    path("comments/", views.CommentListCreate.as_view(), name="comment-list"),
    path("comments/delete/<int:pk>/", views.CommentDelete.as_view(), name="delete-comment"),
    path("chats/", views.ChatListCreate.as_view(), name="chat-list"),
    path("chats/<int:pk>/update/", views.ChatListUpdate.as_view(), name="chat-update"),
    path("follow/", views.UserFollowerListCreate.as_view(), name="follow-list" ),
]
