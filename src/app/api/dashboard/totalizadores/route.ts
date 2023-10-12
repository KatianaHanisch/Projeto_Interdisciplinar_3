import { prisma } from "@/app/utils/Prisma";

export async function GET() {
  try {
    const totalLivrosCadastrados = await prisma.livros.count();
    const emprestimosFinalizados = await prisma.emprestimosFinalizados.count();
    const emprestimosPendentes = await prisma.emprestimos.count({
      where: {
        status: 2,
      },
    });

    return new Response(
      JSON.stringify({
        emprestimosPendentes,
        emprestimosFinalizados,
        totalLivrosCadastrados,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response("Erro ao obter o total de livros", { status: 500 });
  }
}
