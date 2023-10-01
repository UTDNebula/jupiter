CREATE TABLE IF NOT EXISTS "user_metadata" (
	"id" text PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"major" text NOT NULL,
	"minor" text NOT NULL,
	"year" "year",
	"role" "role",
	"career" "career"
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_metadata_to_clubs" (
	"user_id" text NOT NULL,
	"club_id" text NOT NULL,
	CONSTRAINT user_metadata_to_clubs_user_id_club_id PRIMARY KEY("user_id","club_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_metadata_to_clubs" ADD CONSTRAINT "user_metadata_to_clubs_user_id_user_metadata_id_fk" FOREIGN KEY ("user_id") REFERENCES "user_metadata"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_metadata_to_clubs" ADD CONSTRAINT "user_metadata_to_clubs_club_id_club_id_fk" FOREIGN KEY ("club_id") REFERENCES "club"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
