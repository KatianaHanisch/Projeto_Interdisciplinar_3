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

    const emprestimosFinalizados = emprestimos.map((emprestimo) => ({
      id: emprestimo.id,
      livro: emprestimo.livro.titulo,
      usuario: emprestimo.user.name,
      status: emprestimo.status,
      dataEmprestimo: emprestimo.dataEmprestimo,
    }));

    return new Response(JSON.stringify(emprestimosFinalizados), {
      status: 200,
    });
  } catch (error) {
    return new Response("Erro ao ler os dados", { status: 500 });
  }
}
