/*
  Warnings:

  - You are about to drop the column `university` on the `scholarshipalert` table. All the data in the column will be lost.
  - Added the required column `countryId` to the `ScholarshipAlert` table without a default value. This is not possible if the table is not empty.
  - Added the required column `universityId` to the `ScholarshipAlert` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ScholarshipAlert` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `scholarshipalert` DROP COLUMN `university`,
    ADD COLUMN `countryId` INTEGER NOT NULL,
    ADD COLUMN `universityId` INTEGER NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AddForeignKey
ALTER TABLE `ScholarshipAlert` ADD CONSTRAINT `ScholarshipAlert_universityId_fkey` FOREIGN KEY (`universityId`) REFERENCES `University`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ScholarshipAlert` ADD CONSTRAINT `ScholarshipAlert_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `Country`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
