/*
  Warnings:

  - Added the required column `updatedAt` to the `orderItems` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orderitems` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `orders` MODIFY `dateOfOrder` DATE NOT NULL;

-- CreateTable
CREATE TABLE `payments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderId` INTEGER NOT NULL,
    `method_payment` VARCHAR(191) NOT NULL,
    `price_total` DECIMAL(65, 30) NOT NULL,
    `dateOfPayment` DATE NOT NULL,
    `status` ENUM('PENDING', 'ACCEPTED', 'CANCELED') NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `payments_orderId_key`(`orderId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orderapprovals` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `orderId` INTEGER NOT NULL,
    `dataOfApprovals` DATE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `orderapprovals_orderId_key`(`orderId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderapprovals` ADD CONSTRAINT `orderapprovals_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderapprovals` ADD CONSTRAINT `orderapprovals_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
