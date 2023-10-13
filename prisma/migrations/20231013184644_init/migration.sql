/*
  Warnings:

  - Added the required column `tirar_relatorio` to the `Roles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Roles" ADD COLUMN     "tirar_relatorio" BOOLEAN NOT NULL;
