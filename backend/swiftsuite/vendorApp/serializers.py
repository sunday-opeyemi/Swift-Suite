from .models import VendoEnronment
from rest_framework import serializers


class VendorEnrolmentTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = VendoEnronment
        fields = [
            'vendor_name',
            'ftp_username', 
            'ftp_password',
            'host',
        ]

class VendoEnronmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = VendoEnronment
        fields = ['vendor_id', 'vendor_name', 'address_street1', 'address_street2',
                  'city', 'state', 'postal_code', 'country', 'ftp_username', 'ftp_password','ftp_url', 'file_urls','host','percentage_markup','fixed_markup','shipping_cost','stock_minimum','stock_maximum','update_inventory','send_orders','update_tracking']
    
    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user_id'] = user.id
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data.pop('user_id', None)
        return super().update(instance, validated_data)

class LipseyVendoEnronmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = VendoEnronment
        fields = ['product_filter','manufacturer']
    
class CWRVendoEnronmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = VendoEnronment
        fields = ['truck_freight','oversized','third_party_marketplaces','returnable','product_category']

class SSIVendoEnronmentSerializer(serializers.ModelSerializer):  
    class Meta:
        model = VendoEnronment
        fields = ['product_category','shipping_cost_average'] 

class FragrancexVendoEnronmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = VendoEnronment
        fields = ['brand'] 

class ZandersVendoEnronmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = VendoEnronment
        fields = ['serialized','manufacturer'] 