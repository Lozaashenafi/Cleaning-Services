import { db } from '@/db'
import { testimonials } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import TestimonialForm from '@/components/admin/TestimonialForm'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const data = await db.query.testimonials.findFirst({ where: eq(testimonials.id, id) })
  if (!data) notFound()
  return <div className="p-10"><TestimonialForm initialData={data} /></div>
}