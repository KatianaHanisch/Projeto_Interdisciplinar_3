import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { prisma } from "@/app/utils/Prisma";

// ALTERAÇÃO DAS INFORMAÇÕES DO USUÁRIO
export async function PUT(request: Request) {
  const data = await request.json();
  const secretKey = process.env.SECRETKEY;

  try {
    const user = await prisma.users.findFirst({
      where: {
        id: data.id,
      },
    });

    if (!user) {
      return new Response("Usuário não encontrado.", {
        status: 404,
      });
    }

    if (user.email !== data.email) {
      const existingUser = await prisma.users.findFirst({
        where: {
          email: data.email,
        },
      });

      if (existingUser) {
        return new Response(
          JSON.stringify({ error: "O email já está em uso." }),
          {
            status: 409,
          }
        );
      }
    }

    let hashedPassword;
    if (data.password) {
      hashedPassword = await bcrypt.hash(data.password, 12);
    }

    await prisma.users.update({
      where: {
        email: user.email,
      },
      data: {
        password: hashedPassword || user.password,
        email: data.email,
        phone: data.phone,
        name: data.name,
      },
    });

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        name: data.name,
        phone: data.phone,
      },
      secretKey!,
      {
        expiresIn: "24h",
      }
    );

    return new Response(JSON.stringify({ token }), {
      status: 201,
    });
  } catch (error) {
    console.error("Erro:", error);
    return new Response("Erro.", { status: 500 });
  }
}

//GET de todos os usuários
export async function GET() {
  const users = await prisma.users.findMany();
  return new Response(JSON.stringify(users), { status: 200 });
}
