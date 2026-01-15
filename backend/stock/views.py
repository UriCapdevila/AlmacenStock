# backend/stock/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils import timezone
from .models import Lote
# Aquí importamos el serializer que acabas de crear:
from .serializers import LoteMonitorSerializer 

class MonitorCaducidadView(APIView):
    def get(self, request):
        hoy = timezone.now().date()
        lotes = Lote.objects.filter(
            activo=True,
            fecha_vencimiento__gte=hoy 
        ).order_by('fecha_vencimiento')[:5]

        serializer = LoteMonitorSerializer(lotes, many=True)
        return Response(serializer.data)