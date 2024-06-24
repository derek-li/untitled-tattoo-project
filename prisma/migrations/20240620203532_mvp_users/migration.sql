/*
  Warnings:

  - You are about to drop the column `bio` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `is_booking_open` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `pages` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `profile_image_url` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `social_media` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "bio",
DROP COLUMN "is_booking_open",
DROP COLUMN "pages",
DROP COLUMN "password",
DROP COLUMN "profile_image_url",
DROP COLUMN "social_media",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "isBookingOpen" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "profileImageUrl" TEXT;
