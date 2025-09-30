'use client';

import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import Header from '@/components/Header';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Importe o useRouter

// Ícones simples para o botão de mostrar/esconder senha
const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

const EyeSlashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.981 18.003A12.337 12.337 0 0 1 12 6.002c2.192 0 4.238.489 6.131 1.349m1.205 1.141-1.579 1.579M10.154 9.458a2.998 2.998 0 0 0 4.24 4.24m.511-2.674 1.583 1.583M12 17.25c-2.192 0-4.238-.489-6.131-1.349m-1.205-1.141 1.579-1.579M10.154 9.458a2.998 2.998 0 0 0 4.24 4.24M12 17.25c-2.192 0-4.238-.489-6.131-1.349m-1.205-1.141 1.579-1.579M10.154 9.458a2.998 2.998 0 0 0 4.24 4.24M12 17.25c-2.192 0-4.238-.489-6.131-1.349m-1.205-1.141 1.579-1.579M10.154 9.458a2.998 2.998 0 0 0 4.24 4.24M12 17.25c-2.192 0-4.238-.489-6.131-1.349m-1.205-1.141 1.579-1.579M10.154 9.458a2.998 2.998 0 0 0 4.24 4.24" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.25c-2.192 0-4.238-.489-6.131-1.349m-1.205-1.141 1.579-1.579M10.154 9.458a2.998 2.998 0 0 0 4.24 4.24m.511-2.674 1.583 1.583M12 17.25c-2.192 0-4.238-.489-6.131-1.349m-1.205-1.141 1.579-1.579M10.154 9.458a2.998 2.998 0 0 0 4.24 4.24M12 17.25c-2.192 0-4.238-.489-6.131-1.349m-1.205-1.141 1.579-1.579M10.154 9.458a2.998 2.998 0 0 0 4.24 4.24" />
  </svg>
);


export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Novo estado para mostrar/esconder senha
  const router = useRouter(); // Inicialize o useRouter

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:8000/api/register', {
        name,
        email,
        password,
      });

      console.log('Registro bem-sucedido:', response.data);
      setSuccess('Registro realizado com sucesso! Redirecionando para o login...');
      
      // Redireciona o usuário para a página de login após o registro
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000); // Espera 2 segundos antes de redirecionar

    } catch (err) {
      if (axios.isAxiosError(err) && err.response && err.response.data && err.response.data.errors) {
        const errorMessages = Object.values(err.response.data.errors).flat();
        setError(errorMessages.join(' '));
      } else {
        setError('Erro ao registrar. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      <Header onSearchChange={() => {}} />
      <main className="container mx-auto p-8 flex justify-center items-center min-h-[calc(100vh-64px)]"> {/* min-h ajustado */}
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-4 text-center">Registro</h1>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Nome</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6 relative"> {/* Adicione 'relative' aqui */}
              <label className="block text-sm font-semibold mb-2">Senha</label>
              <input
                type={showPassword ? 'text' : 'password'} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10" // Adicione 'pr-10' para espaço do ícone
                required
              />
              <button
                type="button" // Importante: type="button" para não submeter o formulário
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 dark:text-gray-300 top-7" // Ajuste o 'top-7' conforme necessário
              >
                {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
              </button>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 transition-colors"
            >
              {loading ? 'Registrando...' : 'Registrar'}
            </button>
            <p className="mt-4 text-sm text-center">
              Já tem uma conta? <Link href="/auth/login" className="text-blue-500 hover:underline">Faça login</Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}