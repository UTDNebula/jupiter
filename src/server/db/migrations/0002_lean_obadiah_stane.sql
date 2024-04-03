CREATE TABLE IF NOT EXISTS "carousel" (
	"orgId" text NOT NULL,
	"startTime" timestamp with time zone NOT NULL,
	"endTime" timestamp with time zone NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "carousel" ADD CONSTRAINT "carousel_orgId_club_id_fk" FOREIGN KEY ("orgId") REFERENCES "club"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
