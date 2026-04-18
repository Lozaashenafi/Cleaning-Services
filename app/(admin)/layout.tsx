import Sidebar from '@/components/admin/Sidebar'
import { createClient } from '@/utils/supabase/server'
import { db } from '@/db'
import { profiles } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.id, user.id)
  })

  if (profile?.role !== 'admin') redirect('/')

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 p-4 lg:p-10 w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  )
}