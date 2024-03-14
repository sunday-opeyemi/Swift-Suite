from .models import VendoEnronment
from rest_framework import serializers

class VendoEnronmentSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = VendoEnronment
        fields = ['vendor_id', 'vendor_name', 'address_street1', 'address_street2',
                  'city', 'state', 'postal_code', 'country', 'ftp_username', 'ftp_password',
                  'ftp_url', 'file_urls', 'host']
    
    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user_id'] = user.id
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data.pop('user_id', None)
        return super().update(instance, validated_data)