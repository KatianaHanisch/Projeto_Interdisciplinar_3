import { prisma } from "@/app/utils/Prisma"


export async function POST(request: Request) {
  const data = await request.json();

  if (
    data.titulo &&
    data.autor &&
    data.categoria &&
    data.sinopse &&
    data.capaUrl
  ) {
    try {
      const livroExistente = await prisma.livros.findUnique({
        where: {
          titulo: data.titulo,
        },
      });

      if (livroExistente) {
        const novaQuantidade = livroExistente.quantidadeDisponivel + 1;

        await prisma.livros.update({
          where: {
            titulo: livroExistente.titulo,
          },
          data: {
            quantidadeDisponivel: novaQuantidade,
          },
        });
        return new Response("Livro atualizado com sucesso.", { status: 200 });
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

export async function GET() {
  const livros = await prisma.livros.findMany();
  return new Response(JSON.stringify(livros), { status: 200 });
}
