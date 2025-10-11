'use client';

import React from 'react';
import Link from 'next/link';

interface HeaderProps {
  onSearchChange: (searchTerm: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearchChange }) => {
  return (
    <header className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link href="/">EasyVents</Link>
        </h1>
        <div className="hidden md:flex items-center gap-4">
          <input
            type="text"
            placeholder="Buscar eventos..."
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-64 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
        </div>
      </nav>
    </header>
  );
};

export default Header;