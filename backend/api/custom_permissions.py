from rest_framework import permissions

from .models import Post

class IsProfileOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj == request.user
    
    
class IsAuthor(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.author == request.user
    
class IsPostOwner(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method == 'POST':
            post_id = view.kwargs.get('post_id')
            try:
                post = Post.objects.get(id=post_id)
                return post.author == request.user
            except Post.DoesNotExist:
                return False
        return True