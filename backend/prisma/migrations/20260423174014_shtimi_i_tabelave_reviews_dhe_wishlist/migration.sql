-- CreateTable
CREATE TABLE `Reviews` (
    `review_id` INTEGER NOT NULL AUTO_INCREMENT,
    `rating` INTEGER NOT NULL,
    `komenti` TEXT NULL,
    `data` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `klient_id` INTEGER NOT NULL,
    `parfum_id` INTEGER NOT NULL,

    PRIMARY KEY (`review_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Wishlist` (
    `wishlist_id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_shtimit` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `klient_id` INTEGER NOT NULL,
    `parfum_id` INTEGER NOT NULL,

    UNIQUE INDEX `Wishlist_klient_id_parfum_id_key`(`klient_id`, `parfum_id`),
    PRIMARY KEY (`wishlist_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Reviews` ADD CONSTRAINT `Reviews_klient_id_fkey` FOREIGN KEY (`klient_id`) REFERENCES `Klientet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reviews` ADD CONSTRAINT `Reviews_parfum_id_fkey` FOREIGN KEY (`parfum_id`) REFERENCES `Parfum`(`parfum_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Wishlist` ADD CONSTRAINT `Wishlist_klient_id_fkey` FOREIGN KEY (`klient_id`) REFERENCES `Klientet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Wishlist` ADD CONSTRAINT `Wishlist_parfum_id_fkey` FOREIGN KEY (`parfum_id`) REFERENCES `Parfum`(`parfum_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
