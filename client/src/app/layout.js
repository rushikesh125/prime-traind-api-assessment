// src/app/layout.jsx
'use client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/lib/store';
import { Toaster } from 'react-hot-toast';
import '@/app/globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>ProductHub - Modern Product Management</title>
        <meta name="description" content="Streamline your product management workflow with our powerful, intuitive platform." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">
        <Provider store={store}>
          <PersistGate loading={
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-theme-muted via-theme-background to-purple-50">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-theme-primary to-purple-600 shadow-lg animate-pulse">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-theme-foreground/60">Loading ProductHub...</p>
              </div>
            </div>
          } persistor={persistor}>
            {children}
            <Toaster 
              position="top-right"
              toastOptions={{
                // Success toast styling
                success: {
                  duration: 3000,
                  style: {
                    background: '#10b981',
                    color: '#ffffff',
                    fontWeight: '500',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                  },
                  iconTheme: {
                    primary: '#ffffff',
                    secondary: '#10b981',
                  },
                },
                // Error toast styling
                error: {
                  duration: 4000,
                  style: {
                    background: '#ef4444',
                    color: '#ffffff',
                    fontWeight: '500',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                  },
                  iconTheme: {
                    primary: '#ffffff',
                    secondary: '#ef4444',
                  },
                },
                // Default toast styling
                style: {
                  background: '#ffffff',
                  color: '#1f1f21',
                  fontWeight: '500',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid #e9d5ff',
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                },
              }}
            />
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}