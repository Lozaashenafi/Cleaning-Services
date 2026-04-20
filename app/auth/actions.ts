'use server'

import { createClient } from '@/utils/supabase/server'
import { db } from '@/db'
import { profiles } from '@/db/schema'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    // We send the specific error message (e.g., "Invalid login credentials")
    return redirect(`/login?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/', 'layout')
  redirect('/admin');
}
export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    return redirect(`/login?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/', 'layout')
  
  // Redirect to home page with a welcome message
  return redirect('/?message=Welcome to Covenant clean co! Your account is ready.')
}