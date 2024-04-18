CREATE TABLE IF NOT EXISTS "feedback_form" (
	"id" text PRIMARY KEY DEFAULT nanoid(20) NOT NULL,
	"rating" integer NOT NULL,
	"likes" text DEFAULT '',
	"dislikes" text DEFAULT '',
	"features" text DEFAULT '',
	"submit_on" timestamp with time zone NOT NULL
);
