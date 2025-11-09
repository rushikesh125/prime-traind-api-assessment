// src/components/AuthForm.jsx
'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/lib/authSlice';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      dispatch(setCredentials(res.data));
      toast.success('Logged in');
      router.push('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Card className="w-96">
      <CardHeader>Login</CardHeader>
      <CardContent>
        <form onSubmit={submit} className="space-y-4">
          <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit" className="w-full">Login</Button>
        </form>
      </CardContent>
    </Card>
  );
}

export function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', { name, email, password });
      dispatch(setCredentials(res.data));
      toast.success('Registered');
      router.push('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Register failed');
    }
  };

  return (
    <Card className="w-96">
      <CardHeader>Register</CardHeader>
      <CardContent>
        <form onSubmit={submit} className="space-y-4">
          <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit" className="w-full">Register</Button>
        </form>
      </CardContent>
    </Card>
  );
}