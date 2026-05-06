"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";

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
  signup: (data: SignupData) => Promise<{ success: boolean; eligible: boolean; error?: string }>;
  logout: () => void;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  age: number;
  postcode: string;
  freeSchoolMeals: boolean;
  deprivation: string;
  incomeBelow30k: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function mapSupabaseUser(su: SupabaseUser): User {
  const meta = su.user_metadata ?? {};
  return {
    name: meta.name ?? su.email?.split("@")[0] ?? "User",
    email: su.email ?? "",
    eligible: meta.eligible ?? true,
    signupDate: su.created_at ?? new Date().toISOString(),
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(mapSupabaseUser(session.user));
      }
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(mapSupabaseUser(session.user));
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return !error;
  };

  const signup = async (data: SignupData): Promise<{ success: boolean; eligible: boolean; error?: string }> => {
    // Eligibility check (client-side)
    const eligible =
      data.freeSchoolMeals ||
      data.incomeBelow30k ||
      (data.deprivation !== "" && data.deprivation !== "none");

    if (!eligible) {
      return { success: true, eligible: false };
    }

    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.name,
          age: data.age,
          postcode: data.postcode,
          eligible: true,
          freeSchoolMeals: data.freeSchoolMeals,
          deprivation: data.deprivation,
          incomeBelow30k: data.incomeBelow30k,
        },
      },
    });

    if (error) {
      return { success: false, eligible: true, error: error.message };
    }

    return { success: true, eligible: true };
  };

  const logout = async () => {
    await supabase.auth.signOut();
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
