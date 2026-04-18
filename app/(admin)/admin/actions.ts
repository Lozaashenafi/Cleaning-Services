'use server'

import { db } from '@/db'
import { services, testimonials, packages, contactSubmissions } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

// --- SERVICES CRUD ---
export async function deleteService(id: string) {
  await db.delete(services).where(eq(services.id, id))
  revalidatePath('/admin/services')
}

export async function upsertService(data: any) {
  if (data.id) {
    await db.update(services).set(data).where(eq(services.id, data.id))
  } else {
    await db.insert(services).values(data)
  }
  revalidatePath('/admin/services')
}

// --- SUBMISSIONS CRUD (Update Status) ---
export async function updateSubmissionStatus(id: string, status: any) {
  await db.update(contactSubmissions).set({ status }).where(eq(contactSubmissions.id, id))
  revalidatePath('/admin/submissions')
}

// --- TESTIMONIALS CRUD ---
export async function deleteTestimonial(id: string) {
  await db.delete(testimonials).where(eq(testimonials.id, id))
  revalidatePath('/admin/testimonials')
}