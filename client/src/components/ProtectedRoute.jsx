// src/components/ProtectedRoute.jsx
'use client';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { token, user } = useSelector((s) => s.auth);
  const router = useRouter();

  useEffect(() => {
    if (!token) router.replace('/login');
    else if (adminOnly && user?.role !== 'admin') router.replace('/dashboard');
  }, [token, user, adminOnly, router]);

  if (!token || (adminOnly && user?.role !== 'admin')) return null;
  return <>{children}</>;
}