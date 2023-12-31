import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { prisma } from "@/app/utils/Prisma";

//ROTA DE LOGIN
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { email, password } = data;

    if (!email || !password) {
      return new Response("Envie todos os dados.", { status: 400 });
    }

    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "Usuário não encontrado" }), {
        status: 404,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      // console.log(user?.verification_email);
      return new Response(JSON.stringify({ error: "Senha incorreta" }), {
        status: 404,
      });
    }

    if (user.verification_email === false) {
      return new Response(JSON.stringify({ error: "E-mail não validado" }), {
        status: 404,
      });
    }

    const secretKey = process.env.SECRETKEY;
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
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
    console.error("Erro ao fazer login:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao realizar o login." }),
      {
        status: 500,
      }
    );
  }
}
