import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { prisma } from "@/app/utils/Prisma";

// ALTERAÇÃO DAS INFORMAÇÕES DO USUÁRIO
// export async function PUT(request: Request) {
//   const data = await request.json();
//   const secretKey = process.env.SECRETKEY;

//   try {
//     const user = await prisma.users.findFirst({
//       where: {
//         email: data.email,
//       },
//     });

//     if (user) {
//       if (data.name && data.password) {
//         const hashedPassword = await bcrypt.hash(data.password, 12);

//         await prisma.users.update({
//           where: {
//             email: user.email,
//           },
//           data: {
//             password: hashedPassword,
//             name: data.name,
//           },
//         });

//         const token = jwt.sign(
//           { userId: user.id, email: user.email, name: data.name },
//           secretKey!,
//           {
//             expiresIn: "24h",
//           }
//         );

//         return new Response(JSON.stringify({ token }), {
//           status: 201,
//         });
//       } else if (data.password !== "") {
//         const hashedPassword = await bcrypt.hash(data.password, 12);

//         await prisma.users.update({
//           where: {
//             email: user.email,
//           },
//           data: {
//             password: hashedPassword,
//           },
//         });

//         const token = jwt.sign(
//           { userId: user.id, email: user.email, name: data.name },
//           secretKey!,
//           {
//             expiresIn: "24h",
//           }
//         );

//         return new Response(JSON.stringify({ token }), {
//           status: 201,
//         });
//       } else if (data.name !== "") {
//         await prisma.users.update({
//           where: {
//             email: user.email,
//           },
//           data: {
//             name: data.name,
//           },
//         });

//         const token = jwt.sign(
//           { userId: user.id, email: user.email, name: data.name },
//           secretKey!,
//           {
//             expiresIn: "24h",
//           }
//         );

//         return new Response(JSON.stringify({ token }), {
//           status: 201,
//         });
//       }
//     } else {
//       return new Response("Usuário não encontrado.", {
//         status: 404,
//       });
//     }
//   } catch (error) {
//     console.error("Erro:", error);
//     return new Response("Erro.", { status: 500 });
//   }
// }

//CADASTRO DO USUÁRIO DA DASH
export async function POST(request: Request) {
  const data = await request.json();

  if (data.email && data.name && data.password && data.role_id) {
    try {
      const existingUser = await prisma.usersDashboard.findUnique({
        where: {
          email: data.email,
        },
      });

      if (existingUser) {
        return new Response("E-mail já cadastrado.", { status: 409 });
      } else {
        try {
          const roleId = parseInt(data.role_id, 10);

          const role = await prisma.roles.findMany({
            where: {
              id: roleId,
            },
          });

          if (!role) {
            return new Response("Função (role) não encontrada.", {
              status: 400,
            });
          }

          const hashedPassword = await bcrypt.hash(data.password, 12);
          const newUser = await prisma.usersDashboard.create({
            data: {
              email: data.email,
              name: data.name,
              role: {
                connect: {
                  id: roleId,
                },
              },
              password: hashedPassword,
            },
          });

          return new Response(JSON.stringify(newUser), { status: 201 });
        } catch (error) {
          return new Response("Erro ao criar um novo usuário.", {
            status: 400,
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

//GET de todos os usuários
export async function GET() {
  const users = await prisma.usersDashboard.findMany();
  return new Response(JSON.stringify(users), { status: 200 });
}
