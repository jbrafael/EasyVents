'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import EventCard from '@/components/EventCard';
import eventsData from '@/data/events.json';

export default function HomePage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm] = useState('');

  const filteredEvents = eventsData.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cardWidth = 336;

  const scrollPrev = useCallback(() => {
    if (filteredEvents.length > 0) {
      const newIndex = currentIndex > 0 ? currentIndex - 1 : filteredEvents.length - 1;
      setCurrentIndex(newIndex);
      scrollRef.current?.scrollTo({
        left: newIndex * cardWidth,
        behavior: 'smooth',
      });
    }
  }, [currentIndex, filteredEvents.length, cardWidth]);

  const scrollNext = useCallback(() => {
    if (filteredEvents.length > 0) {
      const newIndex = (currentIndex + 1) % filteredEvents.length;
      setCurrentIndex(newIndex);
      scrollRef.current?.scrollTo({
        left: newIndex * cardWidth,
        behavior: 'smooth',
      });
    }
  }, [currentIndex, filteredEvents.length, cardWidth]);

  useEffect(() => {
    if (filteredEvents.length > 0) {
      const scrollInterval = setInterval(scrollNext, 5000);
      return () => clearInterval(scrollInterval);
    }
  }, [currentIndex, scrollNext, filteredEvents.length]);

  return (
    <main className="container mx-auto p-8">
      <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-gray-900 dark:text-white">
        Eventos em Destaque
      </h2>
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex flex-col md:flex-row md:overflow-x-hidden md:gap-4 p-2 -mx-4 scrollbar-hide md:justify-start justify-center"
        >
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
        <div className="hidden md:block">
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
        </div>
        <div className="flex justify-center mt-4">
          {filteredEvents.map((_, index) => (
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
  );
}