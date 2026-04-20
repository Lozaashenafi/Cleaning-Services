'use client'

import { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // Use Next.js Image for better optimization
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar({ config }: { config: any }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white">
      <div className="container mx-auto px-6 flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          {/* Logo Container - Removed blue background so logo is fully visible */}
          <div className="relative h-26 w-26 flex items-center justify-center">
            <Image 
              src="/logo.png" 
              alt="Covenant clean co Logo" 
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-2xl font-bold text-slate-900 tracking-tight">
            {config?.name || "Covenant clean co"}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-2 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-xl px-4 py-2 text-sm font-bold transition-all ${
                pathname === l.href
                  ? "bg-blue-50 text-[#1d82e6]"
                  : "text-slate-600 hover:bg-slate-50 hover:text-[#1d82e6]"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <a href={`tel:${config?.phone}`} className="flex items-center gap-2 text-sm font-bold text-[#1d82e6]">
            <Phone size={18} />
            {config?.phone}
          </a>
          <Link 
            href="/contact" 
            className="bg-[#1d82e6] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-[#1669ba] transition-all shadow-lg shadow-blue-100"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2 text-slate-600" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-20 inset-x-0 bg-white border-b border-slate-100 md:hidden shadow-xl animate-in slide-in-from-top duration-300">
          <nav className="container mx-auto px-6 flex flex-col gap-2 py-6">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-4 py-3 text-base font-bold transition-all ${
                  pathname === l.href
                    ? "bg-blue-50 text-[#1d82e6]"
                    : "text-slate-600"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link 
              href="/contact" 
              onClick={() => setOpen(false)}
              className="mt-4 w-full bg-[#1d82e6] text-white text-center py-4 rounded-2xl font-bold shadow-lg shadow-blue-100"
            >
              Get a Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}