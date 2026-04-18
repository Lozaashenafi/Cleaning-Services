'use client'

import { useState } from 'react'
import { Star, Edit, Trash2, Quote, AlertCircle } from 'lucide-react'
import { deleteTestimonial } from '../../../app/(admin)/admin/actions'
import { toast } from 'sonner'
import Link from 'next/link'

export function TestimonialListClient({ initialData }: { initialData: any[] }) {
  const [list, setList] = useState(initialData)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  async function handleDelete() {
    if (!isDeleting) return
    const id = isDeleting
    setIsDeleting(null)
    
    try {
      await deleteTestimonial(id)
      setList(list.filter(t => t.id !== id))
      toast.success('Testimonial removed')
    } catch {
      toast.error('Failed to delete')
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {list.map((t) => (
          <div key={t.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm relative group">
            <Quote className="absolute top-6 right-6 text-slate-100 w-12 h-12 -z-0" />
            <div className="relative z-10">
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400" fill="currentColor" />
                ))}
              </div>
              <p className="text-slate-600 italic mb-6 leading-relaxed">"{t.text}"</p>
              <div className="flex justify-between items-end">
                <div>
                  <h4 className="font-bold text-slate-800">{t.name}</h4>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link href={`/admin/testimonials/edit/${t.id}`} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                    <Edit size={18} />
                  </Link>
                  <button onClick={() => setIsDeleting(t.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isDeleting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center gap-3 text-red-600 mb-4">
              <AlertCircle size={24} />
              <h3 className="text-lg font-bold">Delete Testimonial?</h3>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setIsDeleting(null)} className="flex-1 py-2 border rounded-xl font-semibold">Cancel</button>
              <button onClick={handleDelete} className="flex-1 py-2 bg-red-600 text-white rounded-xl font-semibold">Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}