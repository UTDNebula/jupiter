DO $$ BEGIN
 CREATE TYPE "career" AS ENUM('Healthcare', 'Art and Music', 'Engineering', 'Business', 'Sciences', 'Public Service');
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
 CREATE TYPE "year" AS ENUM('Freshman', 'Sophomore', 'Junior', 'Senior');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "user_metadata" ALTER COLUMN "year" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user_metadata" ALTER COLUMN "role" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user_metadata" ALTER COLUMN "career" SET NOT NULL;