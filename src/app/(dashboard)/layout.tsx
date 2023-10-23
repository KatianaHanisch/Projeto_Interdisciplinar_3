import "../globals.css";
import type { Metadata } from "next";

import { AuthProvider } from "../context/AuthContext";
import { ThemeProvider } from "../context/ThemeContext";

import Navbar from "./dashboard/components/Navbar";
import Sidebar from "./dashboard/components/Sidebar";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Generated by create next app",
};

export default function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <AuthProvider>
        <ThemeProvider>
          <body>
            <div className="h-full relative">
              <div className="hidden h-full md:flex md:flex-col md:fixed md:w-56 md:inset-y-0 z-[80] bg-gray-300">
                <Sidebar />
              </div>
            </div>
            <main className="md:pl-56 h-screen w-full bg-gray-300">
              <Navbar />
              <div className="w-full h-5/6 pt-4  pr-10 pl-2 ">{children}</div>
            </main>
          </body>
        </ThemeProvider>
      </AuthProvider>
    </html>
  );
}
