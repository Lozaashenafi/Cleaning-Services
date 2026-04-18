'use client'

import { useState } from 'react'
import * as Icons from 'lucide-react'
import { Trash2, Edit, AlertCircle, X } from 'lucide-react'
import { deleteService } from '../../../app/(admin)/admin/actions'
import { toast } from 'sonner'
import Link from 'next/link'

export function ServiceTableClient({ initialServices }: { initialServices: any[] }) {
  const [servicesList, setServicesList] = useState(initialServices)
  const [isDeleting, setIsDeleting] = useState<string | null>(null) // Stores ID of service to delete

  async function handleDelete() {
    if (!isDeleting) return
    
    const id = isDeleting
    setIsDeleting(null) // Close modal
    
    const promise = deleteService(id)
    
    toast.promise(promise, {
      loading: 'Deleting service...',
      success: () => {
        setServicesList(prev => prev.filter(s => s.id !== id))
        return 'Service deleted successfully'
      },
      error: 'Failed to delete service'
    })
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Service</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Category</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {servicesList.map((service) => {
              const LucideIcon = (Icons as any)[service.iconName] || Icons.HelpCircle
              return (
                <tr key={service.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-50 text-[#1d82e6] rounded-lg flex items-center justify-center">
                        <LucideIcon size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{service.title}</p>
                        <p className="text-xs text-slate-400">{service.price || 'Custom Quote'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold bg-slate-100 px-2 py-1 rounded text-slate-600">
                      {service.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    {/* Link to Edit Page (Cleaner than a giant modal for complex forms) */}
                    <Link 
                      href={`/admin/services/edit/${service.id}`}
                      className="inline-flex p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                    >
                      <Edit size={18} />
                    </Link>
                    
                    <button 
                      onClick={() => setIsDeleting(service.id)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {isDeleting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-3 text-red-600 mb-4">
              <AlertCircle size={24} />
              <h3 className="text-lg font-bold">Are you sure?</h3>
            </div>
            <p className="text-slate-600 mb-6 text-sm">
              This action cannot be undone. This will permanently delete the service from your database.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setIsDeleting(null)}
                className="flex-1 px-4 py-2 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                className="flex-1 px-4 py-2 rounded-xl bg-red-600 font-semibold text-white hover:bg-red-700 transition-all shadow-lg shadow-red-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}