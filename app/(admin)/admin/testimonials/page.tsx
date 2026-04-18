import { db } from '@/db'
import { testimonials } from '@/db/schema'
import { Plus, Quote } from 'lucide-react'
import Link from 'next/link'
import { TestimonialListClient } from '@/components/admin/TestimonialListClient'

export default async function AdminTestimonials() {
  const allTestimonials = await db.select().from(testimonials).orderBy(testimonials.createdAt)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Testimonials</h1>
        <Link href="/admin/testimonials/new" className="bg-[#1d82e6] text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold">
          <Plus size={18} /> Add New
        </Link>
      </div>

      <TestimonialListClient initialData={allTestimonials} />
    </div>
  )
}