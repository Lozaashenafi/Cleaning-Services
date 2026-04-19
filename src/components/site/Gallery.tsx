'use client';

import { useState } from "react";
import Image from "next/image";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

export default function GalleryClient({ initialItems }: { initialItems: GalleryItem[] }) {
  const [filter, setFilter] = useState("All");

  // Dynamically generate category list from data
  const categories = ["All", ...Array.from(new Set(initialItems.map((g) => g.category)))];

  const filteredItems = filter === "All" 
    ? initialItems 
    : initialItems.filter((g) => g.category === filter);

  return (
    <div className="space-y-12">
      {/* Filter Bar */}
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`rounded-full px-8 py-2.5 text-sm font-bold transition-all duration-300 ${
              filter === c 
                ? "bg-[#1d82e6] text-white shadow-lg shadow-blue-200" 
                : "border border-slate-200 bg-white text-slate-500 hover:border-[#1d82e6] hover:text-[#1d82e6]"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredItems.map((item) => (
          <div 
            key={item.id} 
            className="group relative aspect-square overflow-hidden rounded-[2rem] bg-slate-100 shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-blue-900/10"
          >
            {/* The Image */}
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent p-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">
                {item.category}
              </span>
              <h3 className="text-xl font-bold text-white leading-tight">
                {item.title}
              </h3>
            </div>

            {/* Static Title (Visible before hover on mobile/desktop) */}
            <div className="absolute top-4 left-4 right-4 group-hover:opacity-0 transition-opacity">
               <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black text-slate-800 uppercase tracking-tighter shadow-sm">
                  {item.category}
               </span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-20 bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200">
          <p className="text-slate-400 font-medium">No projects found in this category yet.</p>
        </div>
      )}
    </div>
  );
}