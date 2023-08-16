from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
  class Meta:
    model=Product
    fields='__all__'

class UserSerializer(serializers.ModelSerializer):
  name=serializers.SerializerMethodField(method_name='get_name')
  isAdmin=serializers.SerializerMethodField(method_name='get_isAdmin')
  _id=serializers.SerializerMethodField(method_name='get_id')
  
  class Meta:
    model=User
    fields=['id','username','email','name','_id']

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
    fields=['id','username','email','name','_id','token']

  def get_token(self,user):
    token=RefreshToken.for_user(user)
    return str(token.access_token)
