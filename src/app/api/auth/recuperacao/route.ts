import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { url } from "@/app/url";

import nodemailer from "@/app/helpers/nodemailer";

const prisma = new PrismaClient();

//ENVIO DO EMAIL PARA A RECUPERAÇÃO DE SENHA
export async function POST(request: Request) {
  const data = await request.json();

  try {
    const existingUser = await prisma.users.findUnique({
      where: {
        email: data,
      },
    });

    if (existingUser) {
      const email = existingUser.email;
      const id = existingUser.id;

      const secretKey = process.env.SECRETKEY;

      const token = jwt.sign({ email, id }, secretKey!, { expiresIn: "1h" });

      try {
        const mailOptions = {
          from: process.env.EMAILUSER,
          to: existingUser.email,
          subject: "Recuperação de senha.",
          html: `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        /* Adicione seus estilos CSS aqui */
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
        }
        h1 {
          color: #333;
        }
      </style>
    </head>
    <body>
      <h1>Recuperação de senha.</h1>
      <p style="color: #333;">Clique no botão abaixo para restaurar sua senha:</p>
      <a href="${url}/api/auth/recuperacao?token=${token}" style="text-decoration: none; color: #0078d4;">Restaurar senha</a>
    </body>
    </html>
  `,
        };

        await nodemailer.sendMail(mailOptions);
        return new Response(JSON.stringify(existingUser), { status: 201 });
      } catch (error) {
        return new Response("Erro enviar e-email para restauração de senha.", {
          status: 500,
        });
      }
    } else {
      return new Response("E-mail não cadastrado.", { status: 404 });
    }
  } catch (error) {
    console.error("Erro enviar email:", error);
    return new Response("Erro ao enviar email.", { status: 500 });
  }
}

//VERIFICAÇÃO DO TOKEN ENVIADO PARA O EMAIL
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  try {
    const decodedToken = jwt.verify(token!, process.env.SECRETKEY!);

    if (typeof decodedToken === "object" && "id" in decodedToken) {
      const userId = decodedToken.id;

      const user = await prisma.users.findUnique({
        where: {
          id: userId,
        },
      });

      if (user?.verification_email === false) {
        await prisma.users.update({
          where: {
            id: userId,
          },
          data: {
            verification_email: true,
          },
        });
      }

      if (!user) {
        return new Response("Usuário não encontrado.", { status: 404 });
      }

      return Response.redirect(`${url}/recuperacao?token=${token}`);
    } else {
      throw new Error("Token inválido");
    }
  } catch (error) {
    console.error("Erro ao confirmar o e-mail:", error);
    return new Response("Erro ao confirmar o e-mail.", { status: 500 });
  }
}

//ALTERAÇÃO DE SENHA
export async function PUT(request: Request) {
  const data = await request.json();
  const hashedPassword = await bcrypt.hash(data.password, 12);

  try {
    const user = await prisma.users.findFirst({
      where: {
        id: data.id,
      },
    });

    if (user) {
      await prisma.users.update({
        where: {
          id: user.id,
        },
        data: {
          password: hashedPassword,
        },
      });

      return new Response("Senha alterada com sucesso.", {
        status: 201,
      });
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
