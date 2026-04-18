import { db } from '@/db';
import { services } from '@/db/schema';
import Link from 'next/link';

export default async function HomePage() {
  const allServices = await db.select().from(services);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 shadow-sm">
        <h1 className="text-xl font-bold text-blue-600">Covenant Clean Co.</h1>
        <div className="space-x-4">
          <Link href="/login" className="text-gray-600 hover:text-blue-600">Login</Link>
          <Link href="/register" className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">Get a Quote</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-blue-50 py-20 px-8 text-center">
        <h2 className="text-5xl font-extrabold text-gray-900 md:text-6xl">
          Sparkling Clean, <br />
          <span className="text-blue-600">Every Single Time.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
          Professional residential and commercial cleaning services you can trust.
          Experience the difference of a truly clean environment.
        </p>
        <div className="mt-10">
          <Link href="/register" className="rounded-full bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-blue-700">
            Book Your Cleaning
          </Link>
        </div>
      </section>

      {/* Services Grid (Dynamic from DB) */}
      <section className="py-20 px-8 max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Services</h3>
        
        {allServices.length === 0 ? (
          <p className="text-center text-gray-500">No services listed yet. Check back soon!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {allServices.map((service) => (
              <div key={service.id} className="p-6 border rounded-2xl hover:shadow-xl transition-shadow bg-white">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4 font-bold">
                  ✓
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h4>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <p className="text-blue-600 font-semibold">{service.price}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 px-8 text-white text-center">
        <p>&copy; {new Date().getFullYear()} Covenant Clean Co. All rights reserved.</p>
      </footer>
    </div>
  );
}