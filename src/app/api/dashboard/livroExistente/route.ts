import { prisma } from "@/app/utils/Prisma";

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const titulo = searchParams.get("titulo");

  try {
    const livroExistente = await prisma.livros.findUnique({
      where: {
        titulo: titulo as string | undefined,
      },
    });

    if (livroExistente) {
      return new Response(JSON.stringify(livroExistente), { status: 200 });
    } else {
      return new Response("Livro não encontrado", { status: 404 });
    }
  } catch (error) {
    return new Response("Erro ao buscar os dados", { status: 500 });
  }
}
