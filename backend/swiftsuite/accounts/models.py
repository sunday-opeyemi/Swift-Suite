from django.contrib.auth.models import AbstractUser
from django.db import models

class AllUser(AbstractUser):
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=11, unique=True, null=True)
    is_staff = models.BooleanField(default=1)

    # Add custom fields here, if needed

    def __str__(self):
        return self.username