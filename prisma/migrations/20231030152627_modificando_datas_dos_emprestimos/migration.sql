/*
  Warnings:

  - Added the required column `dataEmprestimo` to the `EmprestimosFinalizados` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Emprestimos" ADD COLUMN     "dataRetirada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "EmprestimosFinalizados" ADD COLUMN     "dataEmprestimo" TIMESTAMP(3) NOT NULL;
