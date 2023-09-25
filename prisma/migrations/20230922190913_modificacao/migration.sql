/*
  Warnings:

  - You are about to drop the `livro` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "livro";

-- CreateTable
CREATE TABLE "livros" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "sinopse" TEXT NOT NULL,
    "capaUrl" TEXT NOT NULL,

    CONSTRAINT "livros_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "livros_titulo_key" ON "livros"("titulo");
