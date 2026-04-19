import { CheckCircle2, Shield, Award, Users, Heart, Target } from "lucide-react";
import Link from "next/link";
import { db } from "@/db";
import { companyConfigs } from "@/db/schema";
import { eq } from "drizzle-orm";

const values = [
  { icon: Heart, title: "Customer First", desc: "Your satisfaction drives every decision we make." },
  { icon: Shield, title: "Trust & Integrity", desc: "Transparent pricing, insured team, and honest communication." },
  { icon: Target, title: "Excellence", desc: "We don't just clean — we deliver results that exceed expectations." },
  { icon: Users, title: "Teamwork", desc: "Our trained professionals work as a team for consistent quality." },
];

const serviceAreas = [
  "Manhattan", "Brooklyn", "Queens", "Bronx", "Staten Island",
  "Long Island", "Westchester", "New Jersey (select areas)",
];

export default async function About() {
  // Fetch dynamic company info from Drizzle
  const config = await db.query.companyConfigs.findFirst({
    where: eq(companyConfigs.id, 1),
  });

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-[#1d82e6] py-24 text-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-extrabold md:text-6xl tracking-tight">
            About {config?.name || "SparkClean"}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-50 opacity-90">
            A decade of dedication to clean, healthy spaces for businesses and families.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">Our Story</h2>
            <div className="mt-8 space-y-6 text-slate-600 leading-relaxed text-lg">
              {/* If DB has a story, use it. Otherwise, use fallback */}
              {config?.story ? (
                <p className="whitespace-pre-wrap">{config.story}</p>
              ) : (
                <>
                  <p>
                    Founded in 2014, {config?.name || "SparkClean"} started as a small, family-run cleaning company with a simple mission: to provide reliable, high-quality cleaning services that people can trust.
                  </p>
                  <p>
                    Over the past decade, we've grown into a team of trained cleaning professionals serving commercial and residential clients. Our growth is a direct result of our commitment to quality, transparency, and customer satisfaction.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-slate-900">Our Mission</h2>
            <p className="mt-6 text-xl text-slate-600 leading-relaxed italic">
              "{config?.mission || "To create healthier, more productive environments through professional cleaning services that are reliable, affordable, and environmentally responsible."}"
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-center text-3xl font-bold text-slate-900 md:text-4xl">Our Core Values</h2>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="text-center p-8 bg-white rounded-[2rem] border border-slate-100 hover:shadow-xl hover:shadow-blue-900/5 transition-all">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-[#1d82e6]">
                  <v.icon size={28} />
                </div>
                <h3 className="mt-6 text-lg font-bold text-slate-900">{v.title}</h3>
                <p className="mt-3 text-sm text-slate-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-center text-3xl font-bold text-slate-900 mb-12">Why Trust Us?</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Fully licensed and insured",
                "Background-checked staff",
                "ISSA certified cleaning company",
                "Eco-friendly products",
                "Satisfaction guarantee",
                "10+ years in business",
                "24/7 customer support",
                "Trained & uniformed team",
              ].map((item) => (
                <div key={item} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                  <CheckCircle2 size={22} className="shrink-0 text-[#1d82e6]" />
                  <span className="font-semibold text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-slate-900">Service Areas</h2>
            <p className="mt-4 text-slate-500">We proudly serve clients across the following areas.</p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {serviceAreas.map((area) => (
                <span key={area} className="rounded-full border border-slate-200 bg-white px-6 py-2.5 text-sm font-bold text-slate-600 shadow-sm">
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#1d82e6] py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white md:text-5xl">Let's Work Together</h2>
          <p className="mx-auto mt-6 max-w-md text-blue-50 opacity-90">Ready to experience the SparkClean difference?</p>
          <Link 
            href="/contact" 
            className="mt-10 inline-block bg-white text-[#1d82e6] px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all shadow-xl"
          >
            Contact Us Today
          </Link>
        </div>
      </section>
    </main>
  );
}