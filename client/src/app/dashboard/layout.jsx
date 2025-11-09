// src/app/dashboard/layout.jsx
'use client';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/lib/authSlice';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DashboardLayout({ children }) {
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <nav className="flex gap-6">
            <Link href="/dashboard" className="font-medium">Products</Link>
            {user?.role === 'admin' && (
              <Link href="/dashboard/admin" className="font-medium">Admin</Link>
            )}
          </nav>
          <div className="flex items-center gap-2">
            <span className="text-sm">{user?.email}</span>
            <Button variant="ghost" onClick={() => dispatch(logout())}>Logout</Button>
          </div>
        </div>
      </header>
      <main className="container mx-auto p-6">{children}</main>
    </div>
  );
}