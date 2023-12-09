DO $$ BEGIN
 CREATE TYPE "officer_type" AS ENUM('President', 'Officer');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "officer_data" (
	"officer_type" "officer_type",
	"title" text DEFAULT 'Officer',
	"user_id" text,
	"club_id" text,
	CONSTRAINT officer_data_user_id_club_id PRIMARY KEY("user_id","club_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "officer_data" ADD CONSTRAINT "officer_data_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "officer_data" ADD CONSTRAINT "officer_data_club_id_club_id_fk" FOREIGN KEY ("club_id") REFERENCES "club"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
