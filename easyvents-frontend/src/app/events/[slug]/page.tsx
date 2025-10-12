'use client';

import React from 'react';
import Image from 'next/image';
import eventsData from '@/data/events.json';
import { notFound } from 'next/navigation';
import { useParams } from 'next/navigation'; 

export default function EventPage() {
  const params = useParams(); 
  const event = eventsData.find((e) => e.slug === params.slug);

  if (!event) {
    notFound();
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      <main className="container mx-auto p-8 pt-20">
        <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill={true}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw" // Adicione a propriedade sizes
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-4xl font-bold">{event.title}</h1>
          <span className="text-xl text-gray-600 dark:text-gray-300">
            {event.location} - {event.date}
          </span>
        </div>
        <p className="text-lg leading-relaxed">
          Participe do nosso evento focado em {event.title} e aprenda com os melhores
          profissionais da área. Este é um evento imperdível para a comunidade de
          desenvolvedores!
        </p>
      </main>
    </div>
  );
}