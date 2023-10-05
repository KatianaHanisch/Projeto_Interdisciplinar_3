import { prisma } from "@/app/utils/Prisma"


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");

  try {
    const livros = await prisma.livros.findMany({
      where: {
        titulo: {
          startsWith: search!,
        },
      },
    });
    return new Response(JSON.stringify(livros), { status: 200 });
  } catch (error) {
    return new Response("Não foi possível realizar a pesquisa", {
      status: 400,
    });
  }
}
