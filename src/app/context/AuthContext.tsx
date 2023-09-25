"use client";

import { useRouter } from "next/router";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface AuthData {
  isAuthenticated: boolean;
  name: string;
  logout: () => void;
  validateToken: () => void;
}
const AuthContext = createContext<AuthData | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [name, setName] = useState(String);

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
    } else {
      setIsAuthenticated(true);
    }
  };

  const authData: AuthData = {
    isAuthenticated,
    logout,
    validateToken,
    name,
  };

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
}

function isTokenExpired(token: any) {
  if (!token) {
    return true;
  }

  // console.log(token);

  const tokenPayload = JSON.parse(atob(token.split(".")[1]));
  // console.log(tokenPayload);
  const tokenExpiration = tokenPayload.exp * 1000;
  // console.log(tokenExpiration);
  const currentTime = Date.now();
  // console.log(currentTime);

  // console.log(tokenExpiration <= currentTime);
  return tokenExpiration <= currentTime;
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Erro");
  }
  return context;
}
