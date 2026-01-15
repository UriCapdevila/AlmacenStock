from django.db import models
from django.contrib.auth.models import User
from inventario.models import Producto

class Lote(models.Model):
    producto = models.ForeignKey(Producto, related_name='lotes', on_delete=models.CASCADE)
    codigo_lote = models.CharField(max_length=50)
    fecha_vencimiento = models.DateField()
    fecha_ingreso = models.DateField(auto_now_add=True)
    cantidad_inicial = models.PositiveIntegerField()
    cantidad_actual = models.PositiveIntegerField()
    activo = models.BooleanField(default=True)

    class Meta:
        ordering = ['fecha_vencimiento']

    def __str__(self):
        return f"Lote {self.codigo_lote} - {self.producto.nombre}"

    @property
    def estado_vencimiento(self):
        from django.utils import timezone
        hoy = timezone.now().date()
        delta = (self.fecha_vencimiento - hoy).days
        if delta < 0: return 'VENCIDO'
        if delta < 30: return 'CRITICO'
        if delta < 60: return 'ALERTA'
        return 'OK'

class Movimiento(models.Model):
    TIPOS = [
        ('ENTRADA', 'Entrada de Stock'),
        ('SALIDA', 'Salida / Venta'),
        ('AJUSTE', 'Ajuste / Pérdida'),
    ]

    lote = models.ForeignKey(Lote, on_delete=models.CASCADE, related_name='movimientos')
    usuario = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    tipo = models.CharField(max_length=10, choices=TIPOS)
    cantidad = models.PositiveIntegerField()
    fecha = models.DateTimeField(auto_now_add=True)
    observacion = models.TextField(blank=True, null=True)

    def save(self, *args, **kwargs):
        # Actualizar stock automáticamente al guardar
        if self.pk is None: 
            if self.tipo == 'ENTRADA':
                self.lote.cantidad_actual += self.cantidad
            elif self.tipo in ['SALIDA', 'AJUSTE']:
                self.lote.cantidad_actual -= self.cantidad
            self.lote.save()
            
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.tipo} - {self.lote}"