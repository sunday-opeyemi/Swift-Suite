from .models import VendoEnronment
from rest_framework import serializers

class VendoEnronmentSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = VendoEnronment
        fields = '__all__'
    
    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user_id'] = user.id
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data.pop('user_id', None)
        return super().update(instance, validated_data)