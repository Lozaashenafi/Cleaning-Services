'use client'
import { uploadToGallery } from '../../actions';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import { GALLERY_CATEGORIES } from '@/lib/constants';

export default function NewGalleryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    try {
      await uploadToGallery(formData);
      toast.success('Added to gallery!');
      router.push('/admin/gallery');
    } catch (e) {
      toast.error('Upload failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Link href="/admin/gallery" className="flex items-center gap-2 text-slate-500 mb-6 hover:text-[#1d82e6]">
        <ArrowLeft size={20}/> Back
      </Link>
      
      <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold mb-8 text-slate-800">Add Gallery Photo</h2>
        
        <form action={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Project Title</label>
            <input name="title" required className="w-full p-4 rounded-xl border border-slate-200" placeholder="e.g. Luxury Office Suite" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Category</label>
            <select name="category" required className="w-full p-4 rounded-xl border border-slate-200 bg-white">
              {GALLERY_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Image File</label>
            <input name="image" type="file" accept="image/*" required className="w-full p-3 border-2 border-dashed border-slate-100 rounded-xl" />
          </div>

          <button disabled={loading} className="w-full bg-[#1d82e6] text-white font-bold py-4 rounded-2xl hover:bg-[#1669ba] flex items-center justify-center gap-2">
            {loading ? <Loader2 className="animate-spin"/> : <Upload size={20}/>}
            Upload Photo
          </button>
        </form>
      </div>
    </div>
  );
}