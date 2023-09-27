import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const data = await request.json();

  //id_usuario
  //livro_reservado
  //livro_emprestado

  if (
    data.titulo &&
    data.autor &&
    data.categoria &&
    data.sinopse &&
    data.capaUrl
  ) {
    try {
      const livroExistente = await prisma.livros.findUnique({
        where: {
          titulo: data.titulo,
        },
      });

      if (livroExistente) {
        return new Response("Livro já cadastrado.", { status: 409 });
      } else {
        const novoLivro = await prisma.livros.create({
          data: {
            titulo: data.titulo,
            autor: data.autor,
            categoria: data.categoria,
            sinopse: data.sinopse,
            capaUrl: data.capaUrl,
          },
        });

        return new Response(JSON.stringify(novoLivro), { status: 201 });
      }
    } catch (error) {
      console.error("Erro ao criar novo livro: ", error);
      return new Response("Erro ao criar novo livro", { status: 500 });
    }
  } else {
    return new Response("Faltanto dados ao criar novo livro", { status: 400 });
  }
}

// export async function GET() {
//   const data = await prisma.livros.findMany();
//   return new NextResponse(JSON.stringify(data), { status: 200 });

//   // const data = await prisma.livros.findMany();
//   // return new Response(JSON.stringify(data), { status: 200 });
// }
// const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   const data = await res.json();

//   return NextResponse.json({ data });
