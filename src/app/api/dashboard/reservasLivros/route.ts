import { prisma } from "@/app/utils/Prisma";

export async function GET() {
  try {
    const reservas = await prisma.reservas.findMany({
      include: {
        livro: true,
        user: {
          select: {
            name: true,
            phone: true,
          },
        },
      },
      orderBy: {
        dataReserva: "desc",
      },
    });

    const livrosReservados = reservas.map((reserva) => ({
      id: reserva.id,
      livro: reserva.livro.titulo,
      nome: reserva.user.name,
      telefone: reserva.user.phone,
      status: reserva.status === 1 ? "Reservado" : reserva.status,
    }));

    await prisma.$disconnect;

    return new Response(JSON.stringify(livrosReservados), { status: 200 });
  } catch (error) {
    await prisma.$disconnect;

    return new Response("Não foi possível acessar os dados", { status: 500 });
  }
}
