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

    artwork = Artwork.objects.get(_id=_id)
    favorite, created = Favorite.objects.get_or_create(user=user, artwork=artwork)
    if created:
        return Response({'message': 'Favorite added'})

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def removeFavorite(request, _id):
    user = request.user
    favorite = Favorite.objects.get(user=user, artwork___id=_id)
    favorite.delete()
    return Response({'message': 'Favorite removed'})