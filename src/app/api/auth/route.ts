import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { prisma } from "@/app/utils/Prisma";

import { url } from "@/app/url";

import nodemailer from "@/app/helpers/nodemailer";

//CADASTRO DE USUÁRIO
export async function POST(request: Request) {
  const data = await request.json();
  if (data.email && data.name && data.password) {
    try {
      const existingUser = await prisma.users.findUnique({
        where: {
          email: data.email,
        },
      });

      if (existingUser) {
        return new Response("E-mail já cadastrado.", { status: 409 });
      } else {
        const hashedPassword = await bcrypt.hash(data.password, 12);
        const newUser = await prisma.users.create({
          data: {
            email: data.email,
            name: data.name,
            phone: data.phone,
            password: hashedPassword,
            verification_email: false,
          },
        });

        const email = newUser.email;
        const id = newUser.id;

        const secretKey = process.env.SECRETKEY;

        const token = jwt.sign({ email, id }, secretKey!, { expiresIn: "1h" });

        try {
          const mailOptions = {
            from: process.env.EMAILUSER,
            to: newUser.email,
            subject: "Confirmação de Cadastro",
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
      <h1>Confirmação de Cadastro</h1>
      <p style="color: #333;">Obrigado por se cadastrar! Clique no link abaixo para confirmar seu cadastro:</p>
      <a href="${url}/api/auth?token=${token}" style="text-decoration: none; color: #0078d4;">Confirmar Cadastro</a>
    </body>
    </html>
  `,
          };

          await nodemailer.sendMail(mailOptions);
          return new Response(JSON.stringify(newUser), { status: 201 });
        } catch (error) {
          console.error("Erro ao enviar e-mail de confirmação:", error);
          return new Response("Erro ao criar um novo usuário.", {
            status: 500,
          });
        }
      }
    } catch (error) {
      console.error("Erro ao criar um novo usuário:", error);
      return new Response("Erro ao criar um novo usuário.", { status: 500 });
    }
  } else {
    return new Response("Faltando dados", { status: 400 });
  }
}

//CONFIRMAÇÃO DE EMAIL
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  try {
    const decodedToken = jwt.verify(token!, process.env.SECRETKEY!);

    if (typeof decodedToken === "object" && "id" in decodedToken) {
      const email = decodedToken.email;
      const userId = decodedToken.id;

      const user = await prisma.users.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        return new Response("Usuário não encontrado.", { status: 404 });
      }

      if (user.verification_email) {
        return new Response("E-mail já confirmado.", { status: 409 });
      }
      await prisma.users.update({
        where: {
          id: userId,
        },
        data: {
          verification_email: true,
        },
      });

      return Response.redirect(`${url}/login?teste=1`);
    } else {
      throw new Error("Token inválido");
    }
  } catch (error) {
    console.error("Erro ao confirmar o e-mail:", error);
    return new Response("Erro ao confirmar o e-mail.", { status: 500 });
  }
}
