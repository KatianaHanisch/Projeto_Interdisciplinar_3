import { jsPDF } from "jspdf";
import { DadosListaProps } from "@/app/types/DashboardTypes";

type TipoProps = {
  retirado: {
    titulo1: string;
    titulo2: string;
    dado1: string;
    dado2: string;
    tituloRelatorio: string;
  };
  pendentes: {
    titulo1: string;
    titulo2: string;
    dado1: string;
    dado2: string;
    tituloRelatorio: string;
  };
  finalizado: {
    titulo1: string;
    titulo2: string;
    dado1: string;
    dado2: string;
    tituloRelatorio: string;
  };
};

export default function relatoriosPDF(
  informacoes: DadosListaProps[],
  tipo: keyof TipoProps
) {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");

  const mapeamento: TipoProps = {
    retirado: {
      titulo1: "Empréstimo",
      titulo2: "Vencimento",
      dado1: "dataEmprestimo",
      dado2: "dataVencimento",
      tituloRelatorio: "Retiradas",
    },
    pendentes: {
      titulo1: "Retirada",
      titulo2: "Vencimento",
      dado1: "dataRetirada",
      dado2: "dataVencimento",
      tituloRelatorio: "Emprestimos",
    },
    finalizado: {
      titulo1: "Empréstimo",
      titulo2: "Devolução",
      dado1: "dataEmprestimo",
      dado2: "dataDevolucao",
      tituloRelatorio: "Finalizados",
    },
  };

  const { titulo1, titulo2, dado1, dado2, tituloRelatorio } = mapeamento[tipo];

  doc.text(`Relatório ${tituloRelatorio}`, 75, 18);

  // Define table settings
  const margin = 8;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const numColumns = 6; // Número de colunas na tabela
  const tableWidth = pageWidth - 2 * margin;
  const columnWidth = tableWidth / numColumns;
  const startY = 25; // Posição inicial da tabela com espaço maior para o cabeçalho
  const headerHeight = 12; // Altura do cabeçalho
  const rowHeight = 10;

  // Margem interna menor
  const cellPadding = 1;

  // Inicializa as variáveis
  let currentY = startY;

  // Cabeçalho da tabela
  doc.setFillColor(0, 153, 153); // Cor azul
  for (let i = 0; i < numColumns; i++) {
    doc.rect(
      margin + i * columnWidth,
      currentY,
      columnWidth,
      headerHeight,
      "F"
    );
  }

  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255); // Texto em branco
  doc.setFont("helvetica", "bold");
  doc.text(
    "Nome",
    margin + columnWidth / 3.5,
    currentY + headerHeight / 2 + cellPadding
  );
  doc.text(
    "Telefone",
    margin + columnWidth * 1,
    currentY + headerHeight / 2 + cellPadding
  );
  doc.text(
    "Livro",
    margin + columnWidth * 2,
    currentY + headerHeight / 2 + cellPadding
  );
  doc.text(
    titulo1,
    margin + columnWidth * 3.3,
    currentY + headerHeight / 2 + cellPadding
  );
  doc.text(
    titulo2,
    margin + columnWidth * 4.3,
    currentY + headerHeight / 2 + cellPadding
  );
  doc.text(
    "Status",
    margin + columnWidth * 5.3,
    currentY + headerHeight / 2 + cellPadding
  );

  // Atualiza a posição Y para a próxima linha (abaixo do cabeçalho)
  currentY += headerHeight;

  // Cálculo do número máximo de linhas por página
  const maxRowsPerPage = Math.floor((pageHeight - currentY) / rowHeight);

  // Inicializa o contador de páginas
  let pageCount = 1;

  // Define cores para as células zebradas
  const evenRowColor = [255, 255, 255]; // Branco
  const oddRowColor = [230, 230, 230]; // Cinza

  informacoes.forEach((dado: any, index) => {
    // Verifica se a página atual está cheia e, se sim, adiciona uma nova página
    if (index % maxRowsPerPage === 0 && index !== 0) {
      doc.addPage();
      pageCount++;
      currentY = startY;

      // Redesenha o cabeçalho em cada nova página
      doc.setFillColor(0, 153, 153); // Cor azul
      for (let i = 0; i < numColumns; i++) {
        doc.rect(
          margin + i * columnWidth,
          currentY,
          columnWidth,
          headerHeight,
          "F"
        );
      }
      doc.setFontSize(14);
      doc.setTextColor(255, 255, 255); // Texto em branco
      doc.setFont("helvetica", "bold");
      doc.text(
        "Nome",
        margin + columnWidth / 1.8,
        currentY + headerHeight / 2 + cellPadding
      );
      doc.text(
        "Telefone",
        margin + columnWidth * 2,
        currentY + headerHeight / 2 + cellPadding
      );
      doc.text(
        "Livro",
        margin + columnWidth * 2,
        currentY + headerHeight / 2 + cellPadding
      );
      doc.text(
        titulo1,
        margin + columnWidth * 3.4,
        currentY + headerHeight / 2 + cellPadding
      );
      doc.text(
        titulo2,
        margin + columnWidth * 4.2,
        currentY + headerHeight / 2 + cellPadding
      );
      doc.text(
        "Status",
        margin + columnWidth * 5.3,
        currentY + headerHeight / 2 + cellPadding
      );
      currentY += headerHeight;
    }

    // Define a cor de fundo com base no índice da linha (zebrado)
    const fillColor = index % 2 === 0 ? evenRowColor : oddRowColor;

    // Desenha o fundo da célula com a cor apropriada
    for (let i = 0; i < numColumns; i++) {
      doc.setFillColor(fillColor[0], fillColor[1], fillColor[2]);
      doc.rect(margin + i * columnWidth, currentY, columnWidth, rowHeight, "F");
    }

    // Define o texto nas células
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0); // Texto em preto
    doc.setFont("helvetica", "normal");
    doc.text(
      dado.nome || "",
      margin + columnWidth / 3.5,
      currentY + rowHeight / 2 + cellPadding
    );
    doc.text(
      dado.telefone || "",
      margin + columnWidth * 1,
      currentY + rowHeight / 2 + cellPadding
    );
    doc.text(
      dado.livro || "",
      margin + columnWidth * 2,
      currentY + rowHeight / 2 + cellPadding
    );
    doc.text(
      dado[dado1] || "",
      margin + columnWidth * 3.4,
      currentY + rowHeight / 2 + cellPadding
    );
    doc.text(
      dado[dado2] || "",
      margin + columnWidth * 4.3,
      currentY + rowHeight / 2 + cellPadding
    );
    doc.text(
      dado.status ? dado.status.toString() : "",
      margin + columnWidth * 5.3,
      currentY + rowHeight / 2 + cellPadding
    );

    // Incrementa a posição Y para a próxima linha
    currentY += rowHeight;
  });

  // Desenha o número da página e o rodapé
  doc.setFontSize(9);
  doc.text(`@Livreto - Página ${pageCount}`, pageWidth / 2, pageHeight - 10);

  doc.save(`Relatório ${tituloRelatorio}.pdf`);
}
