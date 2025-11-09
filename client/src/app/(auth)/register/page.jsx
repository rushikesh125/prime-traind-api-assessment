// src/app/(auth)/register/page.jsx
'use client';
import { RegisterForm } from '@/components/AuthForm';

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <RegisterForm />
    </div>
  );
}