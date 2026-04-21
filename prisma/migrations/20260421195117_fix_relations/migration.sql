-- CreateTable
CREATE TABLE `Shitjet` (
    `shitje_id` INTEGER NOT NULL AUTO_INCREMENT,
    `klient_id` INTEGER NOT NULL,
    `punetor_id` INTEGER NOT NULL,
    `data_shitjes` DATETIME(3) NOT NULL,
    `shuma_totale` DOUBLE NOT NULL,
    `zbritja` DOUBLE NOT NULL,
    `metoda_pageses` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`shitje_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Detajet_Shitjes` (
    `detal_id` INTEGER NOT NULL AUTO_INCREMENT,
    `shitje_id` INTEGER NOT NULL,
    `parfum_id` INTEGER NOT NULL,
    `sasia` INTEGER NOT NULL,
    `cmimi_njesi` DOUBLE NOT NULL,
    `cmimi_total` DOUBLE NOT NULL,

    PRIMARY KEY (`detal_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Porosite_Furnitoreve` (
    `porosi_id` INTEGER NOT NULL AUTO_INCREMENT,
    `furnitor_id` INTEGER NOT NULL,
    `data_porosise` DATETIME(3) NOT NULL,
    `shuma_totale` DOUBLE NOT NULL,
    `statusi` VARCHAR(191) NOT NULL,
    `data_pranimit` DATETIME(3) NULL,

    PRIMARY KEY (`porosi_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Detajet_Porosise_Furnitorit` (
    `detal_id` INTEGER NOT NULL AUTO_INCREMENT,
    `porosi_id` INTEGER NOT NULL,
    `parfum_id` INTEGER NOT NULL,
    `sasia` INTEGER NOT NULL,
    `cmimi_njesi` DOUBLE NOT NULL,
    `cmimi_total` DOUBLE NOT NULL,

    PRIMARY KEY (`detal_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Shitjet` ADD CONSTRAINT `Shitjet_klient_id_fkey` FOREIGN KEY (`klient_id`) REFERENCES `Klientet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Shitjet` ADD CONSTRAINT `Shitjet_punetor_id_fkey` FOREIGN KEY (`punetor_id`) REFERENCES `Punetoret`(`punetor_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Detajet_Shitjes` ADD CONSTRAINT `Detajet_Shitjes_shitje_id_fkey` FOREIGN KEY (`shitje_id`) REFERENCES `Shitjet`(`shitje_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Detajet_Shitjes` ADD CONSTRAINT `Detajet_Shitjes_parfum_id_fkey` FOREIGN KEY (`parfum_id`) REFERENCES `Parfum`(`parfum_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Porosite_Furnitoreve` ADD CONSTRAINT `Porosite_Furnitoreve_furnitor_id_fkey` FOREIGN KEY (`furnitor_id`) REFERENCES `Furnitoret`(`furnitor_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Detajet_Porosise_Furnitorit` ADD CONSTRAINT `Detajet_Porosise_Furnitorit_porosi_id_fkey` FOREIGN KEY (`porosi_id`) REFERENCES `Porosite_Furnitoreve`(`porosi_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Detajet_Porosise_Furnitorit` ADD CONSTRAINT `Detajet_Porosise_Furnitorit_parfum_id_fkey` FOREIGN KEY (`parfum_id`) REFERENCES `Parfum`(`parfum_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
