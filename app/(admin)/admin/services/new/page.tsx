'use client'

import { useState } from 'react';
import { upsertService } from '../../actions';
import { useRouter } from 'next/navigation';
import { Plus, X, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { IconPicker } from '@/components/admin/IconPicker';

export default function NewServicePage() {
  const router = useRouter();
  const [iconName, setIconName] = useState('Building2');
  const [includes, setIncludes] = useState<string[]>(['']);

  const addInclude = () => setIncludes([...includes, '']);
  const removeInclude = (index: number) => setIncludes(includes.filter((_, i) => i !== index));
  const updateInclude = (index: number, val: string) => {
    const next = [...includes];
    next[index] = val;
    setIncludes(next);
  };

  async function handleSubmit(formData: FormData) {
    const data = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      iconName: iconName, // Use the state from our picker
      category: formData.get('category') as string,
      price: formData.get('price') as string,
      includes: includes.filter(i => i.trim() !== ''),
    };

    await upsertService(data);
    router.push('/admin/services');
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <Link href="/admin/services" className="flex items-center gap-2 text-slate-500 hover:text-[#1d82e6] mb-6">
        <ArrowLeft size={20} /> Back
      </Link>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <form action={handleSubmit} className="space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Service Title</label>
                <input name="title" required className="w-full p-4 rounded-xl border border-slate-200" placeholder="Office Cleaning" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Category</label>
                <select name="category" className="w-full p-4 rounded-xl border border-slate-200 bg-white">
                  <option value="Commercial">Commercial</option>
                  <option value="Residential">Residential</option>
                  <option value="Specialty">Specialty</option>
                </select>
              </div>
            </div>

            {/* THE ICON PICKER */}
            <IconPicker selected={iconName} onChange={setIconName} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Description</label>
            <textarea name="description" required rows={3} className="w-full p-4 rounded-xl border border-slate-200" placeholder="A brief overview of the service..." />
          </div>

          {/* Includes List ... same as before ... */}
          <div className="space-y-4">
             <label className="text-sm font-bold text-slate-700">Checklist Items</label>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
               {includes.map((item, index) => (
                 <div key={index} className="flex gap-2">
                   <input value={item} onChange={(e) => updateInclude(index, e.target.value)} className="flex-1 p-3 border border-slate-200 rounded-xl" placeholder="e.g. Dusting" />
                   <button type="button" onClick={() => removeInclude(index)} className="p-2 text-slate-300 hover:text-red-500"><X size={20}/></button>
                 </div>
               ))}
             </div>
             <button type="button" onClick={addInclude} className="text-[#1d82e6] font-bold text-sm flex items-center gap-1"><Plus size={18}/> Add Item</button>
          </div>

          <button type="submit" className="w-full bg-[#1d82e6] text-white font-bold py-4 rounded-2xl hover:bg-[#1669ba] transition-all shadow-lg shadow-blue-100">
            Create Service
          </button>
        </form>
      </div>
    </div>
  );
}