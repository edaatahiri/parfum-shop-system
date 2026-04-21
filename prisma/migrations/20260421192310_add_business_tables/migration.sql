-- CreateTable
CREATE TABLE `Punetoret` (
    `punetor_id` INTEGER NOT NULL AUTO_INCREMENT,
    `emri` VARCHAR(191) NOT NULL,
    `mbiemri` VARCHAR(191) NOT NULL,
    `pozita` VARCHAR(191) NOT NULL,
    `telefoni` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `data_punesimit` DATETIME(3) NOT NULL,
    `paga` DOUBLE NOT NULL,

    PRIMARY KEY (`punetor_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Furnitoret` (
    `furnitor_id` INTEGER NOT NULL AUTO_INCREMENT,
    `emri` VARCHAR(191) NOT NULL,
    `personi_kontaktit` VARCHAR(191) NOT NULL,
    `telefoni` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `adresa` VARCHAR(191) NOT NULL,
    `shteti` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`furnitor_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
