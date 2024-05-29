from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .artworks import artworks

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
    return Response(artworks)

@api_view(['GET'])
def getArtwork(request, pk):
    artwork = None
    for i in artworks:
        if i['artwork_id'] == pk:
            artwork = i
            break
        
    return Response(artwork)