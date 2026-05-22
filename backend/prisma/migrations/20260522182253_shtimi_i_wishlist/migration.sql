/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Klientet` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `klientet` ADD COLUMN `user_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `parfum` MODIFY `sasia_stok` INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX `Klientet_user_id_key` ON `Klientet`(`user_id`);

-- AddForeignKey
ALTER TABLE `Klientet` ADD CONSTRAINT `Klientet_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
