from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(Artwork)
admin.site.register(ArtworkReactions)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)
