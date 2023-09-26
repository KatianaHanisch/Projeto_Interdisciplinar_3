import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Biblioteca - Sobre",
};

import { AiFillGithub } from "react-icons/ai";

export default function page() {
  return (
    <section className="max-w-[1200px] m-auto mt-32 mb-32 px-3">
      <h1 className="text-center text-4xl font-medium mb-4">SOBRE</h1>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum
        recusandae architecto iure debitis vero illo ipsam neque, ex totam non
        voluptatum porro doloribus aliquam, quis natus in enim maiores odit.
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam earum
        explicabo expedita consectetur accusamus dicta, ullam nesciunt
        doloremque totam reprehenderit dolorem consequuntur quibusdam ea
        blanditiis consequatur inventore ad laboriosam. Explicabo? Lorem ipsum
        dolor, sit amet consectetur adipisicing elit. Earum recusandae
        architecto iure debitis vero illo ipsam neque, ex totam non voluptatum
        porro doloribus aliquam, quis natus in enim maiores odit. Lorem ipsum
        dolor, sit amet consectetur adipisicing elit. Nam earum explicabo
        expedita consectetur accusamus dicta, ullam nesciunt doloremque totam
        reprehenderit dolorem consequuntur quibusdam ea blanditiis consequatur
        inventore ad laboriosam. Explicabo?
      </p>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum
        recusandae architecto iure debitis vero illo ipsam neque, ex totam non
        voluptatum porro doloribus aliquam, quis natus in enim maiores odit.
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam earum
        explicabo expedita consectetur accusamus dicta, ullam nesciunt
        doloremque totam reprehenderit dolorem consequuntur quibusdam ea
        blanditiis consequatur inventore ad laboriosam. Explicabo? Lorem ipsum
        dolor, sit amet consectetur adipisicing elit. Earum recusandae
        architecto iure debitis vero illo ipsam neque, ex totam non voluptatum
        porro doloribus aliquam, quis natus in enim maiores odit. Lorem ipsum
        dolor, sit amet consectetur adipisicing elit. Nam earum explicabo
        expedita consectetur accusamus dicta, ullam nesciunt doloremque totam
        reprehenderit dolorem consequuntur quibusdam ea blanditiis consequatur
        inventore ad laboriosam. Explicabo?
      </p>
      <div>
        <Link
          href="https://github.com/katianahanisch"
          target="_blank"
          className="flex text-xl gap-1 mt-4 items-center"
        >
          <AiFillGithub /> Katiana Hanisch
        </Link>
        <Link
          href="https://github.com/iagoaparecido"
          target="_blank"
          className="flex text-xl mt-1 gap-1 items-center"
        >
          <AiFillGithub /> Iago Aparecido
        </Link>
      </div>
    </section>
  );
}
