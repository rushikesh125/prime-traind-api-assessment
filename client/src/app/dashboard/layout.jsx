// src/app/dashboard/layout.jsx
'use client';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/lib/authSlice';
import { Button } from '@/components/ui/button';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  Package, 
  LogOut, 
  User, 
  Shield, 
  Menu,
  X,
  ShoppingBag,
  Crown,
  TableProperties
} from 'lucide-react';
import { useState } from 'react';

export default function DashboardLayout({ children }) {
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  const isActive = (path) => pathname === path;

  const navItems = [
    {
      label: 'Products',
      path: '/dashboard',
      icon: ShoppingBag,
      show: true
    },
    {
      label: 'Admin Panel',
      path: '/dashboard/admin',
      icon: Crown,
      show: user?.role === 'admin'
    },
    {
      label: 'All Products',
      path: '/dashboard/admin/products',
      icon: TableProperties ,
      show: user?.role === 'admin'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-theme-muted via-theme-background to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-theme-border bg-white/80 backdrop-blur-lg shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo and Brand */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-theme-primary to-purple-600 flex items-center justify-center shadow-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-theme-foreground">ProductHub</h1>
                <p className="text-xs text-theme-foreground/60">Management System</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {navItems.map((item) => 
                item.show && (
                  <Link 
                    key={item.path}
                    href={item.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      isActive(item.path)
                        ? 'bg-gradient-to-r from-theme-primary to-purple-600 text-white shadow-md'
                        : 'text-theme-foreground hover:bg-theme-muted'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                )
              )}
            </nav>

            {/* User Menu */}
            <div className="flex items-center gap-3">
              {/* User Info - Desktop */}
              <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-lg bg-theme-muted">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-theme-primary to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-md">
                  {user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase()}
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-theme-foreground leading-none">
                    {user?.name || 'User'}
                  </p>
                  <p className="text-xs text-theme-foreground/60 mt-0.5">
                    {user?.email}
                  </p>
                </div>
                {user?.role === 'admin' && (
                  <div className="ml-2">
                    <Shield className="w-4 h-4 text-theme-primary" />
                  </div>
                )}
              </div>

              {/* Logout Button - Desktop */}
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="hidden md:flex items-center gap-2 border-theme-border hover:bg-theme-destructive hover:text-white hover:border-theme-destructive transition-all shadow-sm hover:shadow-md"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="outline"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden border-theme-border"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-theme-border space-y-2">
              {navItems.map((item) => 
                item.show && (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                      isActive(item.path)
                        ? 'bg-gradient-to-r from-theme-primary to-purple-600 text-white'
                        : 'text-theme-foreground hover:bg-theme-muted'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                )
              )}
              
              <div className="pt-2 border-t border-theme-border mt-2">
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-theme-muted mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-theme-primary to-purple-600 flex items-center justify-center text-white font-semibold shadow-md">
                    {user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-theme-foreground">
                      {user?.name || 'User'}
                    </p>
                    <p className="text-xs text-theme-foreground/60">
                      {user?.email}
                    </p>
                  </div>
                  {user?.role === 'admin' && (
                    <Shield className="w-4 h-4 text-theme-primary ml-auto" />
                  )}
                </div>
                
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 border-theme-border hover:bg-theme-destructive hover:text-white hover:border-theme-destructive transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4 md:p-6 lg:p-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-theme-border bg-white/50 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-theme-primary" />
              <p className="text-sm text-theme-foreground/60">
                © 2024 ProductHub. All rights reserved.
              </p>
            </div>
            <p className="text-xs text-theme-foreground/50">
              Built with Next.js and shadcn/ui
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}