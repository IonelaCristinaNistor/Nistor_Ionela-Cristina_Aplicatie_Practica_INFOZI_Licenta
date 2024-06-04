from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('artworks/', views.getArtworks, name="artworks"),
    path('artworks/<int:pk>/', views.getArtwork, name="artwork_information"),
]