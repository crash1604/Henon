from django.http import JsonResponse
from rest_framework.decorators import api_view
from .serializers import CurrencySerializer
from .services import get_or_create_currency, convert_current_currency_service, convert_currency_service, get_all_time_history

@api_view(['GET'])
def get_currencies(request):
    currencies = get_or_create_currency()
    serializer = CurrencySerializer(currencies, many=True)
    return JsonResponse(serializer.data, safe=False)

@api_view(['GET'])
def convert_currency_latest(request, base_currency, target_currency):
    conversion_result = convert_current_currency_service(base_currency,target_currency)
    return JsonResponse(conversion_result, safe=False)

@api_view(['POST'])
def convert_currency(request, base_currency, target_currency):
    amount = request.data.get('amount', 1)
    conversion_result = convert_currency_service(base_currency, target_currency, amount)
    return JsonResponse(conversion_result, safe=False)

@api_view(['GET'])
def history_all_time(request, base_currency, target_currency):
    try:
        history = get_all_time_history(base_currency, target_currency)
        return JsonResponse(history, safe=False)
    except ValueError as e:
        return JsonResponse({'error': str(e)}, status=400)
    except Exception as e:
        return JsonResponse({'error': 'An unexpected error occurred'}, status=500)