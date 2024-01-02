DO $$ BEGIN
 CREATE TYPE "career" AS ENUM('Healthcare', 'Art and Music', 'Engineering', 'Business', 'Sciences', 'Public Service');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "member_type" AS ENUM('President', 'Officer', 'Member');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('Student', 'Student Organizer', 'Administrator');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "year" AS ENUM('Freshman', 'Sophomore', 'Junior', 'Senior', 'Grad Student');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "club" (
	"id" text PRIMARY KEY DEFAULT nanoid(20) NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"image" text DEFAULT '/nebula-logo.png' NOT NULL,
	"tags" text[] DEFAULT '{}'::text[] NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contacts" (
	"platform" "platform" NOT NULL,
	"url" text NOT NULL,
	"club_id" text NOT NULL,
	CONSTRAINT contacts_platform_club_id PRIMARY KEY("platform","club_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "events" (
	"id" text PRIMARY KEY DEFAULT nanoid(20) NOT NULL,
	"club_id" text NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"start_time" timestamp with time zone NOT NULL,
	"end_time" timestamp with time zone NOT NULL,
	"location" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT account_provider_providerAccountId PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_metadata" (
	"id" text PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"major" text NOT NULL,
	"minor" text,
	"year" "year" NOT NULL,
	"role" "role" NOT NULL,
	"career" "career"
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_metadata_to_clubs" (
	"user_id" text NOT NULL,
	"club_id" text NOT NULL,
	"member_type" "member_type" NOT NULL,
	"title" text,
	CONSTRAINT user_metadata_to_clubs_user_id_club_id PRIMARY KEY("user_id","club_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_metadata_to_events" (
	"user_id" text NOT NULL,
	"event_id" text NOT NULL,
	CONSTRAINT user_metadata_to_events_user_id_event_id PRIMARY KEY("user_id","event_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"emailVerified" timestamp,
	"image" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT verificationToken_identifier_token PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contacts" ADD CONSTRAINT "contacts_club_id_club_id_fk" FOREIGN KEY ("club_id") REFERENCES "club"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "events" ADD CONSTRAINT "events_club_id_club_id_fk" FOREIGN KEY ("club_id") REFERENCES "club"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_metadata_to_clubs" ADD CONSTRAINT "user_metadata_to_clubs_user_id_user_metadata_id_fk" FOREIGN KEY ("user_id") REFERENCES "user_metadata"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_metadata_to_clubs" ADD CONSTRAINT "user_metadata_to_clubs_club_id_club_id_fk" FOREIGN KEY ("club_id") REFERENCES "club"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_metadata_to_events" ADD CONSTRAINT "user_metadata_to_events_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_metadata_to_events" ADD CONSTRAINT "user_metadata_to_events_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
