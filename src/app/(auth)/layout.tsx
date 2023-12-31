import { AuthProvider } from "../context/AuthContext";
import "../globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Biblioteca",
  description: "",
};

export default function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <AuthProvider>
        <body>{children}</body>
      </AuthProvider>
    </html>
  );
}
