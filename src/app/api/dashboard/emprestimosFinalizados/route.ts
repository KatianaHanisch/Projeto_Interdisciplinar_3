import { prisma } from "@/app/utils/Prisma";

export async function GET() {
  try {
    const emprestimos = await prisma.emprestimosFinalizados.findMany({
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
      dataDevolucao: emprestimo.dataDevolucao,
    }));

    await prisma.$disconnect();
    return new Response(JSON.stringify(emprestimosFinalizados), {
      status: 200,
    });
  } catch (error) {
    await prisma.$disconnect;
    return new Response("Não foi possível acessar os dados", { status: 500 });
  }
}
