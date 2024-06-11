from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from base.models import Favorite, Artwork, User
from base.serializers import FavoriteSerializer, ArtworkSerializer
from rest_framework import status

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getFavoriteList(request):
    user = request.user
    favorites = Favorite.objects.filter(user=user)
    favorite_list = []

    for favorite in favorites:
        artwork = Artwork.objects.get(artwork_id=favorite.artwork.artwork_id)
        favorite_data = {
            'id': favorite.id,
            'user': favorite.user.id,
            'artwork': artwork.artwork_id,
            'image': artwork.image.url,
            'title': artwork.title,
        }
        favorite_list.append(favorite_data)

    return Response(favorite_list)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addFavorite(request):
    user = request.user
    data = request.data

    try:
        print('Received data:', data)

        artwork_id = data.get('id')
        if not artwork_id:
            return Response({'detail': 'Artwork ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        artwork = Artwork.objects.get(artwork_id=artwork_id)

        favorite, created = Favorite.objects.get_or_create(user=user, artwork=artwork)
        if not created:
            return Response({'detail': 'Item already in favorites'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = FavoriteSerializer(favorite, many=False)
        return Response(serializer.data)

    except Artwork.DoesNotExist:
        return Response({'detail': 'Artwork not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print('Error adding favorite:', e)
        return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteFavorite(request, pk):
    user = request.user
    try:
        favorite = Favorite.objects.get(pk=pk, user=user)
        favorite.delete()
        return Response('Favorite deleted', status=status.HTTP_204_NO_CONTENT)
    except Favorite.DoesNotExist:
        return Response({'detail': 'Favorite not found'}, status=status.HTTP_404_NOT_FOUND)
