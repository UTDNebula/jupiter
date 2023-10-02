ALTER TABLE "contacts" RENAME COLUMN "clubId" TO "club_id";--> statement-breakpoint
ALTER TABLE "contacts" DROP CONSTRAINT "contacts_platform_clubId";--> statement-breakpoint
ALTER TABLE "contacts" DROP CONSTRAINT "contacts_clubId_club_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contacts" ADD CONSTRAINT "contacts_club_id_club_id_fk" FOREIGN KEY ("club_id") REFERENCES "club"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_platform_club_id" PRIMARY KEY("platform","club_id");