"use client";
import { redirect, useRouter } from "next/navigation";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthData {
  isAuthenticated: boolean;
  name: string;
  email: string;
  phone: string;
  logout: () => void;
  validateToken: () => void;
  validateTokenRoleFunction: () => void;
  validateIfExists: () => void;
  validateTokenForPageEmprestimos: () => void;
}
const AuthContext = createContext<AuthData | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [name, setName] = useState(String);
  const [phone, setPhone] = useState(String);
  const [email, setEmail] = useState(String);
  const router = useRouter();

  const logout = () => {
    sessionStorage.removeItem("token");
    setIsAuthenticated(false);

    router.push("/");
    setTimeout(() => {
      sessionStorage.removeItem("d_token");
    }, 1000);
  };

  const validateToken = () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      setIsAuthenticated(false);
      return;
    } else {
      const tokenData = JSON.parse(atob(token!.split(".")[1]));
      setName(tokenData.name);
      setEmail(tokenData.email);
      setPhone(tokenData.phone);
      if (isTokenExpired(token)) {
        setIsAuthenticated(false);
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("d_token");
      } else {
        setIsAuthenticated(true);
      }
    }
  };

  const validateTokenForPageEmprestimos = () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      setIsAuthenticated(false);
      router.push("/");
      return;
    }
    setName(name!);
    if (isTokenExpired(token)) {
      setIsAuthenticated(false);
      sessionStorage.removeItem("token");

      sessionStorage.removeItem("d_token");
      router.push("/");
    } else {
      setIsAuthenticated(true);
    }
  };

  const validateTokenRoleFunction = async () => {
    const tokendash = sessionStorage.getItem("d_token");

    if (!tokendash) {
      setIsAuthenticated(false);
      router.push("/not-found");
      return;
    }

    if (tokendash) {
      if (isTokenExpired(tokendash)) {
        setIsAuthenticated(false);
      }

      const tokenData = JSON.parse(atob(tokendash.split(".")[1]));
      if (tokenData.role) {
        setIsAuthenticated(true);
        setName(tokenData.name);
      } else {
        setIsAuthenticated(false);
        setName("");
        router.push("/not-found");
      }
    } else {
      console.log("Erro");
      router.push("/not-found");

      setIsAuthenticated(false);
    }
  };

  const validateIfExists = async () => {
    const tokendash = sessionStorage.getItem("d_token");

    if (tokendash) {
      router.push("/dashboard");
      return;
    }
  };

  const authData: AuthData = {
    isAuthenticated,
    name,
    email,
    phone,
    logout,
    validateToken,
    validateTokenRoleFunction,
    validateIfExists,
    validateTokenForPageEmprestimos,
  };

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
}

function isTokenExpired(token: any) {
  if (!token) {
    return true;
  }
  const tokenPayload = JSON.parse(atob(token.split(".")[1]));
  const tokenExpiration = tokenPayload.exp * 1000;
  const currentTime = Date.now();
  return tokenExpiration <= currentTime;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Erro");
  }
  return context;
}
