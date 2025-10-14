'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { SessionProvider } from 'next-auth/react';  // Importe o SessionProvider
import Head from './head';
import Header from '@/components/Header';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <html lang="en">
      <Head />
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <SessionProvider> {/* Envolva o conteúdo com o SessionProvider */}
              <Header onSearchChange={handleSearchChange} />
              <main>{children}</main>
            </SessionProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
