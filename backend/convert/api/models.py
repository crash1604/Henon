from django.db import models
from django.core.validators import MinLengthValidator, MaxLengthValidator
from django.db.models import F, Q, CheckConstraint
from django.utils import timezone

class Currency(models.Model):
    code = models.CharField(
        max_length=3,
        validators=[MinLengthValidator(3), MaxLengthValidator(3)],
        unique=True,
    )
    name = models.CharField(max_length=32)
    
    def __str__(self):
        return f"{self.name} ({self.code})"
    

class ExchangeRate(models.Model):
    date = models.DateField()
    base_currency = models.ForeignKey(Currency, related_name='base_currency_rates', on_delete=models.CASCADE)
    target_currency = models.ForeignKey(Currency, related_name='target_currency_rates', on_delete=models.CASCADE)
    rate = models.FloatField()
    
    class Meta:
        constraints = [
            CheckConstraint(
                check=~Q(base_currency=F('target_currency')), 
                name='base_currency_not_equal_target_currency'
            ),
            CheckConstraint(
                check=Q(date__gte=timezone.now().date() - timezone.timedelta(days=365*2)),
                name='date_check'
            )
        ]

    def __str__(self):
        return f"{self.date} - {self.base_currency.code} to {self.target_currency.code}: {self.rate}"
