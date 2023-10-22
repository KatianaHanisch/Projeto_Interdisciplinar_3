import { prisma } from "@/app/utils/Prisma";

import jwt, { JwtPayload } from "jsonwebtoken";

export async function GET(request: Request) {
  const secretKey = process.env.SECRETKEY;

  //Status = 1 - livro não retirado
  //Status = 2 - livro não devolvido
  //Status = 3 - Empréstimo de livro finalizado
  //Status = 4 - Livro reservado

  if (typeof secretKey !== "string") {
    return new Response("Chave secreta inválida", { status: 500 });
  }

  try {
    const authorizationHeader = request.headers.get("Authorization");

    if (!authorizationHeader) {
      await prisma.$disconnect();

      return new Response("Token de autenticação ausente", { status: 401 });
    } else {
      const token = authorizationHeader.split(" ")[1];
      const decodedToken = jwt.verify(token, secretKey) as JwtPayload;

      if (!decodedToken.userId) {
        await prisma.$disconnect();
        return new Response("Token JWT inválido, 'userId' ausente", {
          status: 401,
        });
      }

      const userId = decodedToken.userId;

      const emprestimosUsuario = await prisma.emprestimos.findMany({
        where: { userId: userId },
        include: {
          livro: {
            select: {
              id: true,
              capaUrl: true,
              autor: true,
              categoria: true,
              titulo: true,
            },
          },
        },
        orderBy: {
          dataEmprestimo: "desc",
        },
      });

      const emprestimos = emprestimosUsuario.map((emprestimo) => ({
        id: emprestimo.livro.id,
        titulo: emprestimo.livro.titulo,
        autor: emprestimo.livro.autor,
        categoria: emprestimo.livro.categoria,
        capaUrl: emprestimo.livro.capaUrl,
        dataEmprestimo: emprestimo.dataEmprestimo,
        dataVencimento: emprestimo.dataVencimento,
      }));

      await prisma.$disconnect();

      return new Response(JSON.stringify(emprestimos), { status: 200 });
    }
  } catch (error) {
    await prisma.$disconnect();

    return new Response("Não foi possível acessar os dados", { status: 500 });
  }
}
