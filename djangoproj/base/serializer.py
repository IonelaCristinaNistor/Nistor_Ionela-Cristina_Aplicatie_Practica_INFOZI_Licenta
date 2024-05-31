from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Artwork

class ArtworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artwork
        fields = '__all__'