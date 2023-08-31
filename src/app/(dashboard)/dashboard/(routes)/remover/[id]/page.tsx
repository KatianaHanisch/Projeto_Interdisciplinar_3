"use client";

import { useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";

import Modal from "@/app/components/Modal";
import Button from "../../../components/Button";

import { FaArrowLeft } from "react-icons/fa";

import capaLivro from "../../../../../../../public/capa-livro-440.jpg";

const data = [
  {
    id: 1,
    nome: "Corte de espinhos e rosas",
    autor: "Sarah J. Mass",
    categoria: "ficção",
    sinopse:
      "Num mundo dividido uma muralha mágica separa duas espécies. De um lado, os feéricos vivem dentro de suas fronteiras cheias de beleza e mistério; do outro, os humanos possuem apenas medo, desconfiança e dificuldades. Feyre, filha de um casal de mercadores humanos e falidos, se torna caçadora para sustentar a família. Dura como as flechas que carrega, letal como sua pontaria, ela abandona as fantasias de garota e as troca pela árdua vida nas florestas ao redor de sua aldeia. Sua única alegria é observar as cores e sonhar em capturá-las. Mas, na floresta, coberta de neve tudo é branco e árido; como o ódio pelos feéricos que carrega no coração; Como as telas que não pode comprar ou colorir. Até que um enorme lobo cruza seu caminho... Sem hesitar, Feyre dispara... uma flecha. Um ato de rebelião. Após matar o lobo, uma criatura bestial surge exigindo uma reparação. Arrastada para além do muro, para uma terra mágica e traiçoeira - que ela só conhece por meio de lendas -, a jovem descobre que seu captor não é um animal, mas Tamlin, Grão Senhor da Terra Primaveril. Um feérico com um segredo, escondido sob uma máscara.  Ela descobre ainda que o então animal que havia assassinado era, na verdade, uma criatura mágica, uma fada zoomórfica transformada em lobo.À medida que ela descobre mais sobre este mundo onde a magia impera, seus sentimentos por Tamlin passam da mais pura hostilidade até uma paixão avassaladora. Enquanto isso, uma sinistra e antiga sombra avança sobre o mund­­o das fadas e Feyre deve provar seu amor para detê-la ou Tamlin e seu povo estarão condenados.",
  },
  {
    id: 2,
    nome: "Renegados",
    autor: "Marissa Meyer",
    categoria: "Ação e Aventura",
    sinopse:
      "Os Renegados são um grupo de prodígios – humanos com habilidades extraordinárias – que emergiram das ruínas de uma sociedade colapsada. Foram eles que estabeleceram a paz onde, antes, o caos reinava. Eles continuaram sendo um símbolo de esperança e coragem para todos... exceto para os vilões que foram derrotados por eles. Nova, que faz parte do grupo dos Anarquistas, tem um motivo para odiar os Renegados, e está em uma missão em busca de vingança. Enquanto se aproxima de seu alvo, ela conhece Adrian, um garoto Renegado que acredita na justiça – e em Nova. Mas a lealdade de Nova está com os Anarquistas e há um vilão que tem o poder de acabar com os dois, e em tudo que acreditam.",
  },
  {
    id: 3,
    nome: "A rainha vermelha",
    autor: "Victoria Aveyard",
    categoria: "ficção",
    sinopse:
      "O mundo de Mare Barrow é dividido pelo sangue: vermelho ou prateado. Mare e sua família são vermelhos: plebeus, humildes, destinados a servir uma elite prateada cujos poderes sobrenaturais os tornam quase deuses. Mare rouba o que pode para ajudar sua família a sobreviver e não tem esperanças de escapar do vilarejo miserável onde mora. Entretanto, numa reviravolta do destino, ela consegue um emprego no palácio real, onde, em frente ao rei e a toda a nobreza, descobre que tem um poder misterioso… Mas como isso seria possível, se seu sangue é vermelho? Em meio às intrigas dos nobres prateados, as ações da garota vão desencadear uma dança violenta e fatal, que colocará príncipe contra príncipe - e Mare contra seu próprio coração.",
  },
  {
    id: 4,
    nome: "O prícipe cruel",
    autor: "Holly Black",
    categoria: "Fantasia Épica",
    sinopse:
      "Jude tinha apenas sete anos quando seus pais foram brutalmente assasinados e ela e as irmãs levadas para viver no traiçoeiro Reino das Fadas. Dez anos depois, tudo o que Jude quer é se encaixar, mesmo sendo uma garota mortal. Mas todos os feéricos parecem desprezar os humanos... Especialmente o príncipe Cardan, o mais jovem e mais perverso dos filhos do Grande Rei de Elfhame. Para conquistar o tão desejado lugar na Corte, Jude precisa desafiar o príncipe - e enfrentar as consequências do ato. A garota passa, então, a se envolver cada vez mais nos jogos e intrigas do palácio, e acaba descobrindo a própria vocação para trapaças e derramamento de sangue. Mas quando uma traição ameaça afogar o Reindo das Fadas em violência, Jude precisará arriscar tudo em uma perigosa aliança para salvar suas irmãs - e a própria Elfhame. Cercada por mentiras e pessoas que desejam destruí-la , Jude terá que descobrir o verdadeiro significado da palavra poder antes que seja tarde demais.",
  },
  {
    id: 5,
    nome: "Os miseráveis",
    autor: "Victor Hugo",
    categoria: "Literatura e Ficção",
    sinopse:
      "Considerado a obra-prima de Victor Hugo, este romance se desdobra em muitos: é uma história de injustiça e heroísmo, mas também uma ode ao amor e também um panorama político e social da Paris do século XIX. Pela história de Jean Valjean, que ficou anos preso por roubar um pão para alimentar sua família e que sai da prisão determinado a deixar para trás seu passado criminoso, conhecemos a fundo a capital francesa e seu povo, o verdadeiro protagonista. Na via crucis que é o romance sobre a vida de Valjean, são retraçadas as misérias cotidianas e os dias de glória do povo francês, que fez das ruas seu campo de batalha e das barricadas a única proteção possível contra a violência cometida pela lei. Esta edição traz ainda uma esclarecedora apresentação de Renato Janine Ribeiro.",
  },
  {
    id: 6,
    nome: "Renegados",
    autor: "Marissa Meyer",
    categoria: "Ação e Aventura",
    sinopse:
      "Os Renegados são um grupo de prodígios – humanos com habilidades extraordinárias – que emergiram das ruínas de uma sociedade colapsada. Foram eles que estabeleceram a paz onde, antes, o caos reinava. Eles continuaram sendo um símbolo de esperança e coragem para todos... exceto para os vilões que foram derrotados por eles. Nova, que faz parte do grupo dos Anarquistas, tem um motivo para odiar os Renegados, e está em uma missão em busca de vingança. Enquanto se aproxima de seu alvo, ela conhece Adrian, um garoto Renegado que acredita na justiça – e em Nova. Mas a lealdade de Nova está com os Anarquistas e há um vilão que tem o poder de acabar com os dois, e em tudo que acreditam.",
  },
  {
    id: 7,
    nome: "A rainha vermelha",
    autor: "Victoria Aveyard",
    categoria: "ficção",
    sinopse:
      "O mundo de Mare Barrow é dividido pelo sangue: vermelho ou prateado. Mare e sua família são vermelhos: plebeus, humildes, destinados a servir uma elite prateada cujos poderes sobrenaturais os tornam quase deuses. Mare rouba o que pode para ajudar sua família a sobreviver e não tem esperanças de escapar do vilarejo miserável onde mora. Entretanto, numa reviravolta do destino, ela consegue um emprego no palácio real, onde, em frente ao rei e a toda a nobreza, descobre que tem um poder misterioso… Mas como isso seria possível, se seu sangue é vermelho? Em meio às intrigas dos nobres prateados, as ações da garota vão desencadear uma dança violenta e fatal, que colocará príncipe contra príncipe - e Mare contra seu próprio coração.",
  },
  {
    id: 8,
    nome: "O prícipe cruel",
    autor: "Holly Black",
    categoria: "Fantasia Épica",
    sinopse:
      "Jude tinha apenas sete anos quando seus pais foram brutalmente assasinados e ela e as irmãs levadas para viver no traiçoeiro Reino das Fadas. Dez anos depois, tudo o que Jude quer é se encaixar, mesmo sendo uma garota mortal. Mas todos os feéricos parecem desprezar os humanos... Especialmente o príncipe Cardan, o mais jovem e mais perverso dos filhos do Grande Rei de Elfhame. Para conquistar o tão desejado lugar na Corte, Jude precisa desafiar o príncipe - e enfrentar as consequências do ato. A garota passa, então, a se envolver cada vez mais nos jogos e intrigas do palácio, e acaba descobrindo a própria vocação para trapaças e derramamento de sangue. Mas quando uma traição ameaça afogar o Reindo das Fadas em violência, Jude precisará arriscar tudo em uma perigosa aliança para salvar suas irmãs - e a própria Elfhame. Cercada por mentiras e pessoas que desejam destruí-la , Jude terá que descobrir o verdadeiro significado da palavra poder antes que seja tarde demais.",
  },
  {
    id: 9,
    nome: "Os miseráveis",
    autor: "Victor Hugo",
    categoria: "Literatura e Ficção",
    sinopse:
      "Considerado a obra-prima de Victor Hugo, este romance se desdobra em muitos: é uma história de injustiça e heroísmo, mas também uma ode ao amor e também um panorama político e social da Paris do século XIX. Pela história de Jean Valjean, que ficou anos preso por roubar um pão para alimentar sua família e que sai da prisão determinado a deixar para trás seu passado criminoso, conhecemos a fundo a capital francesa e seu povo, o verdadeiro protagonista. Na via crucis que é o romance sobre a vida de Valjean, são retraçadas as misérias cotidianas e os dias de glória do povo francês, que fez das ruas seu campo de batalha e das barricadas a única proteção possível contra a violência cometida pela lei. Esta edição traz ainda uma esclarecedora apresentação de Renato Janine Ribeiro.",
  },
  {
    id: 10,
    nome: "A rainha vermelha",
    autor: "Victoria Aveyard",
    categoria: "ficção",
    sinopse:
      "O mundo de Mare Barrow é dividido pelo sangue: vermelho ou prateado. Mare e sua família são vermelhos: plebeus, humildes, destinados a servir uma elite prateada cujos poderes sobrenaturais os tornam quase deuses. Mare rouba o que pode para ajudar sua família a sobreviver e não tem esperanças de escapar do vilarejo miserável onde mora. Entretanto, numa reviravolta do destino, ela consegue um emprego no palácio real, onde, em frente ao rei e a toda a nobreza, descobre que tem um poder misterioso… Mas como isso seria possível, se seu sangue é vermelho? Em meio às intrigas dos nobres prateados, as ações da garota vão desencadear uma dança violenta e fatal, que colocará príncipe contra príncipe - e Mare contra seu próprio coração.",
  },
  {
    id: 11,
    nome: "O prícipe cruel",
    autor: "Holly Black",
    categoria: "Fantasia Épica",
    sinopse:
      "Jude tinha apenas sete anos quando seus pais foram brutalmente assasinados e ela e as irmãs levadas para viver no traiçoeiro Reino das Fadas. Dez anos depois, tudo o que Jude quer é se encaixar, mesmo sendo uma garota mortal. Mas todos os feéricos parecem desprezar os humanos... Especialmente o príncipe Cardan, o mais jovem e mais perverso dos filhos do Grande Rei de Elfhame. Para conquistar o tão desejado lugar na Corte, Jude precisa desafiar o príncipe - e enfrentar as consequências do ato. A garota passa, então, a se envolver cada vez mais nos jogos e intrigas do palácio, e acaba descobrindo a própria vocação para trapaças e derramamento de sangue. Mas quando uma traição ameaça afogar o Reindo das Fadas em violência, Jude precisará arriscar tudo em uma perigosa aliança para salvar suas irmãs - e a própria Elfhame. Cercada por mentiras e pessoas que desejam destruí-la , Jude terá que descobrir o verdadeiro significado da palavra poder antes que seja tarde demais.",
  },
  {
    id: 12,
    nome: "Os miseráveis",
    autor: "Victor Hugo",
    categoria: "Literatura e Ficção",
    sinopse:
      "Considerado a obra-prima de Victor Hugo, este romance se desdobra em muitos: é uma história de injustiça e heroísmo, mas também uma ode ao amor e também um panorama político e social da Paris do século XIX. Pela história de Jean Valjean, que ficou anos preso por roubar um pão para alimentar sua família e que sai da prisão determinado a deixar para trás seu passado criminoso, conhecemos a fundo a capital francesa e seu povo, o verdadeiro protagonista. Na via crucis que é o romance sobre a vida de Valjean, são retraçadas as misérias cotidianas e os dias de glória do povo francês, que fez das ruas seu campo de batalha e das barricadas a única proteção possível contra a violência cometida pela lei. Esta edição traz ainda uma esclarecedora apresentação de Renato Janine Ribeiro.",
  },
];

type Props = {
  id: number;
  nome: string;
  autor: string;
  categoria: string;
  sinopse: string;
};

export default function Page({ params }: { params: { id: string } }) {
  const [abrirModal, setAbrirModal] = useState(false);
  const [sinopseCompleta, setSinopseCompleta] = useState(false);

  const maxCaracteresSinopse = 800;

  const idLivro = parseInt(params.id);

  const [livroSelecionado]: Props[] = data.filter(
    (livro) => idLivro === livro.id
  );

  const { nome, autor, categoria, sinopse } = livroSelecionado;

  const abrirModalConfirmacao = () => {
    setAbrirModal(!abrirModal);
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="bg-gray-300 w-11/12 h-5/6 rounded-lg flex items-center justify-center shadow-md">
        <div className=" h-full w-10 py-5">
          <Link className="cursor-pointer" href="/dashboard/remover">
            <FaArrowLeft size={25} color={"#374151"} />
          </Link>
        </div>
        <div className="h-4/5 w-3/12 ">
          <Image src={capaLivro} alt="capa livro" className="rounded-md" />
        </div>
        <div className="flex flex-col items-start justify-start w-8/12 h-4/5  px-10 ">
          <h1 className="text-3xl font-semibold  text-gray-700 mb-5">{nome}</h1>
          <p
            className={`text-gray-600 text-left text-base max-h-56${
              sinopseCompleta ? "max-h-56 overflow-y-auto" : ""
            }`}
          >
            {sinopseCompleta
              ? sinopse
              : `${sinopse.substring(0, maxCaracteresSinopse)}...`}
          </p>
          {sinopse.length > maxCaracteresSinopse && (
            <button
              className="text-indigo-700 mt-2 underline cursor-pointer"
              onClick={() => setSinopseCompleta(!sinopseCompleta)}
            >
              {sinopseCompleta ? "Mostrar Menos" : "Leia Mais"}
            </button>
          )}
          <div className="w-full py-7 flex items-center justify-start">
            <Button
              tituloButton="Remover livro"
              abrirModal={abrirModalConfirmacao}
            />
          </div>

          {abrirModal && (
            <Modal
              abrirModal={abrirModalConfirmacao}
              title="Deseja confirmar?"
              textButton="Remover"
            >
              <div className="relative py-3 px-6  flex flex-col gap-3 mb-2">
                <p className="text-gray-600 text-lg font-normal leading-relaxed">
                  Você realmente deseja remover o livro
                  <span className="font-semibold text-gray-700"> {nome} </span>
                  da biblioteca?
                </p>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}
