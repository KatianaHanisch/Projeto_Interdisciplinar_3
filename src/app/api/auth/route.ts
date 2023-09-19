import { NextResponse } from "next/server";
// import User from "../types";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const allUsers = await prisma.users.findMany();
  return new Response(JSON.stringify(allUsers));
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const newUser = await prisma.users.create({
      data: {
        email: data.email,
        name: data.name,
        password: data.password,
      },
    });

    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    console.error("Erro ao criar um novo usuário:", error);

    return new Response("Erro ao criar um novo usuário.", { status: 500 });
  }
}
