from django.shortcuts import render

from django.http import JsonResponse

from rest_framework.decorators import api_view

from .serializers import CurrencySerializer
from .services import get_or_create_currency

# Create your views here.

@api_view(['GET'])
def get_currencies(request):
    currencies = get_or_create_currency()
    serializer = CurrencySerializer(currencies, many=True)
    return JsonResponse(serializer.data, safe=False)