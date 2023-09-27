"use client";
const jwt = require("jsonwebtoken");
import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthData {
  isAuthenticated: boolean;
  role: any;
  name: string;
  logout: () => void;
  validateToken: () => void;
  validateTokenRoleFunction: () => void;
}
const AuthContext = createContext<AuthData | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(false);
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
      sessionStorage.removeItem("d_token");
    } else {
      setIsAuthenticated(true);
    }
  };

  const validateTokenRoleFunction = () => {
    const tokendash = sessionStorage.getItem("d_token");

    if (!tokendash) {
      setIsAuthenticated(false);
    }

    if (validateTokenRole(tokendash)) {
      setRole(true);
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("name");
      sessionStorage.removeItem("d_token");
      console.log("aaa");
    } else {
      setRole(false);
    }
  };

  const authData: AuthData = {
    isAuthenticated,
    logout,
    validateToken,
    name,
    role,
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

function validateTokenRole(token: any) {
  try {
    const decodedToken = jwt.verify(token, "sua_chave_secreta");

    console.log(decodedToken);
    if (decodedToken && decodedToken.role_id) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Erro");
  }
  return context;
}
