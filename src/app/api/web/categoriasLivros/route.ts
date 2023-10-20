import { prisma } from "@/app/utils/Prisma";

export async function GET() {
  try {
    const livros = await prisma.livros.findMany();

    const categoriasUnicas = Array.from(
      new Set(livros.map((livro) => livro.categoria))
    );

    const categorias = categoriasUnicas.map((categoria) => ({ categoria }));

    await prisma.$disconnect();

    return new Response(JSON.stringify(categorias), { status: 200 });
  } catch (error) {
    await prisma.$disconnect();

    return new Response("Não foi possível acessar os dados", { status: 500 });
  }
}
