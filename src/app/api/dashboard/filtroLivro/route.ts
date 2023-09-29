import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const livro = await prisma.livros.findUnique({
    where: {
      id: Number(id),
    },
  });
  return new Response(JSON.stringify(livro), { status: 200 });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const deleteLivro = await prisma.livros.delete({
    where: {
      id: Number(id),
    },
  });

  return new Response(JSON.stringify(deleteLivro), { status: 200 });
}
