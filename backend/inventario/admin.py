from django.contrib import admin
from .models import Marca, Categoria, Producto

admin.site.register(Marca)
admin.site.register(Categoria)

@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin): # <--- AQUÍ ESTABA EL ERROR (borra el ".site")
    list_display = ('nombre', 'sku', 'marca', 'stock_minimo')
    search_fields = ('nombre', 'sku')