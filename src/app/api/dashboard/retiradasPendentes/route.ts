import { prisma } from "@/app/utils/Prisma";
import ValidarPermissao from "../ValidarPermissao";

export async function GET(request: Request) {
  const authorization = request.headers.get("authorization");

  const permissionResult = await ValidarPermissao(
    authorization!,
    "tirar_relatorio"
  );

  if (permissionResult.hasPermission) {
    try {
      const emprestimos = await prisma.emprestimos.findMany({
        where: {
          status: 1,
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
          dataEmprestimo: "desc",
        },
      });

      const emprestimosComNomes = emprestimos.map((emprestimo) => ({
        id: emprestimo.id,
        livro: emprestimo.livro.titulo,
        nome: emprestimo.user.name,
        telefone: emprestimo.user.phone,
        status: emprestimo.status === 1 ? "Não retirado" : emprestimo.status,
        dataEmprestimo: emprestimo.dataEmprestimo,
        dataVencimento: emprestimo.dataVencimento,
      }));

      return new Response(JSON.stringify(emprestimosComNomes), { status: 200 });
    } catch (error) {
      return new Response("Erro ao ler os dados", { status: 500 });
    }
  } else {
    return new Response("Unauthorized", { status: 403 });
  }
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const authorization = request.headers.get("authorization");

  const permissionResult = await ValidarPermissao(
    authorization!,
    "tirar_relatorio"
  );

  if (permissionResult.hasPermission) {
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
      return new Response("Erro ao atualizar o status do livro", {
        status: 500,
      });
    }
  } else {
    return new Response("Unauthorized", { status: 403 });
  }
}
