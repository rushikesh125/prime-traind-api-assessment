// src/components/ProtectedRoute.jsx
'use client';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2, ShieldAlert, Lock } from 'lucide-react';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { token, user } = useSelector((s) => s.auth);
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      if (!token) {
        router.replace('/login');
      } else if (adminOnly && user?.role !== 'admin') {
        router.replace('/dashboard');
      } else {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [token, user, adminOnly, router]);

  // Loading state with modern spinner
  if (isChecking || !token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-theme-muted via-theme-background to-purple-50">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-theme-primary to-purple-600 shadow-lg">
            <Loader2 className="w-10 h-10 text-theme-primary-foreground animate-spin" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-theme-foreground mb-1">
              Verifying Access
            </h3>
            <p className="text-sm text-theme-foreground/60">
              Please wait while we authenticate your session...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Access denied for admin-only routes
  if (adminOnly && user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-theme-muted via-theme-background to-purple-50 p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-theme-destructive to-red-600 shadow-lg">
            <ShieldAlert className="w-10 h-10 text-white" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-theme-foreground">
              Access Denied
            </h2>
            <p className="text-theme-foreground/60">
              You don't have permission to access this page. This area is restricted to administrators only.
            </p>
          </div>
          <button
            onClick={() => router.push('/dashboard')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-theme-primary to-purple-600 text-theme-primary-foreground rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Lock className="w-4 h-4" />
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}