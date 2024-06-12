import requests
import logging
from django.utils import timezone
from .models import Currency, ExchangeRate
from .serializers import ExchangeRateSerializer, CurrencySerializer

API_URL = "https://api.frankfurter.app"
LATEST_URL = f"{API_URL}/latest"
HISTORICAL_URL = f"{API_URL}/{{start}}..{{end}}"

logger = logging.getLogger(__name__)

def get_or_create_currency():
    try:
        currencies = Currency.objects.all()
        if currencies.exists():
            return CurrencySerializer(currencies, many=True).data

        response = requests.get(f"{API_URL}/currencies")
        response.raise_for_status()

        data = response.json()
        currency_objects = [Currency(code=code, name=name) for code, name in data.items()]
        Currency.objects.bulk_create(currency_objects)

        currencies = Currency.objects.all()
        return CurrencySerializer(currencies, many=True).data
    except requests.RequestException as e:
        logger.error(f"Error fetching currency data from API: {e}")
        raise
    except Exception as e:
        logger.error(f"An unexpected error occurred: {e}")
        raise

def convert_current_currency_service(base_currency, target_currency):
    try:
        # Validate inputs
        if base_currency == target_currency:
            raise ValueError("Base and target currencies must be different")

        # Check if currencies exist in the database and are valid
        base_currency_obj = Currency.objects.filter(code=base_currency).first()
        target_currency_obj = Currency.objects.filter(code=target_currency).first()
        if not base_currency_obj:
            raise ValueError(f"Base currency '{base_currency}' does not exist in the database")
        if not target_currency_obj:
            raise ValueError(f"Target currency '{target_currency}' does not exist in the database")

        logger.info(f"Fetching conversion rate for {base_currency} to {target_currency}")

        # Check the database for today's conversion rate
        today = timezone.now().date()
        rate_entry = ExchangeRate.objects.filter(
            base_currency=base_currency_obj,
            target_currency=target_currency_obj,
            date=today
        ).first()

        if rate_entry:
            rate_serializer = ExchangeRateSerializer(rate_entry)
            return rate_serializer.data

        # Make the API request if not found in the database
        url = f"{LATEST_URL}?from={base_currency}&to={target_currency}"
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        rate = data['rates'][target_currency]

        # Save the rate to the database
        exchange_rate = ExchangeRate.objects.create(
            date=today,
            base_currency=base_currency_obj,
            target_currency=target_currency_obj,
            rate=rate
        )

        rate_serializer = ExchangeRateSerializer(exchange_rate)
        return rate_serializer.data
    except requests.RequestException as e:
        logger.error(f"Error fetching conversion rate from API: {e}")
        raise
    except ValueError as e:
        logger.error(f"Value error: {e}")
        raise
    except Exception as e:
        logger.error(f"An unexpected error occurred: {e}")
        raise

def convert_currency_service(base_currency, target_currency, amount):
    try:
        # Validate inputs
        if amount <= 0:
            raise ValueError("Amount must be greater than zero")
        if base_currency == target_currency:
            raise ValueError("Base and target currencies must be different")

        # Check if currencies exist in the database
        base_currency_obj = Currency.objects.filter(code=base_currency).first()
        target_currency_obj = Currency.objects.filter(code=target_currency).first()
        if not base_currency_obj:
            raise ValueError(f"Base currency '{base_currency}' does not exist in the database")
        if not target_currency_obj:
            raise ValueError(f"Target currency '{target_currency}' does not exist in the database")

        # Log the request details
        logger.info(f"Fetching conversion rate for {amount} {base_currency} to {target_currency}")

        # Check the database for today's conversion rate
        today = timezone.now().date()
        rate_entry = ExchangeRate.objects.filter(
            base_currency=base_currency_obj,
            target_currency=target_currency_obj,
            date=today
        ).first()

        if rate_entry:
            converted_amount = rate_entry.rate * amount
            return {
                "base_currency": base_currency,
                "target_currency": target_currency,
                "amount": amount,
                "converted_amount": converted_amount
            }

        # Make the API request if not found in the database
        url = f"{LATEST_URL}?amount={amount}&from={base_currency}&to={target_currency}"
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        rate = data['rates'][target_currency]

        # Save the rate to the database
        exchange_rate = ExchangeRate.objects.create(
            date=today,
            base_currency=base_currency_obj,
            target_currency=target_currency_obj,
            rate=rate
        )

        converted_amount = rate * amount
        return {
            "base_currency": base_currency,
            "target_currency": target_currency,
            "amount": amount,
            "converted_amount": converted_amount
        }
    except requests.RequestException as e:
        logger.error(f"Error fetching conversion rate from API: {e}")
        raise
    except ValueError as e:
        logger.error(f"Value error: {e}")
        raise
    except Exception as e:
        logger.error(f"An unexpected error occurred: {e}")
        raise

def get_all_time_history(base_currency, target_currency):
    try:
        # Check if the historical data is in the database
        history = ExchangeRate.objects.filter(
            base_currency__code=base_currency,
            target_currency__code=target_currency
        ).order_by('date')

        if len(history)>3:
            print(history)
            return ExchangeRateSerializer(history, many=True).data

        # Define the start and end dates
        end_date = timezone.now().date()
        start_date = end_date - timezone.timedelta(days=365*2)

        # Fetch from the API if not found in the database
        url = f"{API_URL}/{start_date}..{end_date}?from={base_currency}&to={target_currency}"
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()

        # Save the historical data to the database
        base_currency_obj = Currency.objects.get(code=base_currency)
        target_currency_obj = Currency.objects.get(code=target_currency)
        exchange_rates = [
            ExchangeRate(
                date=date,
                base_currency=base_currency_obj,
                target_currency=target_currency_obj,
                rate=rate[target_currency]
            ) for date, rate in data['rates'].items()
        ]
        ExchangeRate.objects.bulk_create(exchange_rates)

        history = ExchangeRate.objects.filter(
            base_currency__code=base_currency,
            target_currency__code=target_currency
        ).order_by('date')
        return ExchangeRateSerializer(history, many=True).data
    except requests.RequestException as e:
        logger.error(f"Error fetching historical data from API: {e}")
        raise
    except Exception as e:
        logger.error(f"An unexpected error occurred: {e}")
        raise
