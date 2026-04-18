import { db } from '@/db';
import { gallery } from '@/db/schema';
import { Trash2, Plus, ImageIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { deleteGalleryItem } from '../actions';

export default async function AdminGallery() {
  const images = await db.select().from(gallery).orderBy(gallery.createdAt);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Gallery Management</h1>
        <Link href="/admin/gallery/new" className="bg-[#1d82e6] text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold">
          <Plus size={18} /> Add Photo
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {images.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 group relative">
            
            <div className="relative aspect-video w-full bg-slate-100">
              <Image 
                src={item.imageUrl} 
                alt={item.title} 
                fill 
                className="object-cover"
              />
            </div>
            <div className="p-4">
  <div className="flex justify-between items-start gap-2">
    <h3 className="font-bold text-slate-800 truncate flex-1">{item.title}</h3>
    <span className="text-[10px] font-bold uppercase bg-blue-50 text-[#1d82e6] px-2 py-1 rounded">
      {item.category}
    </span>
  </div>
</div>
            {/* Delete Overlay */}
            <form action={async () => { 'use server'; await deleteGalleryItem(item.id, item.imageUrl) }}>
              <button className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur shadow-sm rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100">
                <Trash2 size={18} />
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}