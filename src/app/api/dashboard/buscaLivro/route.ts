import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");

  const livros = await prisma.livros.findMany({
    where: {
      titulo: {
        startsWith: search!,
      },
    },
  });
  return new Response(JSON.stringify(livros), { status: 200 });
}
