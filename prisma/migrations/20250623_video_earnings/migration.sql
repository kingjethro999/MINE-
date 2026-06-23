-- Migration: video watch earnings + boosts rename
-- Run when DB is reachable: npx prisma db push
-- Or: npx prisma migrate dev --name video_earnings

-- Create VideoWatch table
CREATE TABLE IF NOT EXISTS "VideoWatch" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "pexelsVideoId" INTEGER NOT NULL,
    "title" TEXT,
    "amountUsd" DOUBLE PRECISION NOT NULL,
    "boostMultiplier" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "watchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "VideoWatch_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "VideoWatch" ADD CONSTRAINT "VideoWatch_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Add boostMultiplier to PlaySession if missing
ALTER TABLE "PlaySession" ADD COLUMN IF NOT EXISTS "boostMultiplier" DOUBLE PRECISION NOT NULL DEFAULT 1;

-- Add BOOST_UPGRADE to PaymentType enum (if not exists)
DO $$ BEGIN
    ALTER TYPE "PaymentType" ADD VALUE IF NOT EXISTS 'BOOST_UPGRADE';
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Drop mining-related columns/tables if desired (optional, commented out)
-- DROP TABLE IF EXISTS "MiningSession";
-- ALTER TABLE "User" DROP COLUMN IF EXISTS "lastStakingSync";
