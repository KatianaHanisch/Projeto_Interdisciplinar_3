import { prisma } from "@/app/utils/Prisma";
import ValidarPermissao from "../ValidarPermissao";

export async function PUT(request: Request) {
  try {
    const emprestimosStatus3 = await prisma.emprestimos.findMany({
      where: {
        status: 3,
      },
    });

    for (const emprestimo of emprestimosStatus3) {
      await prisma.emprestimosFinalizados.create({
        data: {
          livro: {
            connect: { id: emprestimo.livroId },
          },
          user: {
            connect: { id: emprestimo.userId },
          },
          status: emprestimo.status,
          dataEmprestimo: emprestimo.dataEmprestimo,
          dataDevolucao: new Date(),
        },
      });

      await prisma.emprestimos.delete({
        where: {
          id: emprestimo.id,
        },
      });

      // Atualize a quantidade disponível do livro devolvido
      const livroDevolvido = await prisma.livros.findUnique({
        where: {
          id: emprestimo.livroId, // Use a chave estrangeira correta para encontrar o livro
        },
      });

      if (livroDevolvido) {
        const novaQuantidade = livroDevolvido.quantidadeDisponivel + 1;

        await prisma.livros.update({
          where: {
            id: emprestimo.livroId, // Use a chave estrangeira correta para atualizar o livro
          },
          data: {
            quantidadeDisponivel: novaQuantidade,
          },
        });
      }
    }

    return new Response(
      "Empréstimos com status 3 movidos para emprestimosFinalizados e livros atualizados",
      {
        status: 200,
      }
    );
  } catch (error) {
    await prisma.$disconnect;
    return new Response("Não foi possível acessar os dados", { status: 500 });
  }
}

export async function GET(request: Request) {
  const authorization = request.headers.get("authorization");

  const permissionResult = await ValidarPermissao(
    authorization!,
    "tirar_relatorio"
  );

  if (permissionResult.hasPermission) {
    try {
      const emprestimos = await prisma.emprestimosFinalizados.findMany({
        where: {
          status: 3,
        },
        include: {
          livro: true,
          user: {
            select: {
              name: true,
              phone: true,
            },
          },
        },
        orderBy: {
          dataDevolucao: "desc",
        },
      });

      const emprestimosFinalizados = emprestimos.map((emprestimo) => ({
        id: emprestimo.id,
        livro: emprestimo.livro.titulo,
        nome: emprestimo.user.name,
        telefone: emprestimo.user.phone,
        status: emprestimo.status === 3 ? "Devolvido" : emprestimo.status,
        dataEmprestimo: emprestimo.dataEmprestimo,
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
  } else {
    return new Response("Unauthorized", { status: 403 });
  }
}
