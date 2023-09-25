/*
  Warnings:

  - Added the required column `verification_email` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "verification_email" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "livro" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "sinopse" TEXT NOT NULL,
    "capaUrl" TEXT NOT NULL,

    CONSTRAINT "livro_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "livro_titulo_key" ON "livro"("titulo");
