"use client";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthData {
  isAuthenticated: boolean;
  name: string;
  logout: () => void;
  validateToken: () => void;
  validateTokenRoleFunction: () => void;
}
const AuthContext = createContext<AuthData | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [name, setName] = useState(String);
  const router = useRouter();

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("name");
    setIsAuthenticated(false);
    window.location.reload();
  };

  const validateToken = () => {
    const token = sessionStorage.getItem("token");
    const name = sessionStorage.getItem("name");
    if (!token) {
      setIsAuthenticated(false);
    }
    setName(name!);
    if (isTokenExpired(token)) {
      setIsAuthenticated(false);
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("name");
      sessionStorage.removeItem("d_token");
    } else {
      setIsAuthenticated(true);
    }
  };

  const validateTokenRoleFunction = async () => {
    const tokendash = sessionStorage.getItem("d_token");

    if (!tokendash) {
      setIsAuthenticated(false);
      router.push("/not-found");
    }

    if (tokendash) {
      const tokenData = JSON.parse(atob(tokendash.split(".")[1]));
      console.log(tokenData);
      if (tokenData.role) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.push("/not-found");
      }
    } else {
      console.log("Erro");
      router.push("/not-found");

      setIsAuthenticated(false);
    }
  };

  const authData: AuthData = {
    isAuthenticated,
    logout,
    validateToken,
    name,
    validateTokenRoleFunction,
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
