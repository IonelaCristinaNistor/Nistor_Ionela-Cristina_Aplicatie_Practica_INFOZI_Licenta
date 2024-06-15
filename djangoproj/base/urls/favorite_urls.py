from django.urls import path
from base.views import favorite_view as views

urlpatterns = [
    path('', views.getFavorites, name='get-favorites'),
    path('add/', views.addFavorite, name='add-favorite'),
    path('remove/<int:_id>/', views.removeFavorite, name='remove-favorite'),
]
