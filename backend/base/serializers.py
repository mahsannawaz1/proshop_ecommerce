from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Product,Order,OrderItem,ShippingAddress

class ProductSerializer(serializers.ModelSerializer):
  class Meta:
    model=Product
    fields='__all__'

class ShippingAddressSerializer(serializers.ModelSerializer):
  class Meta:
    model=ShippingAddress
    fields='__all__'

class OrderItemSerializer(serializers.ModelSerializer):
  class Meta:
    model=OrderItem
    fields='__all__'

class OrderSerializer(serializers.ModelSerializer):
  orderItems=serializers.SerializerMethodField(method_name='getOrderItems')
  shippingAddress=serializers.SerializerMethodField(method_name='getShippingAddress')
  user=serializers.SerializerMethodField(method_name='getUser')
  class Meta:
    model=Order
    fields=['_id', 'user', 'shippingAddress', 'orderItems', 'payment_method', 'taxPrice','shippingPrice','totalPrice','isPaid','paidAt','isDelivered','deliveredAt','createdAt']
    
  def getOrderItems(self,order):
    items=order.order_items.all()
    serializer=OrderItemSerializer(items,many=True)
    return serializer.data

  def getShippingAddress(self,order):
    
    try:
      address=ShippingAddressSerializer(order.shippingAddress,many=False)
    except :
      address=False
    return address

  def getUser(self,order):
    user=order.user
    serializer=UserSerializerWithToken(user,many=False)  
    return serializer.data





class UserSerializer(serializers.ModelSerializer):
  name=serializers.SerializerMethodField(method_name='get_name')
  isAdmin=serializers.SerializerMethodField(method_name='get_isAdmin')
  _id=serializers.SerializerMethodField(method_name='get_id')
  
  class Meta:
    model=User
    fields=['id','username','email','name','_id','isAdmin']

  def get_name(self,user):
    if user.first_name:
      return f'{user.first_name} {user.last_name}'
    return user.email
  def get_id(self,user):
    return user.id
  def get_isAdmin(self,user):
    return user.is_staff


class UserSerializerWithToken(UserSerializer):
  token=serializers.SerializerMethodField(method_name='get_token')
  class Meta:
    model=User
    fields=['id','username','email','name','_id','isAdmin','token']

  def get_token(self,user):
    token=RefreshToken.for_user(user)
    return str(token.access_token)

 
