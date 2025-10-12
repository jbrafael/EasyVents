'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

interface HeaderProps {
  onSearchChange: (searchTerm: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearchChange }) => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  return (
    <header className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link href="/">EasyVents</Link>
        </h1>

        {/* Layout para telas grandes */}
        <div className="hidden md:flex items-center gap-4">
          <input
            type="text"
            placeholder="Buscar eventos..."
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-64 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {user ? (
            <>
              <span className="text-sm font-semibold">Olá, {user.name.split(' ')[0]}!</span>
              <Link href="/dashboard">
                <button className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                  Dashboard
                </button>
              </Link>
              <button 
                onClick={() => signOut({ callbackUrl: '/' })}
                className="px-4 py-2 rounded-md bg-transparent border border-red-600 hover:bg-red-600 hover:text-white text-red-600 font-semibold transition-colors"
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <button className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                  Entrar
                </button>
              </Link>
              <Link href="/auth/register">
                <button className="px-4 py-2 rounded-md bg-transparent border border-blue-600 hover:bg-blue-600 hover:text-white text-blue-600 font-semibold transition-colors">
                  Registrar
                </button>
              </Link>
            </>
          )}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>

        {/* Layout para telas pequenas */}
        <div className="md:hidden flex items-center gap-2">
          {user ? (
            <>
              <Link href="/dashboard">
                <button className="px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm">
                  Painel
                </button>
              </Link>
              <button 
                onClick={() => signOut({ callbackUrl: '/' })}
                className="px-3 py-1 rounded-md bg-transparent border border-red-600 hover:bg-red-600 hover:text-white text-red-600 font-semibold text-sm transition-colors"
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Buscar..."
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full px-2 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Link href="/auth/login">
                <button className="px-2 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm">
                  Entrar
                </button>
              </Link>
            </>
          )}
          <button 
            onClick={toggleTheme}
            className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;