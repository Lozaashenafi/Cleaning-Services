'use client'

import { useState } from 'react'
import { upsertPackage } from '../../../app/(admin)/admin/actions'
import { useRouter } from 'next/navigation'
import { Plus, X, ArrowLeft, Save, Star } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export default function PackageForm({ initialData }: { initialData?: any }) {
  const router = useRouter()
  const [features, setFeatures] = useState<string[]>(initialData?.features || [''])
  const [isPopular, setIsPopular] = useState(initialData?.popular || false)

  const addFeature = () => setFeatures([...features, ''])
  const removeFeature = (index: number) => setFeatures(features.filter((_, i) => i !== index))
  const updateFeature = (index: number, val: string) => {
    const next = [...features]
    next[index] = val
    setFeatures(next)
  }

  async function handleSubmit(formData: FormData) {
    const data = {
      id: initialData?.id,
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      price: formData.get('price') as string,
      popular: isPopular,
      features: features.filter(f => f.trim() !== ''),
    }

    try {
      await upsertPackage(data)
      toast.success(initialData ? 'Package updated' : 'Package created')
      router.push('/admin/packages')
    } catch {
      toast.error('Error saving package')
    }
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <Link href="/admin/packages" className="flex items-center gap-2 text-slate-500 mb-6 font-medium">
        <ArrowLeft size={20} /> Back to Pricing
      </Link>

      <form action={handleSubmit} className="space-y-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-800">Package Details</h2>
            <label className="flex items-center gap-2 cursor-pointer bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                <input 
                    type="checkbox" 
                    checked={isPopular} 
                    onChange={(e) => setIsPopular(e.target.checked)}
                    className="w-4 h-4 accent-[#1d82e6]"
                />
                <span className="text-sm font-bold text-slate-700 flex items-center gap-1">
                    <Star size={14} className={isPopular ? "fill-yellow-400 text-yellow-400" : "text-slate-400"} />
                    Mark as Popular
                </span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-slate-400">Package Name</label>
              <input name="name" required defaultValue={initialData?.name} className="w-full p-4 rounded-2xl border border-slate-100 bg-slate-50" placeholder="e.g. Standard Monthly" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-slate-400">Price Label</label>
              <input name="price" required defaultValue={initialData?.price} className="w-full p-4 rounded-2xl border border-slate-100 bg-slate-50" placeholder="e.g. $199 / mo" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-400">Summary Description</label>
            <textarea name="description" required defaultValue={initialData?.description} rows={2} className="w-full p-4 rounded-2xl border border-slate-100 bg-slate-50" placeholder="Perfect for small families..." />
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-50">
            <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-slate-700">Included Features</label>
                <button type="button" onClick={addFeature} className="text-[#1d82e6] text-xs font-bold flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-lg">
                    <Plus size={16} /> Add Feature
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {features.map((item, index) => (
                <div key={index} className="flex gap-2 group">
                  <input value={item} onChange={(e) => updateFeature(index, e.target.value)} className="flex-1 p-3 rounded-xl border border-slate-100 bg-slate-50 focus:bg-white text-sm" placeholder="e.g. All bedrooms cleaned" />
                  <button type="button" onClick={() => removeFeature(index)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="w-full bg-[#1d82e6] text-white font-bold py-5 rounded-[2rem] shadow-xl shadow-blue-100 hover:bg-[#1669ba] transition-all flex items-center justify-center gap-2">
            <Save size={20} /> {initialData ? 'Update Package' : 'Publish Package'}
          </button>
        </div>
      </form>
    </div>
  )
}