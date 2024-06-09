import requests
from django.utils import timezone
from .models import Currency

API_URL = "https://api.frankfurter.app/"

def get_or_create_currency():
    currencies = Currency.objects.all()

    if currencies.exists():
        return currencies

    temp = API_URL + 'currencies'
    response = requests.get(temp)
    response.raise_for_status()  # Raise an exception for HTTP errors

    data = response.json()
    currency_objects = [
        Currency(code=code, name=name) for code, name in data.items()
    ]

    Currency.objects.bulk_create(currency_objects)

    return Currency.objects.all()