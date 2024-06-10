from django.urls import path
from . import views

urlpatterns = [
    path('currencies/', views.get_currencies, name='currencies'),
    path('current/<str:base_currency>/to/<str:target_currency>/', views.convert_currency_latest, name='convert_currency'),
    path('convert/<str:base_currency>/to/<str:target_currency>/', views.convert_currency, name='convert_currency'),
    path('history/<str:base_currency>/to/<str:target_currency>/', views.history_all_time, name='history_all_time'),
]