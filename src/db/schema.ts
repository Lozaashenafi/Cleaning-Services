import { 
  pgTable, 
  uuid, 
  text, 
  timestamp, 
  integer, 
  boolean, 
  pgEnum, 
  unique,
  check
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// --- Enums ---
export const appRoleEnum = pgEnum('app_role', ['admin', 'user']);
export const submissionStatusEnum = pgEnum('submission_status', [
  'new', 'contacted', 'quoted', 'booked', 'completed', 'cancelled'
]);

// User Roles / Profiles Table
// If using Supabase, 'id' should be the user's UID from auth.users
export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey(), // This matches the Supabase auth.users ID
  email: text('email').notNull().unique(),
  role: appRoleEnum('role').notNull().default('user'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

// Services Table
export const services = pgTable('services', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  iconName: text('icon_name').notNull().default('Building2'),
  category: text('category'),
  // Array of strings
  includes: text('includes').array().notNull().default(sql`'{}'::text[]`),
  price: text('price'),
  sortOrder: integer('sort_order').default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

// Testimonials Table
export const testimonials = pgTable('testimonials', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  role: text('role').notNull(),
  text: text('text').notNull(),
  rating: integer('rating').notNull().default(5),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (t) => ({
  ratingCheck: check('rating_check', sql`${t.rating} >= 1 AND ${t.rating} <= 5`),
}));

// Contact Submissions Table
export const contactSubmissions = pgTable('contact_submissions', {
  id: uuid('id').primaryKey().defaultRandom(),
  fullName: text('full_name').notNull(),
  phone: text('phone').notNull(),
  email: text('email').notNull(),
  location: text('location').notNull(),
  cleaningType: text('cleaning_type').notNull(),
  size: text('size'),
  preferredDate: timestamp('preferred_date', { withTimezone: true }),
  frequency: text('frequency'),
  budget: text('budget'),
  notes: text('notes'),
  status: submissionStatusEnum('status').notNull().default('new'), // Used Enum instead of Check
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

// Packages Table
export const packages = pgTable('packages', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  price: text('price').notNull(),
  features: text('features').array().notNull().default(sql`'{}'::text[]`),
  popular: boolean('popular').default(false),
  sortOrder: integer('sort_order').default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const gallery = pgTable('gallery', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  category: text('category').notNull(), // Added this
  imageUrl: text('image_url').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const companyConfigs = pgTable('company_configs', {
  id: integer('id').primaryKey().default(1), // Always ID 1
  name: text('name').notNull().default('SparkClean'),
  mission: text('mission'),
  story: text('story'),
  values: text('values').array().notNull().default(sql`'{}'::text[]`),
  
  // Contact Info
  phone: text('phone').default('(123) 456-7890'),
  email: text('email').default('hello@sparkclean.com'),
  address: text('address').default('123 Clean Street, Suite 100, New York, NY 10001'),
  workingHours: text('working_hours').default('Mon–Sat: 7am – 8pm'),
  
  // Social Media
  facebookUrl: text('facebook_url'),
  instagramUrl: text('instagram_url'),
  tiktokUrl: text('tiktok_url'),
  twitterUrl: text('twitter_url'),
  
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});