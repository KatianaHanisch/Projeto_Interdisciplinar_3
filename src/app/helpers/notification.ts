import nodemailer from "./nodemailer";
import cron from "node-cron";
import { format, addDays, isAfter } from "date-fns";

// Função para enviar e-mails de aviso
async function enviarEmailAviso(usuarioEmail: string, livroNome: string) {
  console.log(usuarioEmail, livroNome);

  const mailOptions = {
    from: "i97711662@gmail.com",
    to: usuarioEmail,
    subject: "Devolução",
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
  <p style="color: #333;">O tempo limite para a devolução do livro ${livroNome} chegou, faça a devolução na Biblioteca mais proxíma.</p>

</body>
</html>
`,
  };

  try {
    await nodemailer.sendMail(mailOptions);
  } catch (error) {
    console.error(`Erro ao enviar e-mail: ${error}`);
  }
}

async function verificarEmprestimosPendentes() {
  // console.log(process.env.TOKENUSER);
  try {
    const response = await fetch(
      "http://localhost:3000/api/dashboard/emprestimosPendentes",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMxLCJlbWFpbCI6ImFkbWluQGFkbWluIiwibmFtZSI6IkFkbWluIiwicm9sZSI6MSwiaWF0IjoxNjk4NjcyMjA2fQ.Zouh7hqRnlODHTqmG5nteOtGl9MaoYvm6yoXWiQvyEM`,
        },
      }
    );

    const emprestimosPendentes = await response.json();
    const dataAtual = new Date();

    const emprestimosAtrasados = emprestimosPendentes.filter(
      (emprestimo: any) => {
        const dataEmprestimo = new Date(emprestimo.dataEmprestimo);
        const dataLimite = addDays(dataEmprestimo, 30);

        return isAfter(dataAtual, dataLimite);
      }
    );

    for (const emprestimo of emprestimosAtrasados) {
      const { email, livro } = emprestimo;
      enviarEmailAviso(email, livro);
    }
  } catch (error) {
    console.error(`Erro ao verificar empréstimos pendentes: ${error}`);
  }
}

cron.schedule("0 0 * * *", () => {
  verificarEmprestimosPendentes();
});
