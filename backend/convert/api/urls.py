from django.urls import path
from . import views

urlpatterns = [
    path('currencies/', views.get_currencies, name='currencies'),
]