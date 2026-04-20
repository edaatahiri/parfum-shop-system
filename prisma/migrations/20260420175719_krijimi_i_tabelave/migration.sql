-- CreateTable
CREATE TABLE `Parfum` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `emri` VARCHAR(191) NOT NULL,
    `brand` VARCHAR(191) NOT NULL,
    `cmimi` DOUBLE NOT NULL,
    `sasia` INTEGER NOT NULL,
    `pershkrimi` VARCHAR(191) NULL,
    `krijuarAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kategoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `emri` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Kategoria_emri_key`(`emri`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
