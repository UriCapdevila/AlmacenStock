import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// Importamos tu layout nuevo
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"; // Ajusta la ruta si es necesario

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AlmacenStock ERP",
  description: "Sistema de gestión de stock inteligente",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {/* Aquí aplicamos el Sidebar a toda la app */}
        <DashboardLayout>
          {children}
        </DashboardLayout>
      </body>
    </html>
  );
}