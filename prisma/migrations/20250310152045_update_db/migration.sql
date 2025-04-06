/*
  Warnings:

  - You are about to alter the column `total_amount` on the `order` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `price` on the `order_item` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `total_price` on the `order_item` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `price` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `rating` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(1,1)`.
  - You are about to alter the column `email` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(60)`.

*/
-- AlterTable
ALTER TABLE `category` MODIFY `name` VARCHAR(255) NOT NULL,
    MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `costumer` MODIFY `name` VARCHAR(255) NOT NULL,
    MODIFY `surname` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `order` MODIFY `total_amount` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `order_item` MODIFY `price` DECIMAL(10, 2) NOT NULL,
    MODIFY `total_price` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `product` MODIFY `price` DECIMAL(10, 2) NOT NULL,
    MODIFY `promotion` DECIMAL(10, 2) NOT NULL,
    MODIFY `description` TEXT NOT NULL,
    MODIFY `img_url` VARCHAR(255) NOT NULL,
    MODIFY `rating` DECIMAL(1, 1) NULL,
    MODIFY `name` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `email` VARCHAR(60) NOT NULL,
    MODIFY `surname` VARCHAR(255) NOT NULL;
