from django.urls import path
from base.views import artwork_views as views

urlpatterns = [
    path('', views.getArtworks, name="artworks"),
    path('create/', views.createArtwork, name="create-artwork"),
    path('upload/', views.uploadImage, name="upload-artwork"),
    path('<int:pk>/', views.getArtwork, name="artwork_information"),
    path('update/<str:pk>/', views.updateArtwork, name="update-artwork"),
    path('delete/<str:pk>/', views.deleteArtwork, name="delete-artwork"),

    path('<int:pk>/add_like/', views.addArtworkLike, name='add-artwork-like'),
    path('reviews/<int:pk>/', views.getReviews, name='get-reviews'),
    path('reviews/<int:pk>/add_comment/', views.addComment, name='add-comment'),
]