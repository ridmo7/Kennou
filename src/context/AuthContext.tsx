"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  name: string;
  email: string;
  eligible: boolean;
  signupDate: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (data: SignupData) => Promise<{ success: boolean; eligible: boolean }>;
  logout: () => void;
}

interface SignupData {
  name: string;
  email: string;
  age: number;
  postcode: string;
  freeSchoolMeals: boolean;
  deprivation: string;
  incomeBelow30k: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("kennou_user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, _password: string): Promise<boolean> => {
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 1200));
    const stored = localStorage.getItem("kennou_user");
    if (stored) {
      const u = JSON.parse(stored);
      if (u.email === email) {
        setUser(u);
        return true;
      }
    }
    // Demo fallback: allow any login with stored user
    if (stored) {
      setUser(JSON.parse(stored));
      return true;
    }
    return false;
  };

  const signup = async (data: SignupData): Promise<{ success: boolean; eligible: boolean }> => {
    await new Promise((r) => setTimeout(r, 1500));

    // Eligibility check
    const eligible =
      data.freeSchoolMeals ||
      data.incomeBelow30k ||
      (data.deprivation !== "" && data.deprivation !== "none");

    const newUser: User = {
      name: data.name,
      email: data.email,
      eligible,
      signupDate: new Date().toISOString(),
    };

    localStorage.setItem("kennou_user", JSON.stringify(newUser));

    if (eligible) {
      // Initialize empty progress
      localStorage.setItem("kennou_progress", JSON.stringify({}));
      setUser(newUser);
    }

    return { success: true, eligible };
  };

  const logout = () => {
    localStorage.removeItem("kennou_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
