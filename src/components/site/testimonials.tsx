import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { desc } from "drizzle-orm";
import { Star, Quote } from "lucide-react";

export default async function TestimonialsPage() {
  // 1. Fetch testimonials directly from Drizzle
  const allTestimonials = await db
    .select()
    .from(testimonials)
    .orderBy(desc(testimonials.createdAt));

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-[#1d82e6] py-24 text-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-extrabold md:text-6xl tracking-tight">
            Client Testimonials
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-blue-50 opacity-90 leading-relaxed">
            Don't take our word for it — hear directly from the homeowners and businesses who trust SparkClean every day.
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          {allTestimonials.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200">
              <p className="text-slate-400">No testimonials published yet. Be the first to leave one!</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {allTestimonials.map((t) => (
                <div 
                  key={t.id} 
                  className="relative group rounded-[2.5rem] border border-slate-100 bg-white p-10 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1"
                >
                  {/* Faint Decorative Quote Icon */}
                  <Quote 
                    size={60} 
                    className="absolute top-8 right-8 text-slate-50 opacity-50 group-hover:text-blue-50 transition-colors" 
                  />

                  <div className="relative z-10">
                    {/* Star Rating */}
                    <div className="flex gap-1 mb-6">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          size={18} 
                          className={i < t.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-200"} 
                        />
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-slate-600 leading-relaxed italic text-lg mb-8">
                      "{t.text}"
                    </p>

                    {/* Author Info */}
                    <div className="flex items-center gap-4 border-t border-slate-50 pt-8">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 font-black text-[#1d82e6] text-lg">
                        {t.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-base">{t.name}</div>
                        <div className="text-xs font-bold text-[#1d82e6] uppercase tracking-wider">
                          {t.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Bottom Section */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            Are you a SparkClean customer?
          </h2>
          <p className="text-slate-500 mb-8 max-w-md mx-auto">
            We'd love to hear about your experience with our team.
          </p>
          <button className="bg-white border-2 border-slate-200 text-slate-600 px-8 py-3 rounded-full font-bold hover:bg-[#1d82e6] hover:text-white hover:border-[#1d82e6] transition-all">
            Leave a Review
          </button>
        </div>
      </section>
    </main>
  );
}