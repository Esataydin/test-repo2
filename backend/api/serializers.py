from rest_framework import serializers

from .models import User
from .models import Post, Comment, File, Chat
from .models import UserFollower, UserFollowing


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id",
                  "email",
                  "name",
                  "student_id",
                  "birthday_date",
                  "phone_number",
                  "profile_picture",
                  "faculty",
                  "department",
                  "field",
                  "graduation_year",
                  "job_title",
                  "working_company",
                  "work_experience",
                  "is_staff_member",
                  "password"
                  ]
        # extra_kwargs = {"password": {"read_only": True}, "email": {"read_only": True}}
        # extra_kwargs = {"password": {"write_only": True}}
        
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ["id", "author", "content", "created_at"]
        extra_kwargs = {"author": {"read_only": True}}

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ["id", "author", "post", "content", "created_at"]
        extra_kwargs = {"author": {"read_only": True},
                        "post":{"read_only": True}
                        }
        
class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ["id", "messages", "participant_1", "participant_2", "created_at"]
        extra_kwargs = {"participant_1": {"read_only": True}
                        }
    class ChatSerializer(serializers.ModelSerializer):
        class Meta:
            model = Chat
            fields = ["id", "messages", "participant_1", "participant_2", "created_at"]
    

    def update(self, instance, validated_data):
        
        instance.messages = validated_data.get('messages', instance.messages)
        instance.save()
        return instance
    
    
class UserFollowerSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFollower
        fields = ["id", "user", "follower"]
        

class UserFollowingSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFollowing
        fields = ["id", "user", "following"]
        
        
class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ['id', 'post', 'file']

class FileListSerializer(serializers.ListSerializer):
    child = FileSerializer()

class FileUploadSerializer(serializers.Serializer):
    files = FileListSerializer()

    def create(self, validated_data):
        files_data = validated_data['files']
        created_files = []
        for file_data in files_data:
            created_file = File.objects.create(**file_data)
            created_files.append(created_file)
        return created_files