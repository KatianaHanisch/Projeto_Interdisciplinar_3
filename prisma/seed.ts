// Não estava encontrando o caminho
import { prisma } from "@/app/utils/Prisma";

async function createLivro(data: any) {
  const livro = await prisma.livros.upsert({
    where: { titulo: data.titulo },
    update: {},
    create: data,
  });

  return livro;
}

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

  const livrosData = [
    {
      titulo: "A rainha vermelha",
      autor: "Victoria Aveyard",
      categoria: "fantasia",
      sinopse:
        "O mundo de Mare Barrow é dividido pelo sangue: vermelho ou prateado. Mare e sua família são vermelhos: plebeus, humildes, destinados a servir uma elite prateada cujos poderes sobrenaturais os tornam quase deuses. Mare rouba o que pode para ajudar sua família a sobreviver e não tem esperanças de escapar do vilarejo miserável onde mora. Entretanto, numa reviravolta do destino, ela consegue um emprego no palácio real, onde, em frente ao rei e a toda a nobreza, descobre que tem um poder misterioso… Mas como isso seria possível, se seu sangue é vermelho? Em meio às intrigas dos nobres prateados, as ações da garota vão desencadear uma dança violenta e fatal, que colocará príncipe contra príncipe - e Mare contra seu próprio coração.",
      capaUrl:
        "https://res.cloudinary.com/dtlenywzp/image/upload/v1695844537/projeto_interdisplinar_uplouds/dakmm7syj6pooylkaqww.jpg",
    },
    {
      titulo: "A rebelde do deserto",
      autor: "Alwyn Hamilton",
      categoria: "ficção",
      sinopse:
        "O destino do deserto está nas mãos de Amani Al’Hiza ― uma garota feita de fogo e pólvora, com o dedo sempre no gatilho. O deserto de Miraji é governado por mortais, mas criaturas míticas rondam as áreas mais selvagens e remotas, e há boatos de que, em algum lugar, os djinnis ainda praticam magia. De toda maneira, para os humanos o deserto é um lugar impiedoso, principalmente se você é pobre, órfão ou mulher. Amani Al’Hiza é as três coisas. Apesar de ser uma atiradora talentosa, dona de uma mira perfeita, ela não consegue escapar da Vila da Poeira, uma cidadezinha isolada que lhe oferece como futuro um casamento forçado e a vida submissa que virá depois dele. Para Amani, ir embora dali é mais do que um desejo ― é uma necessidade. Mas ela nunca imaginou que fugiria galopando num cavalo mágico com o exército do sultão na sua cola, nem que um forasteiro misterioso seria responsável por lhe revelar o deserto que ela achava que conhecia e uma força que ela nem imaginava possuir.",
      capaUrl:
        "https://res.cloudinary.com/dtlenywzp/image/upload/v1695844977/projeto_interdisplinar_uplouds/s2zznksdvcccjq4oyqzj.jpg",
    },
    {
      titulo: "O príncipe cruel",
      autor: "Holly Black",
      categoria: "fantasia épica",
      sinopse:
        "Jude tinha apenas sete anos quando seus pais foram brutalmente assasinados e ela e as irmãs levadas para viver no traiçoeiro Reino das Fadas. Dez anos depois, tudo o que Jude quer é se encaixar, mesmo sendo uma garota mortal. Mas todos os feéricos parecem desprezar os humanos... Especialmente o príncipe Cardan, o mais jovem e mais perverso dos filhos do Grande Rei de Elfhame. Para conquistar o tão desejado lugar na Corte, Jude precisa desafiar o príncipe - e enfrentar as consequências do ato. A garota passa, então, a se envolver cada vez mais nos jogos e intrigas do palácio, e acaba descobrindo a própria vocação para trapaças e derramamento de sangue. Mas quando uma traição ameaça afogar o Reindo das Fadas em violência, Jude precisará arriscar tudo em uma perigosa aliança para salvar suas irmãs - e a própria Elfhame. Cercada por mentiras e pessoas que desejam destruí-la , Jude terá que descobrir o verdadeiro significado da palavra poder antes que seja tarde demais.",
      capaUrl:
        "https://res.cloudinary.com/dtlenywzp/image/upload/v1695845172/projeto_interdisplinar_uplouds/mifmu2mtsagfumhzzxym.jpg",
    },
    {
      titulo: "O conde de monte cristo",
      autor: "Alexandre Dumas",
      categoria: "Literatura",
      sinopse:
        "Um dos maiores clássicos da literatura francesa há mais de 150 anos, “O conde de Monte-Cristo” gira em torno de Edmond Dantè, que é preso por um crime que não cometeu. Ao sair da prisão, Edmond vai à busca de vingança contra seus inimigos. Uma trama repleta de reviravoltas dignas de um jogo de xadrez.",
      capaUrl:
        "https://res.cloudinary.com/dtlenywzp/image/upload/v1697556730/projeto_interdisplinar_uplouds/lynpcyv19a9ogyhiml4o.jpg",
    },
    {
      titulo: "Os miseraveis",
      autor: "Victor Hugo",
      categoria: "Literatura",
      sinopse:
        "Um clássico da literatura mundial, esta obra é uma poderosa denúncia a todos os tipos de injustiça humana. Narra a emocionante história de Jean Valjean ― o homem que, por ter roubado um pão, é condenado a dezenove anos de prisão. Os miseráveis é um livro inquietantemente religioso e político, com uma das narrativas mais envolventes já criadas.",
      capaUrl:
        "https://res.cloudinary.com/dtlenywzp/image/upload/v1697556758/projeto_interdisplinar_uplouds/igvpsn1n6tdzkf1wtvcj.jpg",
    },
    {
      titulo: "Nevernight",
      autor: "Jay Kristoff",
      categoria: "Fantasia",
      sinopse:
        "Destinada a destruir impérios, Mia Corvere é apenas uma criança quando tem sua primeira lição sobre a morte. Mais tarde, aos 16 anos, a jovem que cresceu nas sombras inicia sua jornada para manter a promessa feita no dia em que perdeu tudo. Entretanto, a chance de vencer inimigos tão poderosos será efêmera, e se Mia deseja vingança, deve se tornar uma assassina sem igual. Assim, ela precisará provar suas habilidades diante dos mais perigosos amigos e inimigos, e sobreviver a assassinos, mentirosos e demônios no cerne de um lugar que cultua o assassinato. A Igreja Vermelha não é uma escola comum, mas Mia Corvere também não é uma estudante qualquer. As sombras a acompanham, e bebem todo seu medo. Nevernight é o primeiro volume da trilogia best-seller As crônicas da quasinoite, agora em sua segunda edição.",
      capaUrl:
        "https://res.cloudinary.com/dtlenywzp/image/upload/v1697556785/projeto_interdisplinar_uplouds/fzkgi1t4vfdq7ycdw6qj.jpg",
    },
    {
      titulo: "A guerra da papoula",
      autor: "R. F. Kuang",
      categoria: "Fantasia",
      sinopse:
        "A guerra está no coração do Império Nikara, e o ópio corre em suas veias. No passado, os heróis que formaram a Trindade uniram a nação contra a poderosa Federação de Mugen, e acreditava-se que eles caminhavam entre os deuses. Décadas depois, a paz reina, mas há boatos de que a Terceira Guerra da Papoula pode estourar a qualquer momento, e a academia militar mais prestigiada do Império prepara seus estudantes para o combate: filhos da elite e, inesperadamente, uma órfã de guerra. Obrigada a se casar com um homem asqueroso, a jovem Rin fez de tudo para reescrever o próprio destino. Estudou para o exame imperial por pura teimosia e, quando conseguiu uma vaga na academia, acreditou estar salva. Mas ela logo aprende que uma garota pobre e de pele escura não tem muito valor naquele lugar. Hostilizada pelos professores e colegas, Rin treina com afinco. Com a ajuda de um mestre excêntrico e de substâncias psicoativas, a jovem passa a cultivar poderes xamânicos e a acessar a força incandescente de uma deusa vingativa, a perigosa Fênix. Quando o conflito com o país vizinho eclode, Rin entende que, para ganhar a guerra, talvez tenha que perder sua humanidade.",
      capaUrl:
        "https://res.cloudinary.com/dtlenywzp/image/upload/v1697556830/projeto_interdisplinar_uplouds/wgaxsjzr7rtpdvpedquf.jpg",
    },
    {
      titulo: "A sociedade de Atlas",
      autor: "Olivie Blake",
      categoria: "Fantasia",
      sinopse:
        "Conhecimento é carnificina. É isso que vão descobrir os mágicos selecionados para a iniciação na Sociedade Alexandrina, instituição secreta que abriga os guardiões do conhecimento perdido das grandes civilizações da Antiguidade. Aqueles que conquistam um lugar entre os Alexandrinos se tornam símbolos de riqueza, poder e prestígio. A cada década, são convocados apenas os seis mágicos mais talentosos e excepcionais do mundo. Dessa vez, são: Libby Rhodes e Nico de Varona, que conseguem controlar todos os elementos da fisicalidade; Reina Mori, naturalista capaz de intuir a linguagem da vida; Parisa Kamali, telepata que navega pelas entranhas do subconsciente; Callum Nova, empata que manipula os desejos e vontades das pessoas; e Tristan Caine, que possui a rara habilidade de ver através das ilusões e criar uma nova estrutura da realidade. Recrutados pelo misterioso Atlas Blakely, os seis terão um ano para provar a serventia de seus poderes à Sociedade e precisarão trabalhar juntos para decifrar enigmas envolvendo tempo e espaço, acaso e destino, vida e morte. Mas apenas cinco poderão concluir a iniciação. Conforme são desafiados por missões cada vez mais sombrias, os mágicos vão descobrir que conhecimento é poder e que o poder é viciante e perigoso, principalmente ao cair nas mãos erradas.",
      capaUrl:
        "https://res.cloudinary.com/dtlenywzp/image/upload/v1697556881/projeto_interdisplinar_uplouds/hjsaxtnhte69vvtjekzb.jpg",
    },
  ];

  for (const livroData of livrosData) {
    await createLivro(livroData);
  }
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
