ALTER TABLE "user_metadata_to_clubs" DROP CONSTRAINT "user_metadata_to_clubs_user_id_user_metadata_id_fk";
--> statement-breakpoint
ALTER TABLE "user_metadata" ALTER COLUMN "year" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user_metadata" ALTER COLUMN "role" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_metadata_to_clubs" ADD CONSTRAINT "user_metadata_to_clubs_user_id_user_metadata_id_fk" FOREIGN KEY ("user_id") REFERENCES "user_metadata"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
