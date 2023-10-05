import { prisma } from "@/app/utils/Prisma"


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    const livro = await prisma.livros.findUnique({
      where: {
        id: Number(id),
      },
    });
    return new Response(JSON.stringify(livro), { status: 200 });
  } catch (error) {
    return new Response("Não foi possível encontar o livro", { status: 404 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    const deleteLivro = await prisma.livros.delete({
      where: {
        id: Number(id),
      },
    });

    return new Response(JSON.stringify(deleteLivro), { status: 200 });
  } catch (error) {
    return new Response("Não foi possível deletar o livro", { status: 404 });
  }
}
