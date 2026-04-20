import { db } from '@/db';
import { profiles } from '@/db/schema';
import { createClient } from '@/utils/supabase/server';
import AdminUsersClient from '@/components/admin/AdminUsersClient';

export default async function AdminUsersPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch users from the database on the server
  const allUsers = await db.select().from(profiles).orderBy(profiles.email);

  return (
    <AdminUsersClient 
      initialUsers={allUsers} 
      currentAdminId={user?.id || ''} 
    />
  );
}