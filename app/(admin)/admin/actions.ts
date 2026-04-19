'use server'

import { db } from '@/db'
import { services, testimonials, packages, contactSubmissions, companyConfigs } from '@/db/schema'
import { createClient } from '@/utils/supabase/server'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { gallery } from '@/db/schema';

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


export async function deleteGalleryItem(id: string, imagePath: string) {
  const supabase = await createClient();
  
  // 1. Delete from Storage
  const path = imagePath.split('/').pop(); // Extract file name from URL
  if (path) {
    await supabase.storage.from('gallery').remove([path]);
  }

  // 2. Delete from DB
  await db.delete(gallery).where(eq(gallery.id, id));
  revalidatePath('/admin/gallery');
}
export async function uploadToGallery(formData: FormData) {
  const supabase = await createClient();
  const file = formData.get('image') as File;
  const title = formData.get('title') as string;
  const category = formData.get('category') as string; // Change from description to category

  if (!file) throw new Error('No image provided');

  const fileName = `${Date.now()}-${file.name}`;
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('gallery')
    .upload(fileName, file);

  if (uploadError) throw uploadError;

  const { data: { publicUrl } } = supabase.storage
    .from('gallery')
    .getPublicUrl(uploadData.path);

  await db.insert(gallery).values({
    title,
    category,
    imageUrl: publicUrl,
  });

  revalidatePath('/admin/gallery');
}

// --- TESTIMONIALS ---
export async function upsertTestimonial(data: any) {
  if (data.id) {
    await db.update(testimonials).set(data).where(eq(testimonials.id, data.id));
  } else {
    await db.insert(testimonials).values(data);
  }
  revalidatePath('/admin/testimonials');
}

export async function deleteTestimonial(id: string) {
  await db.delete(testimonials).where(eq(testimonials.id, id));
  revalidatePath('/admin/testimonials');
}

// --- SUBMISSIONS ---
export async function updateSubmissionStatus(id: string, status: any) {
  await db.update(contactSubmissions).set({ status }).where(eq(contactSubmissions.id, id))
  revalidatePath('/admin/submissions')
}

export async function deleteSubmission(id: string) {
  await db.delete(contactSubmissions).where(eq(contactSubmissions.id, id))
  revalidatePath('/admin/submissions')
}

export async function updateCompanyConfigs(data: any) {
  // We always update row ID 1
  await db.update(companyConfigs)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(companyConfigs.id, 1));
    
  revalidatePath('/', 'layout'); // Refresh the whole site
  revalidatePath('/admin/settings');
}

export async function upsertPackage(data: any) {
  if (data.id) {
    // If ID exists, Update
    await db.update(packages)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(packages.id, data.id));
  } else {
    // If no ID, Insert
    await db.insert(packages).values(data);
  }
  
  // Refresh the data on the website
  revalidatePath('/admin/packages');
  revalidatePath('/', 'layout'); 
}

export async function deletePackage(id: string) {
  await db.delete(packages).where(eq(packages.id, id));
  
  revalidatePath('/admin/packages');
  revalidatePath('/', 'layout');
}

export async function submitContactForm(formData: FormData) {
  const data = {
    fullName: formData.get("name") as string,
    phone: formData.get("phone") as string,
    email: formData.get("email") as string,
    location: formData.get("location") as string,
    cleaningType: formData.get("type") as string,
    size: formData.get("size") as string || null,
    preferredDate: formData.get("date") ? new Date(formData.get("date") as string) : null,
    frequency: formData.get("frequency") as string || null,
    budget: formData.get("budget") as string || null,
    notes: formData.get("notes") as string || null,
  };

  await db.insert(contactSubmissions).values(data);
  revalidatePath('/admin/submissions');
}