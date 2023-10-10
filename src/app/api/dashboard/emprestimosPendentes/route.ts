import { prisma } from "@/app/utils/Prisma";

export async function GET() {
  try {
    const emprestimos = await prisma.emprestimos.findMany({
      where: {
        status: 2,
      },
      include: {
        livro: true,
        user: true,
      },
    });

    const emprestimosPendentes = emprestimos.map((emprestimo) => ({
      id: emprestimo.id,
      livro: emprestimo.livro.titulo,
      usuario: emprestimo.user.name,
      status: emprestimo.status,
      dataEmprestimo: emprestimo.dataEmprestimo,
    }));

    return new Response(JSON.stringify(emprestimosPendentes), { status: 200 });
  } catch (error) {
    return new Response("Erro ao ler os dados", { status: 500 });
  }
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    const emprestimoExiste = await prisma.emprestimos.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (emprestimoExiste) {
      const novoStatus = emprestimoExiste.status + 1;
      await prisma.emprestimos.update({
        where: {
          id: Number(id),
        },
        data: {
          status: novoStatus,
        },
      });
    }
    return new Response("Status do livro atualizado com sucesso", {
      status: 200,
    });
  } catch (error) {
    return new Response("Erro ao atualizar o status do livro", { status: 500 });
  }
}
