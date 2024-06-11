from django.urls import path
from base.views.favorite_views import getFavoriteList, deleteFavorite, addFavorite

urlpatterns = [
    path('', getFavoriteList, name='favorites'),
    path('add/', addFavorite, name='add-favorite'),
    path('<int:pk>/', deleteFavorite, name='delete-favorite'),
]
