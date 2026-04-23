-- CreateTable
CREATE TABLE `Klientet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `emri` VARCHAR(191) NOT NULL,
    `mbiemri` VARCHAR(191) NOT NULL,
    `telefoni` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `data_lindjes` DATETIME(3) NOT NULL,
    `gjinia` VARCHAR(191) NOT NULL,
    `adresa` VARCHAR(191) NOT NULL,
    `data_regjistrimit` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `piket_besnikerise` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `Klientet_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
