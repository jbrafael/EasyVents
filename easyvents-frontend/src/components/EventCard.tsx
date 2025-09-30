import React from 'react';
import Image from 'next/image';

interface EventCardProps {
  event: {
    id: number;
    title: string;
    location: string;
    date: string;
    imageUrl: string;
  };
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="flex-none w-64 md:w-80 rounded-lg overflow-hidden shadow-lg m-4 transition-transform hover:scale-105 cursor-pointer bg-white dark:bg-gray-700">
      <div className="relative w-full h-40">
        <Image 
          src={event.imageUrl} 
          alt={event.title} 
          fill={true}
          className="object-cover" 
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white truncate">{event.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{event.location}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300">{event.date}</p>
      </div>
    </div>
  );
};

export default EventCard;