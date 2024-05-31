from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Artwork
from .artworks import artworks
from .serializer import ArtworkSerializer

# Create your views here.

@api_view (['GET'])
def getRoutes(request):
    routes = [
        '/api/artworks/',

        '/api/artworks/create/',

        '/api/artworks/upload/',

        '/api/artworks/<id>/reviews/',

        '/api/artworks/top/',
        '/api/artworks/<id>/',
        '/api/artworks/delete/<id>/',
        '/api/artworks/update/<id>/',
    ]

    return Response(routes)

@api_view(['GET'])
def getArtworks(request):
    artworks = Artwork.objects.all()
    serializer = ArtworkSerializer(artworks, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getArtwork(request, pk):
    artwork = Artwork.objects.get(artwork_id=pk)
    serializer = ArtworkSerializer(artwork, many=False)
        
    return Response(serializer.data)