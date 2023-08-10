from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Product(models.Model):
  _id=models.AutoField(primary_key=True,editable=False)
  user=models.ForeignKey(User,on_delete=models.SET_NULL,related_name='products',null=True)
  name=models.CharField(max_length=200,null=True,blank=True)
  category=models.CharField(max_length=200,null=True,blank=True)
  brand=models.CharField(max_length=200,null=True,blank=True)
  description=models.TextField(null=True, blank=True)
  rating=models.DecimalField(max_digits=7,decimal_places=2,null=True, blank=True)
  price=models.DecimalField(max_digits=7,decimal_places=2,null=True, blank=True)
  numReviews=models.IntegerField(null=True, blank=True,default=0)
  countInStock=models.IntegerField(null=True, blank=True,default=0)
  createdAt=models.DateTimeField(null=True, blank=True,auto_now_add=True)
  image=models.ImageField(null=True, blank=True)
  def __str__(self):
    return f'{self.name}'

class Review(models.Model):
  _id=models.AutoField(primary_key=True,editable=False)
  product=models.ForeignKey(Product,on_delete=models.SET_NULL,related_name='reviews',null=True)
  user=models.ForeignKey(User,on_delete=models.SET_NULL,related_name='reviews',null=True)
  name=models.CharField(max_length=200,null=True,blank=True)
  rating=models.IntegerField(null=True, blank=True,default=0)
  comment=models.TextField(null=True, blank=True)
  def __str__(self):
    return f'{self.rating}'

class Order(models.Model):
   _id=models.AutoField(primary_key=True,editable=False)
   user=models.ForeignKey(User,on_delete=models.SET_NULL,related_name='orders',null=True)
   payment_method=models.CharField(max_length=200,null=True,blank=True)
   taxPrice=models.DecimalField(max_digits=7,decimal_places=2,null=True, blank=True)
   shippingPrice=models.DecimalField(max_digits=7,decimal_places=2,null=True, blank=True)
   totalPrice=models.DecimalField(max_digits=7,decimal_places=2,null=True, blank=True)
   isPaid=models.BooleanField(default=False) 
   paidAt=models.DateTimeField(null=True, blank=True,auto_now_add=False)
   isDelivered=models.BooleanField(default=False) 
   deliveredAt=models.DateTimeField(null=True, blank=True,auto_now_add=False)
   createdAt=models.DateTimeField(null=True, blank=True,auto_now_add=True)
   def __str__(self):
    return f'{self.createdAt}'

class OrderItem(models.Model):
  _id=models.AutoField(primary_key=True,editable=False)
  order=models.ForeignKey(Order,on_delete=models.SET_NULL,related_name='order_items',null=True)
  product=models.ForeignKey(Product,on_delete=models.SET_NULL,null=True)
  name=models.CharField(max_length=200,null=True,blank=True)
  qty=models.IntegerField(null=True, blank=True,default=0)
  price=models.DecimalField(max_digits=7,decimal_places=2,null=True, blank=True) 
  image=models.CharField(max_length=200,null=True,blank=True)
  def __str__(self):
    return f'{self.name}'

class ShippingAddress(models.Model):
  _id=models.AutoField(primary_key=True,editable=False)
  order=models.OneToOneField(Order,on_delete=models.CASCADE,null=True,blank=True)
  address=models.CharField(max_length=200,null=True,blank=True)
  city=models.CharField(max_length=200,null=True,blank=True)
  postalCode=models.CharField(max_length=200,null=True,blank=True)
  country=models.CharField(max_length=200,null=True,blank=True)
  shippingPrice=models.DecimalField(max_digits=7,decimal_places=2,null=True, blank=True) 
  def __str__(self):
    return f'${self.address}'


   