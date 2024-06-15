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

    _id = data.get('_id')

    if not _id:
        return Response({'detail': 'Artwork ID is required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        artwork = Artwork.objects.get(_id=_id)
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
def removeFavorite(request, _id):
    user = request.user
    try:
        favorite = Favorite.objects.get(user=user, artwork___id=_id)
        favorite.delete()
        return Response({'message': 'Favorite removed'}, status=status.HTTP_204_NO_CONTENT)
    except Favorite.DoesNotExist:
        return Response({'detail': 'Favorite not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
