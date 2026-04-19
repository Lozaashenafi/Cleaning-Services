import Link from "next/link";
import { db } from "@/db";
import { services, packages } from "@/db/schema";
import { asc } from "drizzle-orm";
import {
  Building2, SprayCan, Droplets, Wind, Waves, Hammer,
  Home, Briefcase, CheckCircle2, ArrowRight, Sparkles,
  type LucideIcon
} from "lucide-react";

// Map strings from the DB to actual Lucide Components
const iconMap: Record<string, LucideIcon> = {
  Building2, SprayCan, Droplets, Wind, Waves, Hammer, Home, Briefcase, Sparkles
};

export default async function Services() {
  // 1. Fetch data directly from Drizzle
  const allServices = await db.select().from(services).orderBy(asc(services.sortOrder));
  const allPackages = await db.select().from(packages).orderBy(asc(packages.sortOrder));

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-[#1d82e6] py-24 text-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-extrabold md:text-6xl tracking-tight">Our Services</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-50 opacity-90 leading-relaxed">
            Comprehensive cleaning solutions for every need, from daily maintenance to specialty projects.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid gap-8 md:grid-cols-2">
            {allServices.map((s) => {
              const Icon = iconMap[s.iconName] ?? Building2;
              return (
                <div 
                  key={s.id} 
                  className="rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm transition-all hover:shadow-xl hover:shadow-blue-900/5 group"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[#1d82e6] group-hover:bg-[#1d82e6] group-hover:text-white transition-colors">
                      <Icon size={32} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">{s.title}</h3>
                      <p className="mt-2 text-slate-500 leading-relaxed">{s.description}</p>
                    </div>
                  </div>

                  {/* Dynamic Includes List */}
                  {s.includes && s.includes.length > 0 && (
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-slate-50">
                      {s.includes.map((item) => (
                        <div key={item} className="flex items-center gap-3">
                          <CheckCircle2 size={18} className="shrink-0 text-[#1d82e6]" />
                          <span className="text-slate-600 text-sm font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Packages Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold md:text-5xl text-slate-900">Service Packages</h2>
            <p className="mt-4 text-slate-500">Choose the plan that fits your schedule and budget.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {allPackages.map((p) => (
              <div 
                key={p.id} 
                className={`relative rounded-[2.5rem] border bg-white p-8 shadow-sm transition-all hover:scale-[1.02] ${
                  p.popular ? "border-[#1d82e6] ring-4 ring-blue-50" : "border-slate-100"
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#1d82e6] px-6 py-1.5 text-xs font-bold text-white uppercase tracking-widest shadow-lg shadow-blue-200">
                    Most Popular
                  </span>
                )}
                
                <h3 className="text-2xl font-bold text-slate-900">{p.name}</h3>
                <p className="mt-3 text-slate-500 text-sm leading-relaxed">{p.description}</p>
                <div className="mt-6 text-3xl font-black text-[#1d82e6]">{p.price}</div>
                
                <ul className="mt-8 space-y-4">
                  {(p.features ?? []).map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-slate-600">
                      <CheckCircle2 size={18} className="text-[#1d82e6] shrink-0 mt-0.5" />
                      <span className="font-medium">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link 
                  href="/contact" 
                  className={`mt-10 flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-bold transition-all ${
                    p.popular 
                      ? "bg-[#1d82e6] text-white hover:bg-[#1669ba] shadow-lg shadow-blue-100" 
                      : "border-2 border-slate-100 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Get Started <ArrowRight size={18} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#1d82e6] py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white md:text-5xl">Need a Custom Solution?</h2>
          <p className="mx-auto mt-6 max-w-md text-blue-50 opacity-90 text-lg">
            Contact us for a personalized cleaning plan that fits your exact needs.
          </p>
          <Link 
            href="/contact" 
            className="mt-10 inline-block bg-white text-[#1d82e6] px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all shadow-xl shadow-blue-900/20"
          >
            Request a Custom Quote
          </Link>
        </div>
      </section>
    </main>
  );
}