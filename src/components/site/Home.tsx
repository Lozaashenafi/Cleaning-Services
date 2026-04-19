import Link from "next/link";
import { db } from "@/db";
import { services, testimonials, companyConfigs } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import {
  Building2, Sparkles, Shield, Award, Clock, Users,
  CheckCircle2, Star, ArrowRight, Phone, Droplets,
  SprayCan, Wind, Hammer, Waves, Home, Briefcase,
} from "lucide-react";
import banner from "../../../public/banner.png";

// Reusable Icon Mapper
const iconMap: Record<string, any> = {
  Building2, SprayCan, Droplets, Wind, Waves, Hammer, Home, Briefcase, Sparkles,
};

const reasons = [
  { icon: Shield, title: "Fully Insured", desc: "Complete liability coverage for your peace of mind." },
  { icon: Award, title: "Certified Team", desc: "Trained and vetted professionals with industry certifications." },
  { icon: Clock, title: "Flexible Scheduling", desc: "Available 7 days a week with same-day service options." },
  { icon: CheckCircle2, title: "Satisfaction Guaranteed", desc: "Not happy? We'll re-clean for free, no questions asked." },
];

export default async function HomePage() {
  // 1. Fetch Dynamic Data using Drizzle
  const homeServices = await db.select().from(services).limit(6);
  const homeTestimonials = await db.select().from(testimonials).orderBy(desc(testimonials.createdAt)).limit(3);
  const config = await db.query.companyConfigs.findFirst({
    where: eq(companyConfigs.id, 1),
  });

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <img 
            src={banner.src}
            alt="Professional cleaning" 
            className="h-full w-full object-cover" 
          />
          <div className="absolute inset-0 bg-slate-900/70" />
        </div>
        
        <div className="container relative z-10 mx-auto px-6">
          <div className="max-w-2xl">
            <span className="mb-4 inline-block rounded-full bg-[#1d82e6]/20 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-md">
              ✨ Professional Cleaning Services
            </span>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white md:text-7xl">
              A Cleaner Space,<br />A Healthier Life
            </h1>
            <p className="mt-5 max-w-lg text-lg text-slate-200">
              From offices to homes, we deliver spotless results with eco-friendly products and trained professionals. Trusted by 500+ clients.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link 
                href="/contact" 
                className="bg-[#1d82e6] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#1669ba] transition-all shadow-lg shadow-blue-900/20"
              >
                Get a Free Quote
              </Link>
              <a 
                href={`tel:${config?.phone}`} 
                className="flex items-center gap-2 border border-white/30 bg-white/10 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 backdrop-blur-md transition-all"
              >
                <Phone size={20} /> Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#1d82e6]">
        <div className="container mx-auto grid grid-cols-2 gap-6 py-12 text-center md:grid-cols-4">
          {[
            { value: "500+", label: "Happy Clients" },
            { value: "10+", label: "Years Experience" },
            { value: "15K+", label: "Projects Done" },
            { value: "99%", label: "Satisfaction Rate" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-black text-white">{s.value}</div>
              <div className="mt-1 text-sm text-blue-100 font-medium uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold md:text-5xl text-slate-900">Our Cleaning Services</h2>
            <p className="mt-4 text-slate-500 text-lg">Comprehensive cleaning solutions tailored to your needs.</p>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {homeServices.map((s) => {
              const Icon = iconMap[s.iconName] ?? Building2;
              return (
                <div key={s.id} className="group rounded-[2rem] border border-slate-100 bg-white p-8 transition-all hover:shadow-2xl hover:shadow-blue-900/5 hover:-translate-y-1">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#1d82e6] transition-colors group-hover:bg-[#1d82e6] group-hover:text-white">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-slate-900">{s.title}</h3>
                  <p className="mt-3 text-slate-500 leading-relaxed text-sm">{s.description}</p>
                </div>
              );
            })}
          </div>
          
          <div className="mt-16 text-center">
            <Link href="/services" className="inline-flex items-center gap-2 font-bold text-[#1d82e6] hover:underline">
              View All Services <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold md:text-5xl text-slate-900">Why Choose {config?.name}?</h2>
            <p className="mt-4 text-slate-500">We go above and beyond to deliver exceptional results.</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r) => (
              <div key={r.title} className="text-center p-6 bg-white rounded-3xl shadow-sm border border-slate-100">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#1d82e6] text-white">
                  <r.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 font-bold text-slate-900">{r.title}</h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold md:text-5xl text-slate-900">What Our Clients Say</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {homeTestimonials.map((t) => (
              <div key={t.id} className="rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm hover:shadow-md transition-all">
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-600 leading-relaxed italic mb-8">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 font-bold text-[#1d82e6]">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{t.name}</div>
                    <div className="text-xs text-slate-400 font-medium uppercase tracking-tight">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#1d82e6] py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white md:text-5xl">Ready for a Spotless Space?</h2>
          <p className="mx-auto mt-6 max-w-lg text-blue-100 text-lg">
            Get your free, no-obligation quote today. We'll have your space sparkling in no time.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link 
              href="/contact" 
              className="bg-white text-[#1d82e6] px-10 py-5 rounded-full font-bold text-lg hover:bg-blue-50 transition-all shadow-xl"
            >
              Request a Quote
            </Link>
            <a 
              href={`tel:${config?.phone}`} 
              className="flex items-center gap-2 border border-white/30 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white/10 transition-all"
            >
              <Phone size={20} /> {config?.phone}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}