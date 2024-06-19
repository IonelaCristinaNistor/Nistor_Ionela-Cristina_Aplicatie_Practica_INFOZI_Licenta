from django.db import models
from django.contrib.auth.models import User

# Artwork model
class Artwork(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=200, null=True, blank=True)
    artist_name = models.CharField(max_length=200, null=True, blank=True) 
    image = models.ImageField(null=True, blank=True, default='/placeholder.webp')
    description = models.TextField(null=True, blank=True)
    price = models.IntegerField(null=True, blank=True)
    category = models.CharField(max_length=200, null=True, blank=True)
    availability = models.IntegerField(null=True, blank=True)
    likes_counter = models.IntegerField(null=True, blank=True, default=0)
    liked_by = models.ManyToManyField(User, related_name='liked_artworks', blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.title

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    taxPrice = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    deliveryPrice = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    totalPrice = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    orderDate = models.DateTimeField(auto_now_add=True)
    delivered = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)
    status = models.BooleanField(default=False)
    _id = models.AutoField(primary_key=True, editable=False)
    def __str__(self):
        return str(self._id)

class OrderItem(models.Model):
    artwork = models.ForeignKey(Artwork, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=200, null=True, blank=True)
    quantity = models.IntegerField(null=True, blank=True)
    price = models.IntegerField(null=True, blank=True)
    image = models.ImageField(null=True, blank=True)
    item_id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.title)

class DeliveryAddress(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    city = models.CharField(max_length=200, null=True, blank=True)
    deliveryPrice = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.address)

class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    artwork = models.ForeignKey(Artwork, on_delete=models.CASCADE)
    
    
    def __str__(self):
        return f"{self.user.username} - {self.artwork.title}"
    
class Reactions(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    artwork = models.ForeignKey(Artwork, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=255, null=True, blank=True)
    likes_counter = models.IntegerField(default=0, null=True, blank=True)
    comment = models.TextField(null=True, blank=True)
    liked_by = models.ManyToManyField(User, related_name='liked_reactions', blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name