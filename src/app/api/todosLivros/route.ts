import { prisma } from "@/app/utils/Prisma";

export async function GET() {
  try {
    const livros = await prisma.livros.findMany();
    await prisma.$disconnect();
    return new Response(JSON.stringify(livros), { status: 200 });
  } catch (error) {
    await prisma.$disconnect();
  }
}
