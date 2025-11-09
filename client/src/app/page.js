// src/app/page.jsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  Package, 
  ArrowRight, 
  ShoppingBag, 
  TrendingUp, 
  Shield,
  Zap,
  Users,
  BarChart3
} from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: ShoppingBag,
      title: 'Product Management',
      description: 'Easily create, update, and manage your product catalog with our intuitive interface.'
    },
    {
      icon: BarChart3,
      title: 'Real-time Analytics',
      description: 'Track your inventory, sales, and performance metrics in real-time.'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security to protect your data and business operations.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance ensures smooth operations even with large catalogs.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-theme-muted via-theme-background to-purple-50">
      {/* Navigation */}
      <nav className="border-b border-theme-border bg-white/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-theme-primary to-purple-600 flex items-center justify-center shadow-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-theme-foreground">ProductHub</h1>
                <p className="text-xs text-theme-foreground/60 hidden sm:block">Management System</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href="/login">
                <Button variant="ghost" className="hover:bg-theme-muted">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-theme-primary to-purple-600 hover:from-purple-600 hover:to-theme-primary text-white shadow-lg hover:shadow-xl transition-all">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme-muted border border-theme-border shadow-sm">
            <Zap className="w-4 h-4 text-theme-primary" />
            <span className="text-sm font-medium text-theme-foreground">
              Modern Product Management Platform
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-theme-foreground leading-tight">
              Manage Your Products
              <span className="block bg-gradient-to-r from-theme-primary to-purple-600 bg-clip-text text-transparent">
                Effortlessly
              </span>
            </h1>
            <p className="text-lg md:text-xl text-theme-foreground/70 max-w-2xl mx-auto">
              Streamline your product management workflow with our powerful, intuitive platform. Built for modern businesses.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link href="/register">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-gradient-to-r from-theme-primary to-purple-600 hover:from-purple-600 hover:to-theme-primary text-white shadow-lg hover:shadow-xl transition-all text-base px-8 h-12"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button 
                size="lg" 
                variant="outline"
                className="w-full sm:w-auto border-2 border-theme-border hover:bg-theme-muted text-base px-8 h-12"
              >
                Sign In
              </Button>
            </Link>
          </div>

          {/* Trust Badge */}
          <div className="flex items-center justify-center gap-2 text-sm text-theme-foreground/60 pt-4">
            <Users className="w-4 h-4" />
            <span>Trusted by 1000+ businesses worldwide</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme-muted border border-theme-border shadow-sm mb-4">
            <TrendingUp className="w-4 h-4 text-theme-primary" />
            <span className="text-sm font-medium text-theme-foreground">
              Powerful Features
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-theme-foreground mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-lg text-theme-foreground/70 max-w-2xl mx-auto">
            Our platform provides all the tools you need to manage your products efficiently
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-6 rounded-2xl bg-white border border-theme-border shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-theme-primary to-purple-600 flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-theme-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-theme-foreground/70">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-theme-primary via-purple-600 to-pink-500 p-12 md:p-16 text-center shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90">
              Join thousands of businesses already using ProductHub to streamline their operations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link href="/register">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-white text-theme-primary hover:bg-white/90 shadow-xl text-base px-8 h-12 font-semibold"
                >
                  Create Free Account
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-theme-border bg-white/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-theme-primary to-purple-600 flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-theme-foreground">ProductHub</p>
                <p className="text-xs text-theme-foreground/60">© 2024 All rights reserved</p>
              </div>
            </div>
            <p className="text-sm text-theme-foreground/60">
              Built with ❤️ using Next.js and shadcn/ui
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}