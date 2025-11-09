// src/app/dashboard/page.jsx
'use client';
import ProtectedRoute from '@/components/ProtectedRoute';
import ProductTable from '@/components/ProductTable';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-theme-primary via-purple-600 to-pink-500 p-8 shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Product Dashboard
            </h1>
            <p className="text-white/90 text-lg">
              Manage your products efficiently and grow your business
            </p>
          </div>
        </div>

        {/* Product Table */}
        <ProductTable />
      </div>
    </ProtectedRoute>
  );
}