import { prisma } from "@/app/utils/Prisma";

export async function GET() {
  try {
    const livros = await prisma.livros.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 12,
    });

    await prisma.$disconnect();

    return new Response(JSON.stringify(livros), { status: 200 });
  } catch (error) {
    await prisma.$disconnect();

    return new Response("Não foi possível acessar os dados", { status: 500 });
  }
}
