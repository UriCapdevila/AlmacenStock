import type { LucideIcon } from 'lucide-react';
import {
  BarChart3,
  Boxes,
  ClipboardCheck,
  CreditCard,
  LayoutDashboard,
  PackagePlus,
  ShoppingCart,
  Truck,
  Users,
} from 'lucide-react';

export type Product = {
  id: string;
  name: string;
  brand: string;
  sku: string;
  daysUntilExpiry: number;
};

export const criticalProducts: Product[] = [
  {
    id: '1',
    name: 'Leche Entera',
    brand: 'Lácteos del Sur',
    sku: 'LE-ES-1L-001',
    daysUntilExpiry: 2,
  },
  {
    id: '2',
    name: 'Yogurt de Fresa',
    brand: 'FrutiYog',
    sku: 'YO-FR-150G-003',
    daysUntilExpiry: 5,
  },
  {
    id: '3',
    name: 'Queso Crema',
    brand: 'Cremoso S.A.',
    sku: 'QC-NA-200G-002',
    daysUntilExpiry: 7,
  },
  {
    id: '4',
    name: 'Harina 000',
    brand: 'Molinos del Plata',
    sku: 'HA-000-1KG-010',
    daysUntilExpiry: 90,
  },
  {
    id: '5',
    name: 'Jugo de Naranja',
    brand: 'Citrus Max',
    sku: 'JU-NA-1L-005',
    daysUntilExpiry: 12,
  },
].sort((a, b) => a.daysUntilExpiry - b.daysUntilExpiry);

export type QuickAction = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
};

export const quickActions: QuickAction[] = [
  {
    id: 'ingresar-stock',
    title: 'Ingresar Stock',
    description: 'Añadir nuevos productos al inventario.',
    icon: PackagePlus,
    href: '#',
  },
  {
    id: 'auditoria-rapida',
    title: 'Auditoría Rápida',
    description: 'Realizar un conteo rápido de stock.',
    icon: ClipboardCheck,
    href: '#',
  },
  {
    id: 'salida-venta',
    title: 'Salida / Venta',
    description: 'Registrar una venta o salida de productos.',
    icon: CreditCard,
    href: '#',
  },
  {
    id: 'proveedores',
    title: 'Proveedores',
    description: 'Gestionar y contactar a los proveedores.',
    icon: Truck,
    href: '#',
  },
  {
    id: 'reportes',
    title: 'Reportes',
    description: 'Generar reportes de stock y ventas.',
    icon: BarChart3,
    href: '#',
  },
  {
    id: 'usuarios',
    title: 'Usuarios',
    description: 'Administrar el acceso de los usuarios.',
    icon: Users,
    href: '#',
  },
];

export const navLinks = [
  {
    href: '/',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '#',
    label: 'Stock',
    icon: Boxes,
  },
  {
    href: '#',
    label: 'Ventas',
    icon: ShoppingCart,
  },
];
