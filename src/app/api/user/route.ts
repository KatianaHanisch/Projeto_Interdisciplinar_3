import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { prisma } from "@/app/utils/Prisma"

// ALTERAÇÃO DAS INFORMAÇÕES DO USUÁRIO
export async function PUT(request: Request) {
  const data = await request.json();
  const secretKey = process.env.SECRETKEY;

  try {
    const user = await prisma.users.findFirst({
      where: {
        email: data.email,
      },
    });

    if (user) {
      if (data.name && data.password) {
        const hashedPassword = await bcrypt.hash(data.password, 12);

        await prisma.users.update({
          where: {
            email: user.email,
          },
          data: {
            password: hashedPassword,
            name: data.name,
          },
        });

        const token = jwt.sign(
          { userId: user.id, email: user.email, name: data.name },
          secretKey!,
          {
            expiresIn: "24h",
          }
        );

        return new Response(JSON.stringify({ token }), {
          status: 201,
        });
      } else if (data.password !== "") {
        const hashedPassword = await bcrypt.hash(data.password, 12);

        await prisma.users.update({
          where: {
            email: user.email,
          },
          data: {
            password: hashedPassword,
          },
        });

        const token = jwt.sign(
          { userId: user.id, email: user.email, name: data.name },
          secretKey!,
          {
            expiresIn: "24h",
          }
        );

        return new Response(JSON.stringify({ token }), {
          status: 201,
        });
      } else if (data.name !== "") {
        await prisma.users.update({
          where: {
            email: user.email,
          },
          data: {
            name: data.name,
          },
        });

        const token = jwt.sign(
          { userId: user.id, email: user.email, name: data.name },
          secretKey!,
          {
            expiresIn: "24h",
          }
        );

        return new Response(JSON.stringify({ token }), {
          status: 201,
        });
      }
    } else {
      return new Response("Usuário não encontrado.", {
        status: 404,
      });
    }
  } catch (error) {
    console.error("Erro:", error);
    return new Response("Erro.", { status: 500 });
  }
}
