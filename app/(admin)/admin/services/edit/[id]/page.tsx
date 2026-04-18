import { db } from '@/db'
import { services } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import ServiceForm from '@/components/admin/ServiceForm'

// 1. In Next.js 15, params is a Promise
export default async function EditServicePage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  
  // 2. You MUST await params before using the ID
  const resolvedParams = await params;
  const id = resolvedParams.id;

  // 3. Now the query will work because 'id' is defined
  const service = await db.query.services.findFirst({
    where: eq(services.id, id)
  })

  if (!service) {
    notFound()
  }

  return (
    <div className="p-4 lg:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Edit Service</h1>
        <p className="text-slate-500">Update the details for "{service.title}"</p>
      </div>

      <ServiceForm initialData={service} />
    </div>
  )
}