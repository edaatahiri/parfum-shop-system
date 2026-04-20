-- CreateTable
CREATE TABLE `Mostrat` (
    `mostre_id` INTEGER NOT NULL AUTO_INCREMENT,
    `sasia_stok` INTEGER NOT NULL,
    `volumi_ml` INTEGER NOT NULL,
    `statusi` VARCHAR(191) NOT NULL,
    `parfum_id` INTEGER NOT NULL,

    PRIMARY KEY (`mostre_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Mostrat` ADD CONSTRAINT `Mostrat_parfum_id_fkey` FOREIGN KEY (`parfum_id`) REFERENCES `Parfum`(`parfum_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
