'use client'

import { useState } from 'react'
import { Trash2, Edit, AlertCircle, Star } from 'lucide-react'
import { deletePackage } from '../../../app/(admin)/admin/actions'
import { toast } from 'sonner'
import Link from 'next/link'

export function PackageListClient({ initialData }: { initialData: any[] }) {
  const [list, setList] = useState(initialData)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  async function handleDelete() {
    if (!isDeleting) return
    const id = isDeleting
    setIsDeleting(null)
    try {
      await deletePackage(id)
      setList(list.filter(p => p.id !== id))
      toast.success('Package deleted')
    } catch {
      toast.error('Delete failed')
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((p) => (
          <div key={p.id} className={`bg-white p-8 rounded-[2.5rem] border ${p.popular ? 'border-[#1d82e6] ring-4 ring-blue-50' : 'border-slate-100'} shadow-sm relative overflow-hidden group`}>
            {p.popular && (
                <div className="absolute top-0 right-0 bg-[#1d82e6] text-white px-4 py-1 text-[10px] font-bold uppercase rounded-bl-xl flex items-center gap-1">
                    <Star size={10} fill="white" /> Most Popular
                </div>
            )}
            
            <h3 className="text-xl font-bold text-slate-800 mb-1">{p.name}</h3>
            <p className="text-2xl font-black text-[#1d82e6] mb-4">{p.price}</p>
            
            <div className="space-y-2 mb-8">
                {p.features.map((f: string, idx: number) => (
                    <div key={idx} className="text-sm text-slate-500 flex items-start gap-2">
                        <span className="text-[#1d82e6] mt-1">•</span> {f}
                    </div>
                ))}
            </div>

            <div className="flex gap-2 pt-6 border-t border-slate-50">
                <Link href={`/admin/packages/edit/${p.id}`} className="flex-1 bg-slate-50 text-slate-600 py-2.5 rounded-xl font-bold text-center hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 text-sm">
                    <Edit size={16} /> Edit
                </Link>
                <button onClick={() => setIsDeleting(p.id)} className="p-2.5 text-slate-300 hover:text-red-500 transition-colors">
                    <Trash2 size={20} />
                </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal (Same as Testimonials) */}
      {isDeleting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl">
            <h3 className="text-lg font-bold text-slate-800 mb-2">Delete Package?</h3>
            <p className="text-slate-500 text-sm mb-6">This pricing package will be removed from your public website immediately.</p>
            <div className="flex gap-3">
              <button onClick={() => setIsDeleting(null)} className="flex-1 py-3 border rounded-xl font-bold text-slate-500">Cancel</button>
              <button onClick={handleDelete} className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold">Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}