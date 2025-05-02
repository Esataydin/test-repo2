from django.db import models
from django.contrib.auth.models import UserManager, AbstractBaseUser, PermissionsMixin
from django.utils import timezone

# Create your models here.
    
class CustomUserManager(UserManager):
    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("You have not provided a valid e-mail address")
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        
        return user
    
    def create_user(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra_fields)
    
    def create_superuser(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self._create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(blank=True, default="", unique=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    
    student_id = models.IntegerField(null=True, blank=True) # will be pk
    birthday_date = models.DateField(null=True, blank=True)
    phone_number = models.TextField(max_length=20, null=True, blank=True)
    profile_picture = models.ImageField(upload_to="profile_pictures", blank=True, null=True)
    
    faculty = models.TextField(null=True, blank=True)
    department = models.TextField(null=True, blank=True)
    field = models.TextField(null=True, blank=True)
    
    graduation_year = models.DateField(auto_now=False, null=True, blank=True)
    
    job_title = models.CharField(max_length=50, null=True, blank=True)
    working_company = models.CharField(max_length=50, null=True, blank=True)
    work_experience = models.CharField(max_length=30, null=True, blank=True)
        
    is_staff_member = models.BooleanField(default=False)
    
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    
    date_joined = models.DateTimeField(default=timezone.now)
    last_login = models.DateTimeField(blank=True, null=True)
    
    objects = CustomUserManager()
    
    USERNAME_FIELD = "email"
    EMAIL_FIELD = "email"
    REQUIRED_FIELDS = []
    
    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"
    
    def get_full_name(self):
        return self.name
    
    def get_short_name(self):
        return self.name or self.email.split("@")[0]
    
    def __str__(self):
        return str(self.id)

class UserFollower(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="followers")
    follower = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.user.name} - {self.follower.name}"

class UserFollowing(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="followings")
    following = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.user.name} - {self.following.name}"


class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    content = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return f"{self.author.name} - {self.content[0:15]}"

class Comment(models.Model):
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="comments")
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
    created_at = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return f"{self.author.name} - {self.content[0:15]}"

class File(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="files")
    file = models.FileField(upload_to="posts/files")
    
    def __str__(self):
        return f"{self.post.author.name} - {self.post.content[0:15]}"


class Chat(models.Model):
    messages = models.JSONField(null=True, blank=True)
    participant_1 = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="chats_1")
    participant_2 = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="chats_2")
    created_at = models.DateTimeField(auto_now_add=True)
    
    # def __str__(self):
        # return self.messages['test']
    