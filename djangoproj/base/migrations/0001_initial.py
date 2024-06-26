# Generated by Django 5.0.6 on 2024-06-19 18:19

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Artwork',
            fields=[
                ('title', models.CharField(blank=True, max_length=200, null=True)),
                ('artist_name', models.CharField(blank=True, max_length=200, null=True)),
                ('image', models.ImageField(blank=True, default='/placeholder.webp', null=True, upload_to='')),
                ('description', models.TextField(blank=True, null=True)),
                ('price', models.IntegerField(blank=True, null=True)),
                ('category', models.CharField(blank=True, max_length=200, null=True)),
                ('availability', models.IntegerField(blank=True, null=True)),
                ('likes_counter', models.IntegerField(blank=True, default=0, null=True)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('liked_by', models.ManyToManyField(blank=True, related_name='liked_artworks', to=settings.AUTH_USER_MODEL)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ArtworkReactions',
            fields=[
                ('comment', models.TextField(blank=True, null=True)),
                ('likes_count', models.IntegerField(blank=True, null=True)),
                ('username', models.CharField(blank=True, max_length=200, null=True)),
                ('reaction_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('artwork', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.artwork')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Favorite',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('artwork', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.artwork')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('taxPrice', models.DecimalField(blank=True, decimal_places=2, max_digits=6, null=True)),
                ('deliveryPrice', models.DecimalField(blank=True, decimal_places=2, max_digits=6, null=True)),
                ('totalPrice', models.DecimalField(blank=True, decimal_places=2, max_digits=12, null=True)),
                ('isPaid', models.BooleanField(default=False)),
                ('paidAt', models.DateTimeField(blank=True, null=True)),
                ('isDelivered', models.BooleanField(default=False)),
                ('orderDate', models.DateTimeField(auto_now_add=True)),
                ('delivered', models.DateTimeField(auto_now_add=True, null=True)),
                ('paymentMethod', models.CharField(blank=True, max_length=200, null=True)),
                ('status', models.BooleanField(default=False)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='DeliveryAddress',
            fields=[
                ('address', models.CharField(blank=True, max_length=200, null=True)),
                ('city', models.CharField(blank=True, max_length=200, null=True)),
                ('deliveryPrice', models.DecimalField(blank=True, decimal_places=2, max_digits=6, null=True)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('order', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='base.order')),
            ],
        ),
        migrations.CreateModel(
            name='OrderItem',
            fields=[
                ('title', models.CharField(blank=True, max_length=200, null=True)),
                ('quantity', models.IntegerField(blank=True, null=True)),
                ('price', models.IntegerField(blank=True, null=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='')),
                ('item_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('artwork', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.artwork')),
                ('order', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.order')),
            ],
        ),
        migrations.CreateModel(
            name='Reactions',
            fields=[
                ('name', models.CharField(blank=True, max_length=255, null=True)),
                ('likes_counter', models.IntegerField(blank=True, default=0, null=True)),
                ('comment', models.TextField(blank=True, null=True)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('artwork', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.artwork')),
                ('liked_by', models.ManyToManyField(blank=True, related_name='liked_reactions', to=settings.AUTH_USER_MODEL)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
