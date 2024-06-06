from django.urls import path
from base.views import artwork_views as views

urlpatterns = [
    path('', views.getArtworks, name="artworks"),
    path('<int:pk>/', views.getArtwork, name="artwork_information"),
]