from django.contrib import admin
from .models import Lote, Movimiento

@admin.register(Lote)
class LoteAdmin(admin.ModelAdmin): # <--- CORREGIR AQUÍ TAMBIÉN
    list_display = ('codigo_lote', 'producto', 'fecha_vencimiento', 'cantidad_actual', 'activo')
    list_filter = ('fecha_vencimiento', 'activo')
    search_fields = ('codigo_lote', 'producto__nombre')

@admin.register(Movimiento)
class MovimientoAdmin(admin.ModelAdmin): # <--- Y AQUÍ
    list_display = ('fecha', 'tipo', 'lote', 'cantidad', 'usuario')
    list_filter = ('tipo', 'fecha')