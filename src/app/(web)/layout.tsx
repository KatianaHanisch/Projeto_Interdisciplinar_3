import "../globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { AuthProvider } from "../context/AuthContext";
import { ThemeProvider } from "../context/ThemeContext";

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Biblioteca",
  description: "Projeto interdisciplinar 3",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <AuthProvider>
        <ThemeProvider>
          <body className={`${roboto.className}`}>{children}</body>
        </ThemeProvider>
      </AuthProvider>
    </html>
  );
}
