-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_employeeId_fkey";

-- AlterTable
ALTER TABLE "Request" ALTER COLUMN "employeeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
