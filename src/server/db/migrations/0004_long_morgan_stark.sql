ALTER TYPE "year" ADD VALUE 'Grad Student';--> statement-breakpoint
ALTER TABLE "user_metadata" ALTER COLUMN "minor" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "user_metadata" ALTER COLUMN "year" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "user_metadata" ALTER COLUMN "role" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "user_metadata" ALTER COLUMN "career" DROP NOT NULL;