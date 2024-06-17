from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status

from base.models import Artwork, Review
from base.artworks import artworks
from base.serializers import ArtworkSerializer, ReviewSerializer

@api_view(['GET'])
def getArtworks(request):
    artworks = Artwork.objects.all()
    serializers = ArtworkSerializer(artworks, many=True)
    return Response(serializers.data)

@api_view(['GET'])
def getArtwork(request, pk): # ONE PRODUCT
    artwork = Artwork.objects.get(_id=pk)
    serializer = ArtworkSerializer(artwork, many=False)
    return Response(serializer.data)

# ADMIN USER =>

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createArtwork(request):
    user = request.user
    artwork = Artwork.objects.create(
        user = user,
        title ='Sample title',
        artist_name = 'Artist name',
        description = 'Description',
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
    artwork = Artwork.objects.get(_id=pk)
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
    artwork = Artwork.objects.get(_id=pk)
    artwork.delete()
    return Response('Artwork deleted')

@api_view(['POST'])
def uploadImage(request):
    data = request.data

    artwork_id = data['artwork_id']
    artwork = Artwork.objects.get(_id=artwork_id)

    artwork.image = request.FILES.get('image')
    artwork.save()
    return Response('Image was uploaded with success')

@api_view(['GET'])
def getReviews(request, pk):
    try:
        artwork = Artwork.objects.get(_id=pk)
        reviews = Review.objects.filter(artwork=artwork)
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)
    except Artwork.DoesNotExist:
        return Response({'status': 'artwork not found'}, status=404)
    except Exception as e:
        return Response({'status': 'error', 'message': str(e)}, status=500)
    
@api_view(['POST'])
def addArtworkLike(request, pk):
    try:
        artwork = Artwork.objects.get(pk=pk)
        user = request.user

        if user in artwork.liked_by.all():
            artwork.liked_by.remove(user)
            artwork.likes_counter -= 1
        else:
            artwork.liked_by.add(user)
            artwork.likes_counter += 1

        artwork.save()
        serializer = ArtworkSerializer(artwork)
        return Response({'status': 'like toggled', 'artwork': serializer.data})
    except Artwork.DoesNotExist:
        return Response({'status': 'artwork not found'}, status=404)
    except Exception as e:
        return Response({'status': 'error', 'message': str(e)}, status=500)

@api_view(['POST'])
def addComment(request, pk):
    try:
        user = request.user
        artwork = Artwork.objects.get(_id=pk)
        data = request.data

        review = Review.objects.create(
            user=user,
            artwork=artwork,
            name=user.username,
            likes_counter=0,
            comment=data['comment']
        )
        serializer = ReviewSerializer(review)
        return Response({'status': 'comment added', 'review': serializer.data})
    except Artwork.DoesNotExist:
        return Response({'status': 'artwork not found'}, status=404)
    except Exception as e:
        return Response({'status': 'error', 'message': str(e)}, status=500)
