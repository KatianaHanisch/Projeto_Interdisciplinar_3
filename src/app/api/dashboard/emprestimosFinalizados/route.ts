import { prisma } from "@/app/utils/Prisma";

export async function GET() {
  try {
    const emprestimos = await prisma.emprestimos.findMany({
      where: {
        status: 3,
      },
      include: {
        livro: true,
        user: true,
      },
    });

    for (const emprestimo of emprestimos) {
      const dataDevolucao = new Date();

      await prisma.emprestimosFinalizados.create({
        data: {
          livro: {
            connect: { id: emprestimo.livroId },
          },
          user: {
            connect: { id: emprestimo.userId },
          },
          status: emprestimo.status,
          dataDevolucao: dataDevolucao,
        },
      });

      await prisma.emprestimos.delete({
        where: {
          id: emprestimo.id,
        },
      });
    }

    return new Response(JSON.stringify(emprestimos), {
      status: 200,
    });
  } catch (error) {
    return new Response("Erro ao processar os dados", { status: 500 });
  }
}
