# Generated by Django 4.2.13 on 2024-06-10 17:48

import datetime
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Currency',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=3, unique=True, validators=[django.core.validators.MinLengthValidator(3), django.core.validators.MaxLengthValidator(3)])),
                ('name', models.CharField(max_length=32)),
            ],
        ),
        migrations.CreateModel(
            name='ExchangeRate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('rate', models.FloatField()),
                ('base_currency', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='base_currency_rates', to='api.currency')),
                ('target_currency', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='target_currency_rates', to='api.currency')),
            ],
        ),
        migrations.AddConstraint(
            model_name='exchangerate',
            constraint=models.CheckConstraint(check=models.Q(('base_currency', models.F('target_currency')), _negated=True), name='base_currency_not_equal_target_currency'),
        ),
        migrations.AddConstraint(
            model_name='exchangerate',
            constraint=models.CheckConstraint(check=models.Q(('date__gte', datetime.date(2022, 6, 11))), name='date_check'),
        ),
    ]
