from rest_framework import serializers
from .models import ExchangeRate, Currency

class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = ['code', 'name']

class ExchangeRateSerializer(serializers.ModelSerializer):
    base_currency = serializers.SerializerMethodField()
    target_currency = serializers.SerializerMethodField()

    class Meta:
        model = ExchangeRate
        fields = ['date', 'base_currency', 'target_currency', 'rate']

    def get_base_currency(self, obj):
        return obj.base_currency.code

    def get_target_currency(self, obj):
        return obj.target_currency.code
