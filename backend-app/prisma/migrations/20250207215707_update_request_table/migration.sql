/*
  Warnings:

  - You are about to alter the column `description` on the `Request` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - A unique constraint covering the columns `[code]` on the table `Request` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "code" VARCHAR(50) NOT NULL,
ADD COLUMN     "summary" VARCHAR(50),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(50);

-- CreateIndex
CREATE UNIQUE INDEX "Request_code_key" ON "Request"("code");
