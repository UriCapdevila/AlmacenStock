// src/app/page.tsx

// 1. IMPORTACIÓN CORRECTA: Apuntamos a la carpeta 'dashboard' y usamos llaves {}
import { ExpirationMonitor } from '@/components/dashboard/expiration-monitor';
import { PackagePlus, ClipboardList, LogOut } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-6">
      {/* 1. SECCIÓN DE BIENVENIDA */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Panel General</h1>
        <p className="text-gray-500">Resumen de actividad y alertas de stock.</p>
      </div>

      {/* 2. EL MONITOR DE CADUCIDAD (Con el nombre correcto) */}
      <section>
        <ExpirationMonitor />
      </section>

      {/* 3. ACCESOS RÁPIDOS */}
      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Accesos Rápidos</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <button className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col items-center gap-3 group">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <PackagePlus size={28} />
            </div>
            <span className="font-semibold text-gray-700">Ingresar Stock</span>
          </button>

          <button className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col items-center gap-3 group">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <ClipboardList size={28} />
            </div>
            <span className="font-semibold text-gray-700">Auditoría Rápida</span>
          </button>

          <button className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col items-center gap-3 group">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <LogOut size={28} />
            </div>
            <span className="font-semibold text-gray-700">Registrar Salida</span>
          </button>

        </div>
      </section>
    </div>
  );
}