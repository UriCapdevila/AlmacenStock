"use client";

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { AlertTriangle, Clock, Loader2, CheckCircle } from 'lucide-react';

// 1. Definimos la interfaz exacta que devuelve tu Django
interface Lote {
  id: number;
  producto_nombre: string;
  marca: string;
  sku: string;
  fecha_vencimiento: string;
  dias_para_vencer: number;
}

export function ExpirationMonitor() {
  const [products, setProducts] = useState<Lote[]>([]);
  const [loading, setLoading] = useState(true);

  // 2. Conectamos con el Backend al cargar el componente
  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
    
    fetch(`${API_URL}/api/monitor-caducidad/`)
      .then((res) => {
        if (!res.ok) throw new Error("Error conectando con Django");
        return res.json();
      })
      .then((data) => {
        // Django ya nos devuelve los más urgentes ordenados, tomamos los top 5
        setProducts(data); 
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  // Lógica de colores según urgencia (adaptada a tus datos)
  const getUrgency = (days: number) => {
    if (days < 0) return 'expired';
    if (days <= 5) return 'high';   // Menos de 5 días
    if (days <= 15) return 'medium'; // Menos de 15 días
    return 'low';
  };

  return (
    <Card className="shadow-lg border-l-4 border-l-red-500">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1.5">
          <CardTitle className="flex items-center gap-2 text-xl">
            <AlertTriangle className="text-red-600" />
            Monitor de Caducidad
          </CardTitle>
          <CardDescription>
            Lotes críticos detectados en tiempo real.
          </CardDescription>
        </div>
        {loading && <Loader2 className="animate-spin text-gray-400" />}
      </CardHeader>
      
      <CardContent>
        {/* Estado de Carga */}
        {loading ? (
           <div className="py-8 text-center text-sm text-muted-foreground">
             Consultando base de datos...
           </div>
        ) : products.length === 0 ? (
          /* Estado Vacío (Sin alertas) */
          <div className="flex flex-col items-center justify-center py-8 text-green-600">
            <CheckCircle className="h-10 w-10 mb-2 opacity-20" />
            <p className="font-medium">Todo bajo control</p>
            <p className="text-xs text-muted-foreground">No hay vencimientos próximos.</p>
          </div>
        ) : (
          /* Tabla de Datos Reales */
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead className="hidden sm:table-cell">Marca</TableHead>
                <TableHead className="hidden md:table-cell">SKU</TableHead>
                <TableHead className="text-right">Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => {
                const urgency = getUrgency(product.dias_para_vencer);
                
                return (
                  <TableRow
                    key={product.id}
                    className={cn("transition-colors", {
                      'bg-red-50 hover:bg-red-100': urgency === 'expired' || urgency === 'high',
                      'bg-orange-50 hover:bg-orange-100': urgency === 'medium',
                    })}
                  >
                    <TableCell>
                      <div className="font-semibold text-gray-800">{product.producto_nombre}</div>
                      <div className="text-muted-foreground text-xs sm:hidden">
                        {product.marca}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-gray-600">
                      {product.marca}
                    </TableCell>
                    <TableCell className="hidden md:table-cell font-mono text-xs text-gray-400">
                      {product.sku}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant={urgency === 'high' || urgency === 'expired' ? 'destructive' : 'secondary'}
                        className={cn('text-xs font-semibold whitespace-nowrap', {
                           'bg-orange-100 text-orange-700 hover:bg-orange-200 border-orange-200': urgency === 'medium',
                           'bg-red-100 text-red-700 hover:bg-red-200 border-red-200': urgency === 'high',
                           'bg-gray-800 text-white hover:bg-gray-700': urgency === 'expired',
                        })}
                      >
                        <Clock className="mr-1 h-3 w-3" />
                        {product.dias_para_vencer < 0 
                          ? `VENCIDO (${Math.abs(product.dias_para_vencer)}d)` 
                          : `${product.dias_para_vencer} días`}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}