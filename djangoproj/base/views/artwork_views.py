from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status

from base.models import Artwork
from base.artworks import artworks
from base.serializers import ArtworkSerializer

#PRODUCTS

@api_view(['GET'])
def getArtworks(request):
    artworks = Artwork.objects.all()
    serializers = ArtworkSerializer(artworks, many=True)
    return Response(serializers.data)

@api_view(['GET'])
def getArtwork(request, pk):
    artwork = Artwork.objects.get(artwork_id=pk)
    serializers = ArtworkSerializer(artwork, many=False)
        
    return Response(serializers.data)