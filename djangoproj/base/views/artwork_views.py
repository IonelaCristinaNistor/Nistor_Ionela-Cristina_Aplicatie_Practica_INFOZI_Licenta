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
def getArtwork(request, pk): # ONE PRODUCT
    artwork = Artwork.objects.get(artwork_id=pk)
    serializer = ArtworkSerializer(artwork, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createArtwork(request):
    user = request.user
    artwork = Artwork.objects.create(
        user = user,
        title ='Sample title',
        artist_name = 'Artist name',
        description = '',
        price = 0,
        category = 'Sample Category',
        availability = 0, 
    )
    serializer = ArtworkSerializer(artwork, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateArtwork(request, pk):
    data = request.data
    artwork = Artwork.objects.get(artwork_id=pk)
    artwork.title = data['title']
    artwork.artist_name = data['artist_name']
    artwork.description = data['description']
    artwork.price = data['price']
    artwork.category = data['category']
    artwork.availability = data['availability']

    artwork.save()
    serializer = ArtworkSerializer(artwork, many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteArtwork(request, pk):
    artwork = Artwork.objects.get(artwork_id=pk)
    artwork.delete()
    return Response('Artwork deleted')