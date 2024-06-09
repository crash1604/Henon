from django.contrib import admin
from .models import Currency, ExchangeRate

# Register your models here.

@admin.register(Currency)
class CurrencyAdmin(admin.ModelAdmin):
    list_display = ('code', 'name')


@admin.register(ExchangeRate)
class ExchangeRateAdmin(admin.ModelAdmin):
    list_display = ('date', 'base_currency', 'target_currency', 'rate')
    list_filter = ('date', 'base_currency', 'target_currency')