// src/app/dashboard/page.jsx
'use client';
import ProtectedRoute from '@/components/ProtectedRoute';
import ProductTable from '@/components/ProductTable';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <ProductTable />
    </ProtectedRoute>
  );
}