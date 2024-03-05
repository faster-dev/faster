CREATE TABLE IF NOT EXISTS "clicks" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_id" uuid,
	"date_created" timestamp (6) NOT NULL,
	"phase" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions" (
	"id" uuid PRIMARY KEY NOT NULL,
	"date_created" timestamp NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "clicks" ADD CONSTRAINT "clicks_session_id_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "sessions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
