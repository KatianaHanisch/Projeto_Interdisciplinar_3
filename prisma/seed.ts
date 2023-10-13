// Não estava encontrando o caminho
// import { prisma } from "@/app/utils/Prisma";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const role = await prisma.roles.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "admin",
      adicionar_livro: true,
      remover_livro: true,
      confirmar_retirada: true,
      confirmar_devolucao: true,
      adicionar_usuario: true,
      remover_usuario: true,
      editar_usuario: true,
      tirar_relatorio: true,
    },
  });
  const role2 = await prisma.roles.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "relatorio",
      adicionar_livro: false,
      remover_livro: false,
      confirmar_retirada: false,
      confirmar_devolucao: false,
      adicionar_usuario: false,
      remover_usuario: false,
      editar_usuario: false,
      tirar_relatorio: true,
    },
  });

  const user = await prisma.usersDashboard.upsert({
    where: { email: "admin@admin" },
    update: {},
    create: {
      email: "admin@admin",
      name: "Admin",
      password: "$2a$12$GTSz2ULXhjfMmWdFONWBG.ZKVMdih5xoBiaRC5yPlF0dkB572QAOi",
      role_id: role.id,
    },
  });

  const livro = await prisma.livros.upsert({
    where: { id: 1 },
    update: {},
    create: {
      titulo: "A rainha vermelha",
      autor: "Victoria Aveyard",
      categoria: "fantasia",
      sinopse:
        "O mundo de Mare Barrow é dividido pelo sangue: vermelho ou prateado. Mare e sua família são vermelhos: plebeus, humildes, destinados a servir uma elite prateada cujos poderes sobrenaturais os tornam quase deuses. Mare rouba o que pode para ajudar sua família a sobreviver e não tem esperanças de escapar do vilarejo miserável onde mora. Entretanto, numa reviravolta do destino, ela consegue um emprego no palácio real, onde, em frente ao rei e a toda a nobreza, descobre que tem um poder misterioso… Mas como isso seria possível, se seu sangue é vermelho? Em meio às intrigas dos nobres prateados, as ações da garota vão desencadear uma dança violenta e fatal, que colocará príncipe contra príncipe - e Mare contra seu próprio coração.",
      capaUrl:
        "https://res.cloudinary.com/dtlenywzp/image/upload/v1695844537/projeto_interdisplinar_uplouds/dakmm7syj6pooylkaqww.jpg",
    },
  });
  const livro2 = await prisma.livros.upsert({
    where: { id: 2 },
    update: {},
    create: {
      titulo: "A rebelde do deserto",
      autor: "Alwyn Hamilton",
      categoria: "ficção",
      sinopse:
        "O destino do deserto está nas mãos de Amani Al’Hiza ― uma garota feita de fogo e pólvora, com o dedo sempre no gatilho. O deserto de Miraji é governado por mortais, mas criaturas míticas rondam as áreas mais selvagens e remotas, e há boatos de que, em algum lugar, os djinnis ainda praticam magia. De toda maneira, para os humanos o deserto é um lugar impiedoso, principalmente se você é pobre, órfão ou mulher. Amani Al’Hiza é as três coisas. Apesar de ser uma atiradora talentosa, dona de uma mira perfeita, ela não consegue escapar da Vila da Poeira, uma cidadezinha isolada que lhe oferece como futuro um casamento forçado e a vida submissa que virá depois dele. Para Amani, ir embora dali é mais do que um desejo ― é uma necessidade. Mas ela nunca imaginou que fugiria galopando num cavalo mágico com o exército do sultão na sua cola, nem que um forasteiro misterioso seria responsável por lhe revelar o deserto que ela achava que conhecia e uma força que ela nem imaginava possuir.",
      capaUrl:
        "https://res.cloudinary.com/dtlenywzp/image/upload/v1695844977/projeto_interdisplinar_uplouds/s2zznksdvcccjq4oyqzj.jpg",
    },
  });
  const livro3 = await prisma.livros.upsert({
    where: { id: 3 },
    update: {},
    create: {
      titulo: "O príncipe cruel",
      autor: "Holly Black",
      categoria: "fantasia épica",
      sinopse:
        "Jude tinha apenas sete anos quando seus pais foram brutalmente assasinados e ela e as irmãs levadas para viver no traiçoeiro Reino das Fadas. Dez anos depois, tudo o que Jude quer é se encaixar, mesmo sendo uma garota mortal. Mas todos os feéricos parecem desprezar os humanos... Especialmente o príncipe Cardan, o mais jovem e mais perverso dos filhos do Grande Rei de Elfhame. Para conquistar o tão desejado lugar na Corte, Jude precisa desafiar o príncipe - e enfrentar as consequências do ato. A garota passa, então, a se envolver cada vez mais nos jogos e intrigas do palácio, e acaba descobrindo a própria vocação para trapaças e derramamento de sangue. Mas quando uma traição ameaça afogar o Reindo das Fadas em violência, Jude precisará arriscar tudo em uma perigosa aliança para salvar suas irmãs - e a própria Elfhame. Cercada por mentiras e pessoas que desejam destruí-la , Jude terá que descobrir o verdadeiro significado da palavra poder antes que seja tarde demais.",
      capaUrl:
        "https://res.cloudinary.com/dtlenywzp/image/upload/v1695845172/projeto_interdisplinar_uplouds/mifmu2mtsagfumhzzxym.jpg",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
