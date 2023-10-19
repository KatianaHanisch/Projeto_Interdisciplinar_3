import { jsPDF } from "jspdf";
import { DadosListaProps } from "@/app/types/DashboardTypes";

export default function relatoriosPDF(informacoes: DadosListaProps[]) {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("Relatório", 92, 18);

  // Define table settings
  const margin = 10;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const tableWidth = pageWidth - 2 * margin;
  const startY = 25; // Posição inicial da tabela com espaço maior para o cabeçalho
  const headerHeight = 12; // Altura do cabeçalho
  const rowHeight = 10;
  let colWidthNome = tableWidth * 0.18; // Largura da coluna "Nome"
  let colWidthTelefone = tableWidth * 0.25; // Largura da coluna "Telefone"
  let colWidthLivro = tableWidth * 0.25; // Largura da coluna "Livro"
  let colWidthStatus = tableWidth * 0.34; // Largura da coluna "Status"

  // Margem interna menor
  const cellPadding = 1;

  // Inicializa as variáveis
  let currentY = startY;

  // Cabeçalho da tabela
  doc.setFillColor(0, 153, 153); // Cor azul
  doc.rect(margin, currentY, colWidthNome, headerHeight, "F");
  doc.rect(
    margin + colWidthNome,
    currentY,
    colWidthTelefone,
    headerHeight,
    "F"
  );
  doc.rect(
    margin + colWidthNome + colWidthTelefone,
    currentY,
    colWidthLivro,
    headerHeight,
    "F"
  );
  doc.rect(
    margin + colWidthNome + colWidthTelefone + colWidthLivro,
    currentY,
    colWidthStatus,
    headerHeight,
    "F"
  );
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255); // Texto em branco
  doc.setFont("helvetica", "bold");
  doc.text(
    "Nome",
    margin + colWidthNome / 2,
    currentY + headerHeight / 2 + cellPadding
  );
  doc.text(
    "Telefone",
    margin + colWidthNome + colWidthTelefone / 2,
    currentY + headerHeight / 2 + cellPadding
  );
  doc.text(
    "Livro",
    margin + colWidthNome + colWidthTelefone + colWidthLivro / 2,
    currentY + headerHeight / 2 + cellPadding
  );
  doc.text(
    "Status",
    margin +
      colWidthNome +
      colWidthTelefone +
      colWidthLivro +
      colWidthStatus / 2,
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

  informacoes.forEach((dado, index) => {
    // Verifica se a página atual está cheia e, se sim, adiciona uma nova página
    if (index % maxRowsPerPage === 0 && index !== 0) {
      doc.addPage();
      pageCount++;
      currentY = startY;

      // Redesenha o cabeçalho em cada nova página
      doc.setFillColor(0, 0, 255);
      doc.rect(margin, currentY, colWidthNome, headerHeight, "F");
      doc.rect(
        margin + colWidthNome,
        currentY,
        colWidthTelefone,
        headerHeight,
        "F"
      );
      doc.rect(
        margin + colWidthNome + colWidthTelefone,
        currentY,
        colWidthLivro,
        headerHeight,
        "F"
      );
      doc.rect(
        margin + colWidthNome + colWidthTelefone + colWidthLivro,
        currentY,
        colWidthStatus,
        headerHeight,
        "F"
      );
      doc.setFontSize(14);
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.text(
        "Nome",
        margin + colWidthNome / 2,
        currentY + headerHeight / 2 + cellPadding
      );
      doc.text(
        "Telefone",
        margin + colWidthNome + colWidthTelefone / 2,
        currentY + headerHeight / 2 + cellPadding
      );
      doc.text(
        "Livro",
        margin + colWidthNome + colWidthTelefone + colWidthLivro / 2,
        currentY + headerHeight / 2 + cellPadding
      );
      doc.text(
        "Status",
        margin +
          colWidthNome +
          colWidthTelefone +
          colWidthLivro +
          colWidthStatus / 2,
        currentY + headerHeight / 2 + cellPadding
      );
      currentY += headerHeight;
    }

    // Define a cor de fundo com base no índice da linha (zebrado)
    const fillColor = index % 2 === 0 ? evenRowColor : oddRowColor;

    // Desenha o fundo da célula com a cor apropriada
    doc.setFillColor(fillColor[0], fillColor[1], fillColor[2]);
    doc.rect(margin, currentY, colWidthNome, rowHeight, "F");
    doc.rect(margin + colWidthNome, currentY, colWidthTelefone, rowHeight, "F");
    doc.rect(
      margin + colWidthNome + colWidthTelefone,
      currentY,
      colWidthLivro,
      rowHeight,
      "F"
    );
    doc.rect(
      margin + colWidthNome + colWidthTelefone + colWidthLivro,
      currentY,
      colWidthStatus,
      rowHeight,
      "F"
    );

    // Define o texto nas células
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0); // Texto em preto
    doc.setFont("helvetica", "normal");
    doc.text(
      dado.nome || "",
      margin + colWidthNome / 2,
      currentY + rowHeight / 2 + cellPadding
    );
    doc.text(
      dado.telefone || "",
      margin + colWidthNome + colWidthTelefone / 2,
      currentY + rowHeight / 2 + cellPadding
    );
    doc.text(
      dado.livro || "",
      margin + colWidthNome + colWidthTelefone + colWidthLivro / 2,
      currentY + rowHeight / 2 + cellPadding
    );
    doc.text(
      dado.status ? dado.status.toString() : "",
      margin +
        colWidthNome +
        colWidthTelefone +
        colWidthLivro +
        colWidthStatus / 2,
      currentY + rowHeight / 2 + cellPadding
    );

    // Incrementa a posição Y para a próxima linha
    currentY += rowHeight;
  });

  // Desenha o número da página e o rodapé
  doc.setFontSize(9);
  doc.text(`@Livreto - Página ${pageCount}`, pageWidth / 2, pageHeight - 10);

  doc.save("Relatório.pdf");
}
