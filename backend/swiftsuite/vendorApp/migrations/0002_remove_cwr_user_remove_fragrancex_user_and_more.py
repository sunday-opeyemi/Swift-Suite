# Generated by Django 5.0.1 on 2024-03-28 15:33

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("vendorApp", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="cwr",
            name="user",
        ),
        migrations.RemoveField(
            model_name="fragrancex",
            name="user",
        ),
        migrations.RemoveField(
            model_name="lipsey",
            name="user",
        ),
        migrations.RemoveField(
            model_name="rsr",
            name="user",
        ),
        migrations.RemoveField(
            model_name="ssi",
            name="user",
        ),
        migrations.RemoveField(
            model_name="zanders",
            name="user",
        ),
    ]