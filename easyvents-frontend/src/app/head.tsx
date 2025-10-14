import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EasyVents',
  description: 'Plataforma de eventos',
};

export default function Head() {
  return (
    <>
      <title>{metadata.title as string}</title>
      <meta name="description" content={metadata.description as string} />
    </>
  );
}