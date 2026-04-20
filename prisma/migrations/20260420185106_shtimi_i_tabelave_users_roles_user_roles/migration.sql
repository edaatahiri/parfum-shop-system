-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `emri` VARCHAR(191) NOT NULL,
    `mbiemri` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password_hash` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(191) NULL,
    `email_confirmed` BOOLEAN NOT NULL DEFAULT false,
    `lockout_enabled` BOOLEAN NOT NULL DEFAULT true,
    `access_failed_count` INTEGER NOT NULL DEFAULT 0,
    `data_krijimit` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `statusi` VARCHAR(191) NOT NULL DEFAULT 'Active',

    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `emertimi` VARCHAR(191) NOT NULL,
    `pershkrimi` VARCHAR(191) NULL,
    `normalized_name` VARCHAR(191) NULL,

    UNIQUE INDEX `Roles_emertimi_key`(`emertimi`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserRoles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `role_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserRoles` ADD CONSTRAINT `UserRoles_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRoles` ADD CONSTRAINT `UserRoles_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `Roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
