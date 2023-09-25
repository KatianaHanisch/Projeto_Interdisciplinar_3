import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const data = await request.json();

  //id_usuario
  //livro_reservado
  //livro_emprestado

  if (
    data.titulo &&
    data.autor &&
    data.categoria &&
    data.sinopse &&
    data.capaUrl
  ) {
    console.log("teste");
    try {
      const livroExistente = await prisma.livros.findUnique({
        where: {
          titulo: data.titulo,
        },
      });

      if (livroExistente) {
        return new Response("Livro já cadastrado.", { status: 409 });
      } else {
        const novoLivro = await prisma.livros.create({
          data: {
            titulo: data.titulo,
            autor: data.autor,
            categoria: data.categoria,
            sinopse: data.sinopse,
            capaUrl: data.capaUrl,
          },
        });

        return new Response(JSON.stringify(novoLivro), { status: 201 });
      }
    } catch (error) {
      console.error("Erro ao criar novo livro: ", error);
      return new Response("Erro ao criar novo livro", { status: 500 });
    }
  } else {
    return new Response("Faltanto dados ao criar novo livro", { status: 400 });
  }
}
