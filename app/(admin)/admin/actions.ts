'use server'

import { db } from '@/db'
import { services, testimonials, packages, contactSubmissions, companyConfigs, profiles } from '@/db/schema'
import { createClient } from '@/utils/supabase/server'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { gallery } from '@/db/schema';
import { supabaseAdmin } from '@/utils/supabase/admin'

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

export async function updateCompanyConfigs(data: any) {
  try {
    const formattedData = {
      ...data,
    };

    await db.update(companyConfigs)
      .set({
        ...formattedData,
        updatedAt: new Date()
      })
      .where(eq(companyConfigs.id, 1));

    // 3. This is crucial! It tells Next.js to fetch the fresh data
    revalidatePath('/', 'layout');
    revalidatePath('/admin/settings');
    
    return { success: true };
  } catch (error) {
    console.error("Update Error:", error);
    throw new Error("Failed to update");
  }
}



export async function updateUserRole(userId: string, newRole: 'admin' | 'user') {
  await db.update(profiles)
    .set({ role: newRole })
    .where(eq(profiles.id, userId));
  
  revalidatePath('/admin/users');
}

export async function createNewAdmin(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const role = formData.get('role') as 'admin' | 'user';

  // 1. Create the user in Supabase Auth
  const { data, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email: email,
    password: password,
    email_confirm: true, 
    user_metadata: { role: role }
  });

  if (authError) {
    console.error("Auth Creation Error:", authError.message);
    throw new Error(authError.message);
  }

  // 2. Manually ensure the profile exists in our Drizzle 'profiles' table
  // This acts as a backup in case the SQL trigger is slow or missing.
  if (data.user) {
    try {
      await db.insert(profiles)
        .values({
          id: data.user.id,
          email: email,
          role: role,
        })
        .onConflictDoUpdate({
          target: profiles.id,
          set: { role: role }
        });
        
      console.log("✅ Profile synced for:", email);
    } catch (dbError) {
      console.error("Database Sync Error:", dbError);
      // We don't throw here because the user WAS created in Auth, 
      // but we want to know why the DB failed.
    }
  }

  revalidatePath('/admin/users');
}
// --- DELETE USER ACCOUNT ---
export async function deleteUserAccount(userId: string) {
  // 1. Delete from Supabase Auth
  const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);
  
  if (error) {
    console.error("Auth Delete Error:", error);
    throw new Error("Could not delete from Auth system");
  }

  // 2. Delete from Drizzle Profiles
  await db.delete(profiles).where(eq(profiles.id, userId));

  revalidatePath('/admin/users');
}

export async function updateUserPassword(userId: string, formData: FormData) {
  const newPassword = formData.get('password') as string;

  if (!newPassword || newPassword.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

  // Use the admin client to force update the password
  const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
    password: newPassword
  });

  if (error) {
    console.error("Password Update Error:", error.message);
    throw new Error(error.message);
  }

  revalidatePath('/admin/users');
}