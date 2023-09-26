import React from "react";
import ListBorrowed from "../../components/ListBorrowed";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Biblioteca - Empréstimos",
};

export default function Emprestimos() {
  return (
    <div>
      <ListBorrowed />
    </div>
  );
}
