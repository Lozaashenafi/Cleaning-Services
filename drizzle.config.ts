import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    // PASTE YOUR FULL URL HERE DIRECTLY
    url: "postgres://postgres:Lozaspam%40supabase1@db.vwrhmkcjyfbbelzicrfw.supabase.co:5432/postgres?sslmode=require",
  },
});