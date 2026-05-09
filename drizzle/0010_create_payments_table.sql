CREATE TYPE "public"."payment_status" AS ENUM('pending', 'success', 'failed');--> statement-breakpoint
ALTER TABLE "payments" RENAME COLUMN "status" TO "payment_status";--> statement-breakpoint
ALTER TABLE "capsule" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "capsule" ALTER COLUMN "status" SET DEFAULT 'locked'::text;--> statement-breakpoint
DROP TYPE "public"."status";--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('unlocked', 'locked');--> statement-breakpoint
ALTER TABLE "capsule" ALTER COLUMN "status" SET DEFAULT 'locked'::"public"."status";--> statement-breakpoint
ALTER TABLE "capsule" ALTER COLUMN "status" SET DATA TYPE "public"."status" USING "status"::"public"."status";