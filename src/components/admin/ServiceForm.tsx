'use client'

import { useState } from 'react'
import { upsertService } from '../../../app/(admin)/admin/actions'
import { useRouter } from 'next/navigation'
import { Plus, X, ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'
import { IconPicker } from './IconPicker'
import { toast } from 'sonner'

interface ServiceFormProps {
  initialData?: {
    id?: string
    title: string
    description: string
    iconName: string
    category: string | null
    price: string | null
    includes: string[]
  }
}

export default function ServiceForm({ initialData }: ServiceFormProps) {
  const router = useRouter()
  
  // States for custom fields
  const [iconName, setIconName] = useState(initialData?.iconName || 'Building2')
  const [includes, setIncludes] = useState<string[]>(initialData?.includes || [''])

  // Helper: Add a new checklist item
  const addInclude = () => setIncludes([...includes, ''])

  // Helper: Remove a checklist item
  const removeInclude = (index: number) => {
    if (includes.length === 1) {
      setIncludes(['']) // Keep at least one empty box
      return
    }
    setIncludes(includes.filter((_, i) => i !== index))
  }

  // Helper: Update a specific checklist item string
  const updateInclude = (index: number, val: string) => {
    const next = [...includes]
    next[index] = val
    setIncludes(next)
  }

  async function handleSubmit(formData: FormData) {
    const data = {
      id: initialData?.id, // If present, server action will perform an UPDATE
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      iconName: iconName,
      category: formData.get('category') as string,
      price: formData.get('price') as string,
      includes: includes.filter(i => i.trim() !== ''), // Clean up empty entries
    }

    try {
      await upsertService(data)
      toast.success(initialData ? 'Service updated successfully' : 'New service created')
      router.push('/admin/services')
      router.refresh()
    } catch (e) {
      toast.error('Failed to save service. Please try again.')
      console.error(e)
    }
  }

  return (
    <div className="max-w-5xl mx-auto pb-20">
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-8">
        <Link 
          href="/admin/services" 
          className="flex items-center gap-2 text-slate-500 hover:text-[#1d82e6] transition-colors font-medium"
        >
          <ArrowLeft size={20} /> Back to Services
        </Link>
      </div>

      <form action={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Basic Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 space-y-6">
              <h2 className="text-xl font-bold text-slate-800">Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Service Title</label>
                  <input 
                    name="title" 
                    required 
                    defaultValue={initialData?.title}
                    className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-100 focus:border-[#1d82e6] outline-none transition-all" 
                    placeholder="e.g. Commercial Cleaning" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Price / Starting At</label>
                  <input 
                    name="price" 
                    defaultValue={initialData?.price || ''}
                    className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-100 focus:border-[#1d82e6] outline-none transition-all" 
                    placeholder="e.g. $199 or Custom Quote" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Category</label>
                <select 
                  name="category" 
                  defaultValue={initialData?.category || 'Commercial'}
                  className="w-full p-4 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-blue-100 focus:border-[#1d82e6] outline-none transition-all"
                >
                  <option value="Commercial">Commercial</option>
                  <option value="Residential">Residential</option>
                  <option value="Specialty">Specialty</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Short Description</label>
                <textarea 
                  name="description" 
                  required 
                  rows={4} 
                  defaultValue={initialData?.description}
                  className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-100 focus:border-[#1d82e6] outline-none transition-all" 
                  placeholder="Describe the value of this service..." 
                />
              </div>
            </div>

            {/* Checklist Section */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-800">Service Includes</h2>
                <button 
                  type="button" 
                  onClick={addInclude}
                  className="flex items-center gap-1 text-sm font-bold text-[#1d82e6] hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-all"
                >
                  <Plus size={18} /> Add Item
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {includes.map((item, index) => (
                  <div key={index} className="flex gap-2 group">
                    <input 
                      value={item} 
                      onChange={(e) => updateInclude(index, e.target.value)}
                      className="flex-1 p-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:bg-white focus:border-[#1d82e6] outline-none transition-all"
                      placeholder="e.g. Restroom sanitation"
                    />
                    <button 
                      type="button" 
                      onClick={() => removeInclude(index)} 
                      className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Icon Picker & Submit */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
              <IconPicker selected={iconName} onChange={setIconName} />
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#1d82e6] text-white font-extrabold py-5 rounded-[2rem] hover:bg-[#1669ba] shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              <Save size={22} />
              {initialData ? 'Update Service' : 'Publish Service'}
            </button>

            <p className="text-center text-xs text-slate-400 px-4">
              {initialData 
                ? "Changes will be reflected on the live services page immediately." 
                : "This service will appear on the public website once published."}
            </p>
          </div>

        </div>
      </form>
    </div>
  )
}