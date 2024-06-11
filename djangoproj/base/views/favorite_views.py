from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from base.models import Favorite, Artwork
from base.serializers import FavoriteSerializer
from rest_framework import status

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getFavoriteList(request):
    favorites = Favorite.objects.filter(user=request.user)
    serializer = FavoriteSerializer(favorites, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addFavorite(request):
    user = request.user
    data = request.data
    artwork = Artwork.objects.get(_id=data['id'])
    favorite, created = Favorite.objects.get_or_create(user=user, artwork=artwork)
    if created:
        return Response(FavoriteSerializer(favorite).data)
    else:
        return Response({'detail': 'Item already in favorites'}, status=400)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteFavorite(request, pk):
    favorite = Favorite.objects.get(pk=pk)
    favorite.delete()
    return Response('DELETE')