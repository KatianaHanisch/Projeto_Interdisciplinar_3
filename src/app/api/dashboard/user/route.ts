import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { NextRequest } from "next/server";

import ValidarPermissao from "../ValidarPermissao";

import { prisma } from "@/app/utils/Prisma";

// ALTERAÇÃO DAS INFORMAÇÕES DOS USUÁRIOS
export async function PUT(request: Request) {
  const authorization = request.headers.get("authorization");
  const data = await request.json();
  const secretKey = process.env.SECRETKEY;

  const permissionResult = await ValidarPermissao(
    authorization!,
    "editar_usuario"
  );

  if (permissionResult.hasPermission) {
    try {
      const roleId = parseInt(data.role, 10);

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

      const user = await prisma.usersDashboard.findFirst({
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
        const existingUser = await prisma.usersDashboard.findFirst({
          where: {
            email: data.email,
          },
        });

        if (existingUser) {
          return new Response("O email já está em uso.", {
            status: 409,
          });
        }
      }

      let hashedPassword;
      if (data.password) {
        hashedPassword = await bcrypt.hash(data.password, 12);
      }

      await prisma.usersDashboard.update({
        where: {
          email: user.email,
        },
        data: {
          password: hashedPassword || user.password,
          email: data.email,
          role: {
            connect: {
              id: roleId,
            },
          },
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
    } catch (error) {
      console.error("Erro:", error);
      return new Response("Erro.", { status: 500 });
    }
  } else {
    return new Response("Unauthorized", { status: 403 });
  }
}

//CADASTRO DO USUÁRIO DA DASH
export async function POST(request: Request) {
  const data = await request.json();
  const authorization = request.headers.get("authorization");

  const permissionResult = await ValidarPermissao(
    authorization!,
    "adicionar_usuario"
  );

  if (permissionResult.hasPermission) {
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
  } else {
    return new Response("Unauthorized", { status: 403 });
  }
}

//DELETE DOS USUÁRIOS DA DASHBOARD
export async function DELETE(request: Request) {
  const data = await request.json();
  const authorization = request.headers.get("authorization");

  const permissionResult = await ValidarPermissao(
    authorization!,
    "remover_usuario"
  );

  if (permissionResult.hasPermission) {
    try {
      const user = await prisma.usersDashboard.findFirst({
        where: {
          id: data,
        },
      });

      if (!user) {
        return new Response("Usuário não encontrado.", {
          status: 404,
        });
      }

      await prisma.usersDashboard.delete({
        where: {
          id: user.id,
        },
      });

      return new Response("Usuário excluído com sucesso.", {
        status: 200,
      });
    } catch (error) {
      console.error("Erro:", error);
      return new Response("Erro ao excluir o usuário.", { status: 500 });
    }
  } else {
    return new Response("Unauthorized", { status: 403 });
  }
}

//GET de todos os usuários
export async function GET(req: NextRequest): Promise<Response> {
  const authorization = req.headers.get("authorization");

  const permissionResult = await ValidarPermissao(
    authorization!,
    "tirar_relatorio"
  );

  if (permissionResult.hasPermission) {
    const users = await prisma.usersDashboard.findMany();
    return new Response(JSON.stringify({ users }), {
      status: 200,
    });
  } else {
    return new Response("Unauthorized", { status: 403 });
  }
}
