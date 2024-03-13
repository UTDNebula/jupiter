DO $$ BEGIN
 CREATE TYPE "approved_enum" AS ENUM('approved', 'rejected', 'pending');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "club" ADD COLUMN "approved" "approved_enum" DEFAULT 'pending' NOT NULL;