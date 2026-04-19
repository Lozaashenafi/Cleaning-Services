import { db } from "@/db";
import { gallery } from "@/db/schema";
import { desc } from "drizzle-orm";
import GalleryClient from "@/components/site/Gallery";

export default async function GalleryPage() {
  // 1. Fetch all gallery items server-side
  const allItems = await db.select().from(gallery).orderBy(desc(gallery.createdAt));

  return (
    <main className="min-h-screen bg-white">
      {/* Blue Hero Section */}
      <section className="bg-[#1d82e6] py-24 text-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-extrabold md:text-6xl tracking-tight">Our Work</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-50 opacity-90 leading-relaxed">
            See the SparkClean difference — browse our portfolio of residential and commercial cleaning projects.
          </p>
        </div>
      </section>

      {/* Interactive Gallery Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <GalleryClient initialItems={allItems} />
        </div>
      </section>

      {/* CTA / Footer Note */}
      <section className="pb-24">
        <div className="container mx-auto px-6 text-center">
          <p className="text-slate-500 max-w-lg mx-auto">
            Want to see more? Contact us for a full portfolio or request on-site references for your specific industry.
          </p>
        </div>
      </section>
    </main>
  );
}