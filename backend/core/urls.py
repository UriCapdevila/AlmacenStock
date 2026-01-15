# backend/core/urls.py
from django.contrib import admin
from django.urls import path
from stock.views import MonitorCaducidadView  # <--- Importante

urlpatterns = [
    path('admin/', admin.site.urls),
    # Esta es la dirección que buscas:
    path('api/monitor-caducidad/', MonitorCaducidadView.as_view()),
]