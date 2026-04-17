CREATE TYPE "public"."app_role" AS ENUM('admin', 'user');--> statement-breakpoint
CREATE TYPE "public"."submission_status" AS ENUM('new', 'contacted', 'quoted', 'booked', 'completed', 'cancelled');--> statement-breakpoint
CREATE TABLE "contact_submissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" text NOT NULL,
	"phone" text NOT NULL,
	"email" text NOT NULL,
	"location" text NOT NULL,
	"cleaning_type" text NOT NULL,
	"size" text,
	"preferred_date" timestamp with time zone,
	"frequency" text,
	"budget" text,
	"notes" text,
	"status" "submission_status" DEFAULT 'new' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "packages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"price" text NOT NULL,
	"features" text[] DEFAULT '{}'::text[] NOT NULL,
	"popular" boolean DEFAULT false,
	"sort_order" integer DEFAULT 0,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"role" "app_role" DEFAULT 'user' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "profiles_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"icon_name" text DEFAULT 'Building2' NOT NULL,
	"category" text,
	"includes" text[] DEFAULT '{}'::text[] NOT NULL,
	"price" text,
	"sort_order" integer DEFAULT 0,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "testimonials" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"role" text NOT NULL,
	"text" text NOT NULL,
	"rating" integer DEFAULT 5 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "rating_check" CHECK ("testimonials"."rating" >= 1 AND "testimonials"."rating" <= 5)
);
