from django.urls import path

from . import views

urlpatterns = [
    path("users/", views.UserList.as_view(), name="user-list"),
    path("users/<int:pk>/update/", views.UserProfileUpdate.as_view(), name="user-update"),
    path("posts/", views.PostListCreate.as_view(), name="post-list"),
    path("posts/delete/<int:pk>/", views.PostDelete.as_view(), name="delete-post"),
    path("posts/<int:post_id>/comments/", views.CommentListCreate.as_view(), name="comment-list"),
    path("posts/<int:post_id>/comments/delete/<int:pk>/", views.CommentDelete.as_view(), name="delete-comment"),
    path("chats/", views.ChatListCreate.as_view(), name="chat-list"),
    path("chats/<int:pk>/update/", views.ChatListUpdate.as_view(), name="chat-update"),
    path("follow/", views.UserFollowerListCreate.as_view(), name="follow-list" ),
    path("files/", views.FileList.as_view(), name="file-list"),
    path('posts/<int:post_id>/files/', views.FileUploadView.as_view(), name='file-upload'),
]
