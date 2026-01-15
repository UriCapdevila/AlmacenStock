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
import { criticalProducts } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { AlertTriangle, Clock } from 'lucide-react';

export function ExpirationMonitor() {
  const productsToDisplay = criticalProducts.slice(0, 3);

  const getUrgency = (days: number) => {
    if (days <= 3) return 'high';
    if (days <= 7) return 'medium';
    return 'low';
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1.5">
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="text-destructive" />
            Monitor de Caducidad
          </CardTitle>
          <CardDescription>
            Los 3 productos más críticos próximos a vencer.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Producto</TableHead>
              <TableHead className="hidden sm:table-cell">Marca</TableHead>
              <TableHead className="hidden md:table-cell">Código (SKU)</TableHead>
              <TableHead className="text-right">Vencimiento</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productsToDisplay.map((product) => {
              const urgency = getUrgency(product.daysUntilExpiry);
              return (
                <TableRow
                  key={product.id}
                  className={cn({
                    'bg-destructive/10 hover:bg-destructive/20': urgency === 'high',
                    'bg-chart-4/10 hover:bg-chart-4/20': urgency === 'medium',
                  })}
                >
                  <TableCell>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-muted-foreground sm:hidden">
                      {product.brand}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {product.brand}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {product.sku}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={urgency === 'high' ? 'destructive' : 'secondary'}
                      className={cn('text-xs font-semibold', {
                        'border-chart-4 bg-chart-4 text-chart-3 hover:bg-chart-4/90':
                          urgency === 'medium',
                      })}
                    >
                      <Clock className="mr-1 h-3 w-3" />
                      Vence en {product.daysUntilExpiry} días
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
