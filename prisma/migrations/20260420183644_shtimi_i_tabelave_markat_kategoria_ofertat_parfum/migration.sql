/*
  Warnings:

  - The primary key for the `kategoria` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `kategoria` table. All the data in the column will be lost.
  - The primary key for the `parfum` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `brand` on the `parfum` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `parfum` table. All the data in the column will be lost.
  - You are about to drop the column `krijuarAt` on the `parfum` table. All the data in the column will be lost.
  - You are about to drop the column `sasia` on the `parfum` table. All the data in the column will be lost.
  - Added the required column `kategori_id` to the `Kategoria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gjinia_target` to the `Parfum` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kategoria_id` to the `Parfum` table without a default value. This is not possible if the table is not empty.
  - Added the required column `marka_id` to the `Parfum` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parfum_id` to the `Parfum` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sasia_stok` to the `Parfum` table without a default value. This is not possible if the table is not empty.
  - Added the required column `volumi_ml` to the `Parfum` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `kategoria` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `kategori_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `pershkrimi` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`kategori_id`);

-- AlterTable
ALTER TABLE `parfum` DROP PRIMARY KEY,
    DROP COLUMN `brand`,
    DROP COLUMN `id`,
    DROP COLUMN `krijuarAt`,
    DROP COLUMN `sasia`,
    ADD COLUMN `gjinia_target` VARCHAR(191) NOT NULL,
    ADD COLUMN `kategoria_id` INTEGER NOT NULL,
    ADD COLUMN `marka_id` INTEGER NOT NULL,
    ADD COLUMN `notat_ere` VARCHAR(191) NULL,
    ADD COLUMN `parfum_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `sasia_stok` INTEGER NOT NULL,
    ADD COLUMN `volumi_ml` INTEGER NOT NULL,
    ADD PRIMARY KEY (`parfum_id`);

-- CreateTable
CREATE TABLE `Markat` (
    `marka_id` INTEGER NOT NULL AUTO_INCREMENT,
    `emri` VARCHAR(191) NOT NULL,
    `shteti_origjines` VARCHAR(191) NULL,
    `website` VARCHAR(191) NULL,
    `pershkrimi` VARCHAR(191) NULL,
    `logoja` VARCHAR(191) NULL,

    UNIQUE INDEX `Markat_emri_key`(`emri`),
    PRIMARY KEY (`marka_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ofertat` (
    `oferte_id` INTEGER NOT NULL AUTO_INCREMENT,
    `emri` VARCHAR(191) NOT NULL,
    `pershkrimi` VARCHAR(191) NULL,
    `perqindja_zbritjes` DOUBLE NOT NULL,
    `data_fillimit` DATETIME(3) NOT NULL,
    `data_perfundimit` DATETIME(3) NOT NULL,
    `statusi` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`oferte_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Parfum` ADD CONSTRAINT `Parfum_kategoria_id_fkey` FOREIGN KEY (`kategoria_id`) REFERENCES `Kategoria`(`kategori_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Parfum` ADD CONSTRAINT `Parfum_marka_id_fkey` FOREIGN KEY (`marka_id`) REFERENCES `Markat`(`marka_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
