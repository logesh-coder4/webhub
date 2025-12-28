/*
  Warnings:

  - You are about to alter the column `progress` on the `otherprojects` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `otherprojects` MODIFY `progress` DOUBLE NOT NULL DEFAULT 0;
