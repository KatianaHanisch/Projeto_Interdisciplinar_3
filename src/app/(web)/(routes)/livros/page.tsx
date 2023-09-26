import React from "react";
import ListAllBooks from "../../components/ListAllBooks";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Biblioteca - Livros",
};

export default function Livros() {
  return (
    <div>
      <ListAllBooks />
    </div>
  );
}
