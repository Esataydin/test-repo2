from rest_framework import generics, permissions
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import APIException, NotAuthenticated
from rest_framework.response import Response

from django.http import HttpResponse
from django.db.models import Q

from datetime import datetime

from .models import User, Post, Comment, Chat

from .serializers import UserSerializer
from .serializers import PostSerializer, CommentSerializer, ChatSerializer
from .serializers import UserFollowerSerializer, UserFollowingSerializer

from .custom_permissions import IsProfileOwner, IsAuthor



class UserList(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return User.objects.all()


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
    
import pprint
class ChatListCreate(generics.ListCreateAPIView):
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        chats = Chat.objects.filter(
            Q(participant_1=self.request.user) | Q(participant_2=self.request.user)
        )
        return chats
    
    def perform_create(self, serializer):
        # testing needed #TEST
        participant_2 = serializer.validated_data["participant_2"]
        user = self.request.user
        if user.is_authenticated:
            print("AUTHENTICATED")
        else:
            return NotAuthenticated
        
        if serializer.is_valid():
            chat = Chat.objects.filter(
                Q(participant_1=user, participant_2=participant_2) | Q(participant_1=participant_2, participant_2=user)
            )
            if len(chat) == 0:
                serializer.save(participant_1=self.request.user, participant_2=participant_2, messages={})
                # print(f"Chat created between {user.email} - {participant_2.email}")
                return HttpResponse(status=200)
            else:
                print("That chat already exists.")
                #TODO: It doesn't work properly like that, find a way to make it work or redirect to the chat
                return HttpResponse("Conflict: Message already exists", status=409)
        else:
            print(serializer.errors)


class ChatListUpdate(generics.RetrieveUpdateAPIView):
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated]
    
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
        chat.save()
        return Response(ChatSerializer(chat).data)
        
            
class UserFollowerListCreate(generics.ListCreateAPIView):
    serializer_class = UserFollowerSerializer
    permission_classes = [IsAuthenticated]
    
#TODO: It needs to be deleted and only one endpoint should be used for follow actions handling
class UserFollowingListCreate(generics.ListCreateAPIView):
    serializer_class = UserFollowingSerializer
    permission_classes = [IsAuthenticated]