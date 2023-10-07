import { prisma } from "@/app/utils/Prisma";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    const livroEmprestado = await prisma.livros.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (livroEmprestado) {
      const novaQuantidade = livroEmprestado.quantidadeDisponivel - 1;

      await prisma.livros.update({
        where: {
          id: Number(id),
        },
        data: {
          quantidadeDisponivel: novaQuantidade,
        },
      });

      await prisma.$disconnect();
      return new Response("Empréstimo efetuado com sucesso.", { status: 200 });
    } else {
      await prisma.$disconnect();
      return new Response("Livro não encontrado.", { status: 404 });
    }
  } catch (error) {
    console.error(
      "Erro ao atualizar a quantidade disponível do livro: ",
      error
    );
    await prisma.$disconnect();
    return new Response("Erro ao atualizar a quantidade disponível do livro", {
      status: 500,
    });
  }
}
