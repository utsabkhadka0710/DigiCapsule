CREATE TABLE "payments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"transaction_uuid" text NOT NULL,
	"amount" text NOT NULL,
	"signature" text NOT NULL,
	"status" "status" DEFAULT 'pending' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "payments_transaction_uuid_unique" UNIQUE("transaction_uuid")
);
--> statement-breakpoint
ALTER TABLE "capsule" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "capsule" ALTER COLUMN "status" SET DEFAULT 'locked'::text;--> statement-breakpoint
ALTER TABLE "payments" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "payments" ALTER COLUMN "status" SET DEFAULT 'pending'::text;--> statement-breakpoint
DROP TYPE "public"."status";--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('pending', 'success', 'failed');--> statement-breakpoint
ALTER TABLE "capsule" ALTER COLUMN "status" SET DEFAULT 'locked'::"public"."status";--> statement-breakpoint
ALTER TABLE "capsule" ALTER COLUMN "status" SET DATA TYPE "public"."status" USING "status"::"public"."status";--> statement-breakpoint
ALTER TABLE "payments" ALTER COLUMN "status" SET DEFAULT 'pending'::"public"."status";--> statement-breakpoint
ALTER TABLE "payments" ALTER COLUMN "status" SET DATA TYPE "public"."status" USING "status"::"public"."status";--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "payments_userId_idx" ON "payments" USING btree ("user_id");