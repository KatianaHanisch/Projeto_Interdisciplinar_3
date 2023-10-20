import { prisma } from "@/app/utils/Prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoria = searchParams.get("categoria");

  try {
    const livros = await prisma.livros.findMany({
      where: {
        categoria: categoria !== null ? { equals: categoria } : undefined,
      },
    });

    await prisma.$disconnect();

    return new Response(JSON.stringify(livros), { status: 200 });
  } catch (error) {
    await prisma.$disconnect();

    return new Response("Não foi possível filtrar os livros", { status: 500 });
  }
}
