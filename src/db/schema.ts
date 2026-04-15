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

// User Roles Table
export const users =  pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  userId: uuid('user_id').notNull(), 
  role: appRoleEnum('role').notNull(),
}, (t) => ({
  unq: unique().on(t.userId, t.role),
}));

// Services Table
export const services = pgTable('services', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  iconName: text('icon_name').notNull().default('Building2'),
  category: text('category'),
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

// Gallery Table
export const gallery = pgTable('gallery', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  category: text('category').notNull(),
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

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
  status: text('status').notNull().default('new'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (t) => ({
  statusCheck: check('status_check', sql`${t.status} IN ('new', 'contacted', 'quoted', 'booked', 'completed', 'cancelled')`),
}));

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