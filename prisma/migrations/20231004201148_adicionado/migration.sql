-- AlterTable
ALTER TABLE "Livros" ADD COLUMN     "quantidadeDisponivel" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "Emprestimos" (
    "id" SERIAL NOT NULL,
    "livroId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,
    "dataEmprestimo" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Emprestimos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservas" (
    "id" SERIAL NOT NULL,
    "livroId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,

    CONSTRAINT "Reservas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmprestimosFinalizados" (
    "id" SERIAL NOT NULL,
    "livroId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,
    "dataDevolucao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmprestimosFinalizados_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Emprestimos_id_key" ON "Emprestimos"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Reservas_id_key" ON "Reservas"("id");

-- CreateIndex
CREATE UNIQUE INDEX "EmprestimosFinalizados_id_key" ON "EmprestimosFinalizados"("id");

-- AddForeignKey
ALTER TABLE "Emprestimos" ADD CONSTRAINT "Emprestimos_livroId_fkey" FOREIGN KEY ("livroId") REFERENCES "Livros"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Emprestimos" ADD CONSTRAINT "Emprestimos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservas" ADD CONSTRAINT "Reservas_livroId_fkey" FOREIGN KEY ("livroId") REFERENCES "Livros"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservas" ADD CONSTRAINT "Reservas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmprestimosFinalizados" ADD CONSTRAINT "EmprestimosFinalizados_livroId_fkey" FOREIGN KEY ("livroId") REFERENCES "Livros"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmprestimosFinalizados" ADD CONSTRAINT "EmprestimosFinalizados_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
