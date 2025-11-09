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
import { Card, CardContent } from '@/components/ui/card';
import { User, Mail, Lock, Eye, EyeOff, Loader2, Sparkles, ShieldCheck } from 'lucide-react';
import { Label } from '@/components/ui/label';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      dispatch(setCredentials(res.data));
      toast.success('Logged in successfully');
      router.push('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Decorative background elements */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-theme-primary opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-theme-primary opacity-10 rounded-full blur-3xl"></div>
      
      <Card className="relative w-full max-w-md border border-theme-border shadow-2xl bg-theme-background overflow-hidden backdrop-blur-sm">
        {/* Top accent bar */}
        <div className="h-1.5 bg-gradient-to-r from-theme-primary via-purple-500 to-theme-primary"></div>
        
        <CardContent className="p-8 md:p-10">
          {/* Header with icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-theme-primary to-purple-600 mb-4 shadow-lg">
              <ShieldCheck className="w-8 h-8 text-theme-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold text-theme-foreground mb-2 tracking-tight">
              Welcome Back
            </h2>
            <p className="text-theme-foreground/60 text-sm">
              Sign in to continue to your dashboard
            </p>
          </div>
          
          <form onSubmit={submit} className="space-y-5">
            {/* Email Input */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-theme-foreground flex items-center gap-2">
                <Mail className="w-4 h-4 text-theme-primary" />
                Email Address
              </Label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-theme-primary to-purple-600 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="relative h-12 pl-4 border-2 border-theme-border focus:border-theme-primary transition-all duration-300 rounded-lg text-theme-foreground placeholder:text-theme-foreground/40 bg-theme-background"
                  required
                />
              </div>
            </div>
            
            {/* Password Input */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold text-theme-foreground flex items-center gap-2">
                <Lock className="w-4 h-4 text-theme-primary" />
                Password
              </Label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-theme-primary to-purple-600 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="relative h-12 pl-4 pr-12 border-2 border-theme-border focus:border-theme-primary transition-all duration-300 rounded-lg text-theme-foreground placeholder:text-theme-foreground/40 bg-theme-background"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 h-10 w-10 hover:bg-theme-muted rounded-md transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-theme-foreground/60" />
                  ) : (
                    <Eye className="h-4 w-4 text-theme-foreground/60" />
                  )}
                </Button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-theme-primary hover:text-purple-600 font-medium transition-colors"
              >
                Forgot password?
              </button>
            </div>
            
            {/* Submit Button */}
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-theme-primary to-purple-600 hover:from-purple-600 hover:to-theme-primary text-theme-primary-foreground rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Sign In
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-theme-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-theme-background px-3 text-theme-foreground/50 font-medium">
                Secure Login
              </span>
            </div>
          </div>

          {/* Footer Note */}
          <p className="text-center text-sm text-theme-foreground/60">
            Protected by enterprise-grade encryption
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/auth/register', { name, email, password });
      dispatch(setCredentials(res.data));
      toast.success('Account created successfully');
      router.push('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Decorative background elements */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-theme-primary opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-theme-primary opacity-10 rounded-full blur-3xl"></div>
      
      <Card className="relative w-full max-w-md border border-theme-border shadow-2xl bg-theme-background overflow-hidden backdrop-blur-sm">
        {/* Top accent bar */}
        <div className="h-1.5 bg-gradient-to-r from-theme-primary via-purple-500 to-theme-primary"></div>
        
        <CardContent className="p-8 md:p-10">
          {/* Header with icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-theme-primary to-purple-600 mb-4 shadow-lg">
              <User className="w-8 h-8 text-theme-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold text-theme-foreground mb-2 tracking-tight">
              Create Account
            </h2>
            <p className="text-theme-foreground/60 text-sm">
              Join us and start managing your products
            </p>
          </div>
          
          <form onSubmit={submit} className="space-y-5">
            {/* Name Input */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-semibold text-theme-foreground flex items-center gap-2">
                <User className="w-4 h-4 text-theme-primary" />
                Full Name
              </Label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-theme-primary to-purple-600 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="relative h-12 pl-4 border-2 border-theme-border focus:border-theme-primary transition-all duration-300 rounded-lg text-theme-foreground placeholder:text-theme-foreground/40 bg-theme-background"
                  required
                />
              </div>
            </div>
            
            {/* Email Input */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-theme-foreground flex items-center gap-2">
                <Mail className="w-4 h-4 text-theme-primary" />
                Email Address
              </Label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-theme-primary to-purple-600 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="relative h-12 pl-4 border-2 border-theme-border focus:border-theme-primary transition-all duration-300 rounded-lg text-theme-foreground placeholder:text-theme-foreground/40 bg-theme-background"
                  required
                />
              </div>
            </div>
            
            {/* Password Input */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold text-theme-foreground flex items-center gap-2">
                <Lock className="w-4 h-4 text-theme-primary" />
                Password
              </Label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-theme-primary to-purple-600 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="relative h-12 pl-4 pr-12 border-2 border-theme-border focus:border-theme-primary transition-all duration-300 rounded-lg text-theme-foreground placeholder:text-theme-foreground/40 bg-theme-background"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 h-10 w-10 hover:bg-theme-muted rounded-md transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-theme-foreground/60" />
                  ) : (
                    <Eye className="h-4 w-4 text-theme-foreground/60" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-theme-foreground/50 mt-1">
                Must be at least 8 characters long
              </p>
            </div>
            
            {/* Submit Button */}
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-theme-primary to-purple-600 hover:from-purple-600 hover:to-theme-primary text-theme-primary-foreground rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Create Account
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-theme-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-theme-background px-3 text-theme-foreground/50 font-medium">
                Quick & Secure
              </span>
            </div>
          </div>

          {/* Terms & Privacy */}
          <p className="text-center text-xs text-theme-foreground/50 leading-relaxed">
            By creating an account, you agree to our{' '}
            <button className="text-theme-primary hover:underline font-medium">
              Terms of Service
            </button>{' '}
            and{' '}
            <button className="text-theme-primary hover:underline font-medium">
              Privacy Policy
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}