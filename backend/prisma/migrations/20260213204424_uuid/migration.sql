/*
  Warnings:

  - The primary key for the `GlobalRole` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `GlobalRole` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `globalRoleId` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_globalRoleId_fkey";

-- AlterTable
ALTER TABLE "GlobalRole" DROP CONSTRAINT "GlobalRole_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" INTEGER NOT NULL,
ADD CONSTRAINT "GlobalRole_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "globalRoleId",
ADD COLUMN     "globalRoleId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_globalRoleId_fkey" FOREIGN KEY ("globalRoleId") REFERENCES "GlobalRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
