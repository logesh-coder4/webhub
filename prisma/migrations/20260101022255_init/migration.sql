-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `joinedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isSuperUser` BOOLEAN NOT NULL DEFAULT false,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `isAdmin` BOOLEAN NOT NULL DEFAULT false,
    `profession` ENUM('student', 'developer', 'freelancer', 'entrapaneour', 'other') NOT NULL DEFAULT 'other',

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Testimonials` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `message` TEXT NOT NULL,
    `userId` INTEGER NOT NULL,
    `ratings` VARCHAR(191) NOT NULL DEFAULT '0',
    `isApproved` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WebProjects` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `model` VARCHAR(191) NOT NULL DEFAULT 'web',
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `userId` INTEGER NOT NULL,
    `projectType` ENUM('Ecommerce', 'Portfolio', 'OTT', 'Others') NOT NULL DEFAULT 'Others',
    `frontendTech` ENUM('Random', 'HTML', 'React', 'NextJs') NULL,
    `backendTech` ENUM('Random', 'Django', 'FastApi', 'Flask', 'Express', 'NextJs') NULL,
    `database` ENUM('Random', 'MySql', 'Postgress', 'MongoDB') NULL,
    `language` ENUM('Python', 'JavaScript', 'TypeScript') NULL,
    `service` ENUM('frontend', 'backend', 'fullstack', 'mobileapp', 'utils', 'api', 'testcase') NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isVerified` BOOLEAN NOT NULL DEFAULT false,
    `price` DOUBLE NOT NULL DEFAULT 0.0,
    `status` ENUM('upcoming', 'ongoing', 'completed') NOT NULL DEFAULT 'upcoming',
    `timeTaken` INTEGER NOT NULL DEFAULT 0,
    `secreatKey` VARCHAR(191) NULL,

    UNIQUE INDEX `WebProjects_secreatKey_key`(`secreatKey`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OtherProjects` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `technology` VARCHAR(191) NULL,
    `domain` ENUM('Frontend', 'Backend', 'FullStack', 'Other') NULL,
    `projectName` VARCHAR(191) NULL,
    `model` VARCHAR(191) NOT NULL DEFAULT 'others',
    `projectType` ENUM('Ecommerce', 'Portfolio', 'OTT', 'Others') NULL DEFAULT 'Others',
    `TaskType` VARCHAR(191) NULL,
    `service` ENUM('mentorship', 'learner', 'supporter', 'worker', 'collab') NULL,
    `description` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isVerified` BOOLEAN NOT NULL DEFAULT false,
    `userId` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL DEFAULT 0.0,
    `timeTaken` INTEGER NOT NULL DEFAULT 0,
    `secreatKey` VARCHAR(191) NULL,
    `progress` DOUBLE NOT NULL DEFAULT 0,

    UNIQUE INDEX `OtherProjects_secreatKey_key`(`secreatKey`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Blog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NULL,
    `description` TEXT NOT NULL,
    `isPublished` BOOLEAN NOT NULL DEFAULT false,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Message` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `text` VARCHAR(191) NOT NULL,
    `senderId` INTEGER NOT NULL,
    `webProjectKey` VARCHAR(191) NULL,
    `otherProjectKey` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NULL,
    `message` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `isRead` BOOLEAN NOT NULL DEFAULT false,
    `type` ENUM('request', 'update', 'change') NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Testimonials` ADD CONSTRAINT `Testimonials_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WebProjects` ADD CONSTRAINT `WebProjects_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OtherProjects` ADD CONSTRAINT `OtherProjects_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Blog` ADD CONSTRAINT `Blog_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_webProjectKey_fkey` FOREIGN KEY (`webProjectKey`) REFERENCES `WebProjects`(`secreatKey`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_otherProjectKey_fkey` FOREIGN KEY (`otherProjectKey`) REFERENCES `OtherProjects`(`secreatKey`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
