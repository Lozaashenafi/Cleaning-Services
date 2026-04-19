import { db } from '@/db';
import { contactSubmissions } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { SubmissionsListClient } from '@/components/site/SubmissionsListClient';

export default async function AdminSubmissionsPage() {
  // Fetch all messages, newest at the top
  const submissions = await db
    .select()
    .from(contactSubmissions)
    .orderBy(desc(contactSubmissions.createdAt));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Inquiries & Quotes</h1>
        <p className="text-slate-500 mt-1">Manage incoming requests from the SparkClean website.</p>
      </div>

      {submissions.length === 0 ? (
        <div className="bg-white rounded-[2rem] p-20 text-center border border-slate-100">
          <p className="text-slate-400 font-medium">No quote requests found yet.</p>
        </div>
      ) : (
        <SubmissionsListClient initialData={submissions} />
      )}
    </div>
  );
}