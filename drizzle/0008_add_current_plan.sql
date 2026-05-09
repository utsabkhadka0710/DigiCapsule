CREATE TYPE "public"."current_plan" AS ENUM('free', 'basic', 'premium');--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "current_plan" "current_plan" DEFAULT 'free' NOT NULL;