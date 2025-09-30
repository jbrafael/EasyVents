'use client';

import { useEffect, useRef, useState } from 'react';
import Header from '@/components/Header';
import EventCard from '@/components/EventCard';
import eventsData from '@/data/events.json';

export default function HomePage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const cardWidth = 336; // Largura do card (320px) + gap (16px)

  // Função para rolar para a esquerda
  const scrollPrev = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : eventsData.length - 1;
    setCurrentIndex(newIndex);
    scrollRef.current?.scrollTo({
      left: newIndex * cardWidth,
      behavior: 'smooth',
    });
  };

  const scrollNext = () => {
    const newIndex = (currentIndex + 1) % eventsData.length;
    setCurrentIndex(newIndex);
    scrollRef.current?.scrollTo({
      left: newIndex * cardWidth,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const scrollInterval = setInterval(scrollNext, 5000); 
    return () => clearInterval(scrollInterval);
  }, [currentIndex]);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Header />
      <main className="container mx-auto p-8">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-gray-900 dark:text-white">
          Eventos em Destaque
        </h2>
        
        {/* Container do Carrossel */}
        <div className="relative">
          <div ref={scrollRef} className="flex overflow-x-hidden gap-4 p-2 scrollbar-hide">
            {eventsData.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          {/* Botões de Navegação */}
          <button 
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/50 dark:bg-gray-800/50 text-gray-800 dark:text-white"
          >
            {'<'}
          </button>
          <button 
            onClick={scrollNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/50 dark:bg-gray-800/50 text-gray-800 dark:text-white"
          >
            {'>'}
          </button>

          {/* Indicadores de Posição (pontos) */}
          <div className="flex justify-center mt-4">
            {eventsData.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 mx-1 rounded-full ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-gray-400 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}