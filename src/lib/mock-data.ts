import { LayoutDashboard, Package, ShoppingCart, FileText, Settings, Users } from 'lucide-react';

export const navLinks = [
  {
    label: 'Dashboard',
    href: '/', // O '/dashboard' dependiendo de tu estructura
    icon: LayoutDashboard,
  },
  {
    label: 'Stock & Lotes',
    href: '/stock',
    icon: Package,
  },
  {
    label: 'Ventas / Salidas',
    href: '/ventas',
    icon: ShoppingCart,
  },
  {
    label: 'Reportes',
    href: '/reportes',
    icon: FileText,
  },
  {
    label: 'Usuarios',
    href: '/usuarios',
    icon: Users,
  },
  {
    label: 'Configuración',
    href: '/configuracion',
    icon: Settings,
  },
];