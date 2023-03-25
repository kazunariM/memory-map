from django.db import models
from django.contrib.auth.models import AbstractUser

import uuid, os

# Create your models here.


class User(AbstractUser):
    def img_path(self, filename):
        result = 'stampbg/{}{}'.format(str(uuid.uuid4().hex), os.path.splitext(filename)[-1])
        return result
    
    prof_image = models.ImageField(upload_to=img_path ,null=True, blank=True)
    