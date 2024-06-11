from django.urls import path
from base.views.favorite_views import getFavoriteList, deleteFavorite

urlpatterns = [
    path('', getFavoriteList, name='favorites'),
    path('<int:pk>/', deleteFavorite, name='delete-favorite'),
]
