import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Biblioteca - Sobre",
};

import ContentAbout from "../../components/ContentAbout";

export default function Page() {
  return <ContentAbout />;
}
