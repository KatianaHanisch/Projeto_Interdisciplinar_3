import { prisma } from "@/app/utils/Prisma";
import ValidarPermissao from "../dashboard/ValidarPermissao";

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
  const authorization = request.headers.get("authorization");

  const permissionResult = await ValidarPermissao(
    authorization!,
    "remover_livro"
  );

  if (permissionResult.hasPermission) {
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
  } else {
    return new Response("Unauthorized", { status: 403 });
  }
}
