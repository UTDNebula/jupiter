CREATE TABLE IF NOT EXISTS "admin" (
	"userId" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "admin" ADD CONSTRAINT "admin_userId_user_metadata_id_fk" FOREIGN KEY ("userId") REFERENCES "user_metadata"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
