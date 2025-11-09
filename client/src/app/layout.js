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
      <body>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {children}
            <Toaster position="top-right" />
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}