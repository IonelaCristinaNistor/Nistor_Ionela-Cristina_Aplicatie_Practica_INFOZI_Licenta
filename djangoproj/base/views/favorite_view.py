from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from base.models import Favorite, Artwork
from base.serializers import FavoriteSerializer
from rest_framework import status

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getFavorites(request):
    user = request.user
    favorites = Favorite.objects.filter(user=user)
    serializer = FavoriteSerializer(favorites, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addFavorite(request):
    user = request.user
    data = request.data

    artwork_id = data.get('artwork_id', None)

    if artwork_id is None:
        return Response({'detail': 'Artwork ID is required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        artwork = Artwork.objects.get(artwork_id=artwork_id)
        favorite, created = Favorite.objects.get_or_create(user=user, artwork=artwork)
        if created:
            return Response({'message': 'Favorite added'}, status=status.HTTP_201_CREATED)
        return Response({'message': 'Favorite already exists'}, status=status.HTTP_400_BAD_REQUEST)
    except Artwork.DoesNotExist:
        return Response({'detail': 'Artwork not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def removeFavorite(request, favorite_id):
    user = request.user
    print(f"User: {user}, Favorite ID: {favorite_id}")  # Log the user and favorite_id
    try:
        favorite = Favorite.objects.get(user=user, id=favorite_id)
        favorite.delete()
        print(f"Favorite with id {favorite_id} deleted for user {user}")  # Log successful deletion
        return Response({'message': 'Favorite removed'}, status=status.HTTP_204_NO_CONTENT)
    except Favorite.DoesNotExist:
        print(f"Favorite with id {favorite_id} not found for user {user}")  # Log if favorite not found
        return Response({'detail': 'Favorite not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print(f"Error deleting favorite: {e}")  # Log any other errors
        return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
