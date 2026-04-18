import { db } from '@/db'
import { services } from '@/db/schema'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { ServiceTableClient } from '@/components/admin/ServiceTableClient'

export default async function AdminServices() {
  const allServices = await db.select().from(services)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Services</h1>
        <Link href="/admin/services/new" className="bg-[#1d82e6] text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold shadow-sm hover:bg-[#1669ba] transition-all">
          <Plus size={18} /> Add New
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Pass data to the Client Component for interaction */}
        <ServiceTableClient initialServices={allServices} />
      </div>
    </div>
  )
}