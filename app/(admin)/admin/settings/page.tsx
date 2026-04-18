import { db } from '@/db';
import { companyConfigs } from '@/db/schema';
import { eq } from 'drizzle-orm';
import CompanyForm from '@/components/admin/CompanyForm';

export default async function SettingsPage() {
  const config = await db.query.companyConfigs.findFirst({
    where: eq(companyConfigs.id, 1)
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Company Settings</h1>
      <p className="text-slate-500">Manage your contact details, social links, and brand story.</p>
      
      <CompanyForm initialData={config} />
    </div>
  );
}