import { prisma } from "@/app/utils/Prisma";

//GET de todos os usuários
export async function GET() {
  const roles = await prisma.roles.findMany();
  return new Response(JSON.stringify(roles), { status: 200 });
}
