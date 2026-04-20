CREATE TABLE "company_configs" (
	"id" integer PRIMARY KEY DEFAULT 1 NOT NULL,
	"name" text DEFAULT 'Covenant clean co' NOT NULL,
	"mission" text,
	"story" text,
	"values" text[] DEFAULT '{}'::text[] NOT NULL,
	"phone" text DEFAULT '(123) 456-7890',
	"email" text DEFAULT 'hello@Covenant clean co.com',
	"address" text DEFAULT '123 Clean Street, Suite 100, New York, NY 10001',
	"working_hours" text DEFAULT 'Mon–Sat: 7am – 8pm',
	"facebook_url" text,
	"instagram_url" text,
	"tiktok_url" text,
	"twitter_url" text,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
