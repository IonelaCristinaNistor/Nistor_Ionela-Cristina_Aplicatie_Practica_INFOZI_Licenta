from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Artwork, OrderItem, Order, DeliveryAddress

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    # _id = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', 'isAdmin'] #add the _id 

    #def get__id(self, obj):
        #return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email

        return name
    
class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', 'isAdmin', 'token'] #add the _id 

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

class ArtworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artwork
        fields = '__all__'

class DeliveryAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryAddress
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    orders = serializers.SerializerMethodField(read_only=True)
    deliveryAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'
    
    def get_orders(self, obj):
        items = obj.orderItem_set.all
        serializer  = OrderItemSerializer(items, many=True)
        return serializer.data

    def get_deliveryAddress(self, obj):
        try:
            address = obj.DeliveryAddressSerializer(obj.deliveryAddress, many=False)
        except:
            address = False
        return address
    
    def get_user(self, obj):
        user = obj.orderitem_set.user
        serializer  = UserSerializer(user, many=False)
        return serializer.data