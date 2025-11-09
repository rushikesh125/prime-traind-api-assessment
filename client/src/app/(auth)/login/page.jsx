// src/app/(auth)/login/page.jsx
'use client';
import { LoginForm } from '@/components/AuthForm';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoginForm />
    </div>
  );
}