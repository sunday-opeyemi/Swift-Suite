from .models import * 
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
    product_filter = serializers.ListField(child=serializers.CharField(), required = False)
    manufacturer = serializers.ListField(child=serializers.CharField(), required = False)
    product_category = serializers.ListField(child=serializers.CharField(), required = False)
    brand = serializers.ListField(child=serializers.CharField(), required = False)
    class Meta:
        model = VendoEnronment
        fields = ['vendor_id', 'vendor_name', 'address_street1', 'address_street2',
                  'city', 'state', 'postal_code', 'country', 'ftp_username', 'ftp_password','ftp_url', 'file_urls','host','vendor_identifier','percentage_markup','fixed_markup','shipping_cost','stock_minimum','stock_maximum','update_inventory','send_orders','update_tracking', 'product_filter','manufacturer', 'truck_freight','oversized','third_party_marketplaces','returnable','product_category', 'shipping_cost_average', 'brand','serialized']
        
    
    def create(self, validated_data):
        print(validated_data['product_category'])
        user = self.context['request'].user
        validated_data['user_id'] = user.id
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data.pop('user_id', None)
        return super().update(instance, validated_data)


class GeneralProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Generalproducttable
        fields = '__all__'