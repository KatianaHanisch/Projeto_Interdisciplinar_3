import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface RoleInfo {
  id: number;
  name: string;
  adicionar_livro: boolean;
  remover_livro: boolean;
  confirmar_retirada: boolean;
  confirmar_devolucao: boolean;
  adicionar_usuario: boolean;
  remover_usuario: boolean;
  editar_usuario: boolean;
  tirar_relatorio: boolean;
}

export default async function validarPermissao(
  token: string,
  permissao: string
): Promise<{
  hasPermission: boolean;
}> {
  const secretKey = process.env.SECRETKEY;

  try {
    const tokenWithoutBearer = token.replace("Bearer ", "");

    const decodedToken: any = jwt.verify(tokenWithoutBearer, secretKey!);

    const roleInfo = await prisma.roles.findUnique({
      where: {
        id: decodedToken.role,
      },
    });

    if (roleInfo) {
      switch (permissao) {
        case "adicionar_livro":
          if (roleInfo.adicionar_livro) {
            return {
              hasPermission: true,
            };
          }
          break;
        case "remover_livro":
          if (roleInfo.remover_livro) {
            return {
              hasPermission: true,
            };
          }
          break;
        case "confirmar_retirada":
          if (roleInfo.confirmar_retirada) {
            return {
              hasPermission: true,
            };
          }
          break;
        case "confirmar_devolucao":
          if (roleInfo.confirmar_devolucao) {
            return {
              hasPermission: true,
            };
          }
          break;
        case "adicionar_usuario":
          if (roleInfo.adicionar_usuario) {
            return {
              hasPermission: true,
            };
          }
          break;
        case "remover_usuario":
          if (roleInfo.remover_usuario) {
            return {
              hasPermission: true,
            };
          }
          break;
        case "editar_usuario":
          if (roleInfo.editar_usuario) {
            return {
              hasPermission: true,
            };
          }
          break;
        case "tirar_relatorio":
          if (roleInfo.tirar_relatorio) {
            return {
              hasPermission: true,
            };
          }
          break;
        default:
          break;
      }
    }

    return {
      hasPermission: false,
    };
  } catch (error) {
    console.error("Erro na validação do token: " + error);
    return {
      hasPermission: false,
    };
  }
}
