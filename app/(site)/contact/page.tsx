import { db } from "@/db";
import { companyConfigs, services } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import ContactForm from "@/components/site/Contact";

export default async function ContactPage() {
  // Fetch dynamic data
  const config = await db.query.companyConfigs.findFirst({ where: eq(companyConfigs.id, 1) });
  const allServices = await db.select({ title: services.title }).from(services);
  const serviceTitles = allServices.map(s => s.title);

  const contactItems = [
    { icon: Phone, label: "Phone", value: config?.phone, href: `tel:${config?.phone}` },
    { icon: Mail, label: "Email", value: config?.email, href: `mailto:${config?.email}` },
    { icon: MapPin, label: "Address", value: config?.address },
    { icon: Clock, label: "Hours", value: config?.workingHours },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#1d82e6] py-24 text-white text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Get in Touch</h1>
          <p className="mt-6 text-lg text-blue-50 opacity-90 max-w-2xl mx-auto">
            Ready for a cleaner space? Fill out the form below and we'll get back to you within 24 hours.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid gap-16 lg:grid-cols-3">
            
            {/* Sidebar: Info */}
            <div className="space-y-10">
              <h2 className="text-3xl font-bold text-slate-900">Contact Information</h2>
              <div className="space-y-8">
                {contactItems.map((c) => (
                  <div key={c.label} className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[#1d82e6]">
                      <c.icon size={24} />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">{c.label}</div>
                      {c.href ? (
                        <a href={c.href} className="text-lg font-bold text-slate-700 hover:text-[#1d82e6] transition-colors">{c.value}</a>
                      ) : (
                        <div className="text-lg font-bold text-slate-700 whitespace-pre-line">{c.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="pt-10 border-t border-slate-100">
                <h3 className="font-bold text-slate-900 mb-4">Service Areas</h3>
                <p className="text-slate-500 leading-relaxed">
                  We proudly serve Manhattan, Brooklyn, Queens, Bronx, Staten Island, and select areas of NJ and Long Island.
                </p>
              </div>
            </div>

            {/* Main: Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 md:p-12 shadow-sm">
                <div className="mb-10">
                  <h2 className="text-3xl font-bold text-slate-900">Request a Quote</h2>
                  <p className="text-slate-500 mt-2">Fill out this form and we'll provide a detailed estimate.</p>
                </div>
                
                <ContactForm services={serviceTitles} />
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}