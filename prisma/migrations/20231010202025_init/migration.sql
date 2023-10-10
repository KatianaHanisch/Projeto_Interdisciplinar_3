/*
  Warnings:

  - Added the required column `adicionar_livro` to the `Roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adicionar_usuario` to the `Roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `confirmar_devolucao` to the `Roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `confirmar_retirada` to the `Roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `editar_usuario` to the `Roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `remover_livro` to the `Roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `remover_usuario` to the `Roles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Roles" ADD COLUMN     "adicionar_livro" BOOLEAN NOT NULL,
ADD COLUMN     "adicionar_usuario" BOOLEAN NOT NULL,
ADD COLUMN     "confirmar_devolucao" BOOLEAN NOT NULL,
ADD COLUMN     "confirmar_retirada" BOOLEAN NOT NULL,
ADD COLUMN     "editar_usuario" BOOLEAN NOT NULL,
ADD COLUMN     "remover_livro" BOOLEAN NOT NULL,
ADD COLUMN     "remover_usuario" BOOLEAN NOT NULL;
