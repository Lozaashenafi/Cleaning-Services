import Link from "next/link";
import { db } from "@/db";
import { companyConfigs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

// SVG Brand Icons (Safe fallbacks)
const FacebookIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const InstagramIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>;
const TikTokIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>;

export default async function Footer() {
  const config = await db.query.companyConfigs.findFirst({
    where: eq(companyConfigs.id, 1)
  });

  return (
    <footer className="border-t bg-slate-900 text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1d82e6]">
                <span className="text-xl font-bold text-white">SC</span>
              </div>
              <span className="text-2xl font-bold">{config?.name || "SparkClean"}</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {config?.mission || "Professional cleaning services you can trust. We deliver spotless results for homes and businesses."}
            </p>
            <div className="mt-6 flex gap-3">
              {config?.facebookUrl && (
                <a href={config.facebookUrl} className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-800 hover:bg-[#1d82e6] transition-all">
                  <FacebookIcon />
                </a>
              )}
              {config?.instagramUrl && (
                <a href={config.instagramUrl} className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-800 hover:bg-[#1d82e6] transition-all">
                  <InstagramIcon />
                </a>
              )}
              {config?.tiktokUrl && (
                <a href={config.tiktokUrl} className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-800 hover:bg-[#1d82e6] transition-all">
                  <TikTokIcon />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              {["About", "Services", "Gallery", "Testimonials", "Contact"].map((l) => (
                <li key={l}>
                  <Link href={`/${l.toLowerCase()}`} className="hover:text-[#1d82e6] transition-colors">{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6">Our Services</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              {["Commercial Cleaning", "Office Cleaning", "Deep Cleaning", "Window Cleaning", "Carpet Cleaning"].map((s) => (
                <li key={s}>
                  <Link href="/services" className="hover:text-[#1d82e6] transition-colors">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contact Info</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-[#1d82e6] shrink-0" />
                {config?.phone}
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-[#1d82e6] shrink-0" />
                {config?.email}
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#1d82e6] shrink-0" />
                {config?.address}
              </li>
              <li className="flex items-start gap-3">
                <Clock size={18} className="text-[#1d82e6] shrink-0" />
                {config?.workingHours}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {config?.name}. All rights reserved.
      </div>
    </footer>
  );
}