from django.urls import path
from base.views import order_views as views

urlpatterns = [
    path('', views.getOrders, name='orders'),
    path('add/', views.addItemsInOrder, name='orders-add'),
    path('myorders/', views.getMyOrders, name='my-orders'),
    
    path('<str:pk>/deliver/', views.updateDelivery, name='order-delivery'),
    path('<str:pk>/', views.getOrderById, name='order'),
    path('<str:pk>/pay/', views.updateOrderToPaid, name='order-pay'),
]
