CREATE TABLE IF NOT EXISTS "user_metadata_to_events" (
	"user_id" text NOT NULL,
	"event_id" text NOT NULL,
	CONSTRAINT user_metadata_to_events_user_id_event_id PRIMARY KEY("user_id","event_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_metadata_to_events" ADD CONSTRAINT "user_metadata_to_events_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_metadata_to_events" ADD CONSTRAINT "user_metadata_to_events_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
