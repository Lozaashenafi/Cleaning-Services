import { db } from '@/db'
import { packages } from '@/db/schema'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { PackageListClient } from '@/components/admin/PackageListClient'

export default async function AdminPackages() {
  const all = await db.select().from(packages).orderBy(packages.sortOrder)
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Pricing Packages</h1>
        <Link href="/admin/packages/new" className="bg-[#1d82e6] text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-bold shadow-lg shadow-blue-100">
          <Plus size={18} /> New Package
        </Link>
      </div>
      <PackageListClient initialData={all} />
    </div>
  )
}