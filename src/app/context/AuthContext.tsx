"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface AuthData {
  isAuthenticated: boolean;
  logout: () => void;
}
const AuthContext = createContext<AuthData | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("token")) {
      setIsAuthenticated(true);
    }
  }, []);
  const logout = () => {
    sessionStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const authData: AuthData = {
    isAuthenticated,
    logout,
  };

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Erro");
  }
  return context;
}
