/*
  Warnings:

  - You are about to drop the column `userId` on the `Bookmark` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Upvote` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[roadmapId,sessionId]` on the table `Bookmark` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[roadmapId,sessionId]` on the table `Upvote` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sessionId` to the `Bookmark` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionId` to the `Upvote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_userId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Upvote" DROP CONSTRAINT "Upvote_userId_fkey";

-- AlterTable
ALTER TABLE "Bookmark" DROP COLUMN "userId",
ADD COLUMN     "sessionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "userId",
ADD COLUMN     "sessionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Upvote" DROP COLUMN "userId",
ADD COLUMN     "sessionId" TEXT NOT NULL;

-- DropTable
DROP TABLE "User";

-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_roadmapId_sessionId_key" ON "Bookmark"("roadmapId", "sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "Upvote_roadmapId_sessionId_key" ON "Upvote"("roadmapId", "sessionId");
