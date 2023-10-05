import { prisma } from "@/app/utils/Prisma";

import jwt, { JwtPayload } from "jsonwebtoken";

export async function POST(request: Request) {
  const secretKey = process.env.SECRETKEY;
  const data = await request.json();

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
      return new Response("Token de autenticação ausente", { status: 401 });
    } else {
      const token = authorizationHeader.split(" ")[1];
      const decodedToken = jwt.verify(token, secretKey) as JwtPayload;

      if (!decodedToken.userId) {
        return new Response("Token JWT inválido, 'userId' ausente", {
          status: 401,
        });
      }

      const userId = decodedToken.userId;

      const emprestimoExistente = await prisma.emprestimos.findFirst({
        where: {
          livroId: data.livroId,
          userId: userId,
          status: 1,
        },
      });

      if (emprestimoExistente) {
        return new Response("Você já pegou este livro emprestado", {
          status: 400,
        });
      } else {
        const livroExistente = await prisma.livros.findUnique({
          where: {
            id: data.livroId,
          },
        });

        if (livroExistente) {
          console.log(livroExistente);
          if (livroExistente.quantidadeDisponivel < 1) {
            return new Response("Livro disponível apenas para reservas", {
              status: 200,
            });
          } else {
            const novoRegistro = await prisma.emprestimos.create({
              data: {
                livroId: data.livroId,
                status: 1,
                userId: userId,
              },
            });

            return new Response(JSON.stringify(novoRegistro), { status: 201 });
          }
        }
      }
    }
  } catch (error) {
    return new Response("Erro de autenticação: " + error, {
      status: 401,
    });
  }
}
