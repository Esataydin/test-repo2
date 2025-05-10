from rest_framework import generics, permissions
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny
from rest_framework.exceptions import APIException, NotAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from django.http import HttpResponse
from django.db.models import Q

from datetime import datetime

from .models import User, Post, Comment, Chat, File
from .models import UserFollower

from .serializers import UserSerializer
from .serializers import PostSerializer, CommentSerializer, ChatSerializer
from .serializers import UserFollowerSerializer, FileSerializer, FileUploadSerializer, FileListSerializer, UserProfileFeedSerializer

from .custom_permissions import IsProfileOwner, IsAuthor, IsPostOwner



class UserList(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return User.objects.all()

class UserProfileFeedView(generics.RetrieveAPIView):
    serializer_class = UserProfileFeedSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


class UserProfileUpdate(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsProfileOwner]

    def get_queryset(self):
        user = self.request.user
        user_retrieved = User.objects.filter(email=user.email)
        return user_retrieved

    def get_serializer(self, *args, **kwargs):
        serializer = super().get_serializer(*args, **kwargs)
        serializer.fields.pop('password', None)
        return serializer

    def perform_update(self, serializer):
        if serializer.is_valid():
            # Exclude password from update process
            serializer.validated_data.pop('password', None)
            # serializer.validated_data.pop('email', None)
            serializer.save()
        else:
            print(serializer.errors)
        return self.get_queryset()

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
    
class PostListCreate(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Post.objects.all()
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class PostDelete(generics.DestroyAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated, IsAuthor]

    def get_queryset(self):
        user = self.request.user
        return Post.objects.all()
    
    
class CommentListCreate(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_post(self):
        post_id = self.kwargs["post_id"]
        post = Post.objects.get(id=post_id)
        return post
    
    # print(post.comments)
    
    def get_queryset(self):
        post = self.get_post()
        # comment_id = self.kwargs["pk"]
        user = self.request.user
        # print(self.post.comments)
        return post.comments
    
    def perform_create(self, serializer):
        post = self.get_post()
        if serializer.is_valid():
            serializer.save(author=self.request.user, post= post)
        else:
            print(serializer.errors)

    
class CommentDelete(generics.DestroyAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated, IsAuthor]

    def get_queryset(self):
        user = self.request.user
        return Comment.objects.all()
    
class ChatListCreate(generics.ListCreateAPIView):
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        chats = Chat.objects.filter(
            Q(participant_1=self.request.user) | Q(participant_2=self.request.user)
        )
        return chats
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        participant_2_id = request.data.get("participant_2")
        if not participant_2_id:
            return Response(
                {"error": "participant_2 is required"},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        try:
            participant_2 = User.objects.get(id=participant_2_id)
        except User.DoesNotExist:
            return Response(
                {"error": "User not found"},
                status=status.HTTP_404_NOT_FOUND
            )
            
        user = self.request.user

        # Check if chat exists
        chat = Chat.objects.filter(
            Q(participant_1=user, participant_2=participant_2) | 
            Q(participant_1=participant_2, participant_2=user)
        )
        
        if chat.exists():
            return Response(
                {"error": "Chat already exists", "chat_id": chat[0].id},
                status=status.HTTP_409_CONFLICT
            )

        # Create new chat
        chat = serializer.save(
            participant_1=user,
            participant_2=participant_2,
            messages={},
            lastMessage=None  # Initialize lastMessage as None for new chats
        )
        return Response(
            ChatSerializer(chat).data,
            status=status.HTTP_201_CREATED
        )


class ChatListUpdate(generics.RetrieveUpdateAPIView):
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated]
    # TODO: If tries to update another user's chat, it should return 403
    def get_queryset(self):
        user = self.request.user
        chat_pk = self.kwargs["pk"]
        if not user.is_authenticated:
            return NotAuthenticated
        chat = Chat.objects.filter(participant_1=user, pk=chat_pk)
        if len(chat) == 0:
            chat = Chat.objects.filter(participant_2=user, pk=chat_pk)
            if len(chat) == 0:
                return None
        return chat

    def perform_update(self, serializer):
        chat = self.get_queryset()[0]
        
        time = str(datetime.now())
        message = self.request.data["message"]
        
        if message == "":
            return None
        
        new_message = {
            "sender": self.request.user.id,
            "body": message
        }
        chat.messages[time] = new_message
        chat.lastMessage = message  # Update lastMessage with the new message text
        chat.save()
        
        # Return updated chat data through serializer
        updated_chat = Chat.objects.get(pk=chat.pk)
        return ChatSerializer(updated_chat).data

    def update(self, request, *args, **kwargs):
        updated_data = self.perform_update(self.get_serializer())
        if updated_data is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(updated_data)
        
            
class UserFollowerListCreate(generics.ListCreateAPIView):
    serializer_class = UserFollowerSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        # Get query parameter to filter followers or following
        filter_type = self.request.query_params.get('type', 'followers')
        user = self.request.user
        
        if filter_type == 'following':
            return UserFollower.objects.filter(follower=user)
        return UserFollower.objects.filter(user=user)
    
    def create(self, request, *args, **kwargs):
        # Get the user to follow
        user_to_follow = request.data.get('user')
        
        # Check if already following
        existing_follow = UserFollower.objects.filter(
            user_id=user_to_follow,
            follower=request.user
        )
        
        if existing_follow.exists():
            return Response(
                {"error": "Already following this user"},
                status=status.HTTP_409_CONFLICT
            )
            
        # Create new follow relationship
        serializer = self.get_serializer(data={
            'user': user_to_follow,
            'follower': request.user.id
        })
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
class UserUnfollow(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    
    def delete(self, request, user_id):
        try:
            follow = UserFollower.objects.get(
                user_id=user_id,
                follower=request.user
            )
            follow.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except UserFollower.DoesNotExist:
            return Response(
                {"error": "Not following this user"},
                status=status.HTTP_404_NOT_FOUND
            )
    
class FileList(generics.ListAPIView):
    serializer_class = FileSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get_queryset(self):
        return File.objects.all()
    
            
class FileUploadView(APIView):
    permission_classes = [IsAuthenticated, IsPostOwner]

    def post(self, request, post_id):
        print(post_id)
        try:
            post = Post.objects.get(id=post_id)
            files = request.FILES.getlist('files')
            file_data = [{'file': file, 'post': post_id} for file in files]
            serializer = FileUploadSerializer(data={'files': file_data})
            if serializer.is_valid():
                created_files = serializer.create(serializer.validated_data)
                response_serializer = FileSerializer(created_files, many=True)
                return Response(response_serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Post.DoesNotExist:
            return Response({'error': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)

    def get(self, request, post_id):
        post = Post.objects.get(id=post_id)
        files = File.objects.filter(post=post)
        serializer = FileSerializer(files, many=True)
        return Response(serializer.data)