# backend/stock/serializers.py
from rest_framework import serializers
from .models import Lote

class LoteMonitorSerializer(serializers.ModelSerializer):
    producto_nombre = serializers.CharField(source='producto.nombre', read_only=True)
    marca = serializers.CharField(source='producto.marca.nombre', read_only=True)
    sku = serializers.CharField(source='producto.sku', read_only=True)
    dias_para_vencer = serializers.SerializerMethodField()

    class Meta:
        model = Lote
        fields = ['id', 'producto_nombre', 'marca', 'sku', 'fecha_vencimiento', 'dias_para_vencer']

    def get_dias_para_vencer(self, obj):
        from django.utils import timezone
        hoy = timezone.now().date()
        delta = obj.fecha_vencimiento - hoy
        return delta.days