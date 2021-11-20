from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


class Affiliates(models.Model):
    DOCUMENT_TYPE_CHOICES = [
        ('CC', 'CÉDULA CIUDADANÍA'),
        ('TI', 'TARJETA IDENTIDAD'),
        ('RC', 'REGISTRO CIVIL'),
        ('OT', 'OTROS')
    ]

    id = models.AutoField(primary_key=True)
    name = models.CharField('Name', max_length = 30)
    lastname = models.CharField('Lastname', max_length = 30)
    document= DOCUMENT_TYPE_CHOICES,
    document_number = models.CharField('DocumentNumber', max_length = 30)
    email = models.EmailField('Email', max_length = 100)    
    phone = PhoneNumberField()
    city = models.CharField('City', max_length = 30)
    address = models.CharField('Address', max_length = 30)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.id + self.name + self.lastname + self.document + self.document_number + self.email + self.phone + self.city + self.address + self.created + self.updated