/*
  Warnings:

  - You are about to drop the column `isCompleted` on the `WishlistItem` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `WishlistItem` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `WishlistItem` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `WishlistItem` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `WishlistItem` table. All the data in the column will be lost.
  - Added the required column `title` to the `WishlistItem` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WishlistItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "priority" BOOLEAN NOT NULL DEFAULT false,
    "category" TEXT DEFAULT 'Umum'
);
INSERT INTO "new_WishlistItem" ("createdAt", "id") SELECT "createdAt", "id" FROM "WishlistItem";
DROP TABLE "WishlistItem";
ALTER TABLE "new_WishlistItem" RENAME TO "WishlistItem";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
