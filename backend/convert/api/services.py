import requests
import logging
from .models import Currency


API_URL = "https://api.frankfurter.app/"

logger = logging.getLogger(__name__)
 

def get_or_create_currency():
    try:
        currencies = Currency.objects.all()

        if currencies.exists():
            return currencies

        response = requests.get(API_URL)
        response.raise_for_status()  # Raise an exception for HTTP errors

        data = response.json()
        currency_objects = [
            Currency(code=code, name=name) for code, name in data.items()
        ]

        Currency.objects.bulk_create(currency_objects)

        return Currency.objects.all()
    except requests.RequestException as e:
        logger.error(f"Error fetching data from API: {e}")
        raise
    except Exception as e:
        logger.error(f"An unexpected error occurred: {e}")
        raise
