import { db } from '@/db';
import { packages } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import PackageForm from '@/components/admin/PackageForm';

export default async function EditPackagePage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // 1. Await params for Next.js 15
  const { id } = await params;

  // 2. Fetch the package
  const data = await db.query.packages.findFirst({
    where: eq(packages.id, id)
  });

  // 3. Handle 404
  if (!data) {
    notFound();
  }

  return (
    <div className="p-4 lg:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Edit Package</h1>
        <p className="text-slate-500">Updating details for "{data.name}"</p>
      </div>

      {/* Pass the data to the form */}
      <PackageForm initialData={data} />
    </div>
  );
}