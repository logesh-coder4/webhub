-- AlterTable
ALTER TABLE `user` ADD COLUMN `profession` ENUM('student', 'developer', 'freelancer', 'entrapaneour', 'other') NOT NULL DEFAULT 'other';
