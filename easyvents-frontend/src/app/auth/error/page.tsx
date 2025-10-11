'use client';

import Header from '@/components/Header';
import Link from 'next/link';

export default function AuthErrorPage() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      <Header onSearchChange={() => {}} />
      <main className="container mx-auto p-8 flex justify-center items-center min-h-[calc(100vh-64px)]">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-4 text-center">Erro de Autenticação</h1>
          <p className="text-red-500 mb-4 text-center">Ocorreu um erro no login. Verifique suas credenciais e tente novamente.</p>
          <div className="mt-6 text-center">
            <Link href="/auth/login" className="text-blue-500 hover:underline">
              Voltar para o login
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}