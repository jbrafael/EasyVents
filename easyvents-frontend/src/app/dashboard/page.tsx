'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import axios from 'axios';

// Definindo o tipo para os eventos
interface Event {
  id: number;
  title: string;
  location: string;
  event_date: string;
  user_id: number;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [events, setEvents] = useState<Event[]>([]);

  // Lógica de proteção de rota
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  // Carrega os eventos do usuário
  const fetchUserEvents = async () => {
    if (!session || !session.user || !session.user.token) return;

    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/events', {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      });
      setEvents(response.data.events || []);
    } catch (err: unknown) {
      console.error('Erro ao buscar eventos:', err);
      setError('Erro ao carregar seus eventos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      fetchUserEvents();
    }
  }, [status]); // O useEffect roda quando o status de autenticação muda

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!session || !session.user || !session.user.token) {
      setError('Você precisa estar logado para criar um evento.');
      setLoading(false);
      return;
    }

    try {
      await axios.post(
        'http://localhost:8000/api/events',
        {
          title,
          location,
          event_date: date,
        },
        {
          headers: {
            Authorization: `Bearer ${session.user.token}`,
          },
        }
      );

      setSuccess('Evento criado com sucesso!');
      setTitle('');
      setLocation('');
      setDate('');
      fetchUserEvents(); // Atualiza a lista de eventos
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        // Aqui você pode fazer algo específico para erros do Axios
        setError('Erro ao criar o evento.');
      } else if (err instanceof Error) {
        // Caso o erro seja uma instância de Error padrão do JavaScript
        setError(err.message);
      } else {
        setError('Ocorreu um erro desconhecido.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white flex justify-center items-center">
        <p>Carregando...</p>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null; // O useEffect já irá redirecionar
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      <main className="container mx-auto p-8 pt-20">
        <h1 className="text-3xl font-bold mb-4">Painel de Eventos</h1>
        <p className="text-lg mb-8">Olá, {session?.user?.name}! Crie e gerencie seus eventos por aqui.</p>

        {/* Formulário de Criação */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-xl mx-auto mb-8">
          <h2 className="text-xl font-bold mb-4 text-center">Criar Novo Evento</h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Título do Evento</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Local</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Data do Evento</label>
              <input
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 transition-colors"
            >
              {loading ? 'Criando...' : 'Criar Evento'}
            </button>
          </form>
        </div>

        {/* Lista de Eventos */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-center">Seus Eventos</h2>
          {loading ? (
            <p className="text-center">Carregando eventos...</p>
          ) : events.length === 0 ? (
            <p className="text-center">Você ainda não criou nenhum evento.</p>
          ) : (
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                  <h3 className="text-lg font-bold">{event.title}</h3>
                  <p className="text-sm">Local: {event.location}</p>
                  <p className="text-sm">Data: {new Date(event.event_date).toLocaleString('pt-BR')}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
