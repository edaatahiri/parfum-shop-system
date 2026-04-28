-- CreateTable
CREATE TABLE `Ofertat_Parfumit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `oferte_id` INTEGER NOT NULL,
    `parfum_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Ofertat_Parfumit` ADD CONSTRAINT `Ofertat_Parfumit_oferte_id_fkey` FOREIGN KEY (`oferte_id`) REFERENCES `Ofertat`(`oferte_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ofertat_Parfumit` ADD CONSTRAINT `Ofertat_Parfumit_parfum_id_fkey` FOREIGN KEY (`parfum_id`) REFERENCES `Parfum`(`parfum_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
