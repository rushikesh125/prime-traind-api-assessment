// src/app/(auth)/register/page.jsx
'use client';
import { RegisterForm } from '@/components/AuthForm';
import Link from 'next/link';
import { ArrowLeft, Package } from 'lucide-react';

export default function RegisterPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-theme-muted via-theme-background to-purple-50 p-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-theme-primary opacity-5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 opacity-5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-theme-primary opacity-3 rounded-full blur-3xl"></div>
      </div>

      {/* Back to home link */}
      <Link 
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-theme-foreground/70 hover:text-theme-primary transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to Home</span>
      </Link>

      {/* Brand logo/name */}
      <div className="absolute top-6 right-6 flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-theme-primary to-purple-600 flex items-center justify-center">
          <Package className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-xl text-theme-foreground hidden sm:inline">ProductHub</span>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-md">
        <RegisterForm />
        
        {/* Sign in link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-theme-foreground/60">
            Already have an account?{' '}
            <Link 
              href="/login" 
              className="font-semibold text-theme-primary hover:text-purple-600 transition-colors hover:underline"
            >
              Sign in instead
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}