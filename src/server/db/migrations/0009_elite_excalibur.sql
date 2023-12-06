DO $$ BEGIN
 CREATE TYPE "member_type" AS ENUM('President', 'Officer', 'Member');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DROP TABLE "officer_data";--> statement-breakpoint
ALTER TABLE "user_metadata_to_clubs" ADD COLUMN "member_type" "member_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "user_metadata_to_clubs" ADD COLUMN "title" text;