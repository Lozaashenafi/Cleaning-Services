import Home from '@/components/site/Home';
import { db } from '@/db';
import { services } from '@/db/schema';
import Link from 'next/link';

export default async function HomePage() {
  const allServices = await db.select().from(services);

  return (
    <div className="min-h-screen bg-white">
      <Home />
    </div>
  );
}