-- AlterTable
ALTER TABLE `user` ADD COLUMN `categoryId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `ScholarshipCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
