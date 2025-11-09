// src/app/page.jsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Product Manager</h1>
      <div className="space-x-2">
        <Link href="/login"><Button>Login</Button></Link>
        <Link href="/register"><Button variant="outline">Register</Button></Link>
      </div>
    </div>
  );
}