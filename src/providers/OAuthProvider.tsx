"use client";

import { supabase } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { createContext, ReactNode, useEffect, useState } from "react";

type OAuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  OAuthLogin: () => void;
  OAuthSignOut: () => void;
};

export const OAuthContext = createContext<OAuthContextType>({
  user: null,
  setUser: () => {},
  isLoading: false,
  setIsLoading: () => {},
  OAuthLogin: () => {},
  OAuthSignOut: () => {},
});

const OAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const checkAuthUser = async () => {
    setIsLoading(true);
    const user = await supabase.auth.getUser();
    if (user) {
      setUser(user.data.user);
    }
    setIsLoading(false);
  };

  const OAuthLogin = async () => {
    setIsLoading(true);
    if (user) return;
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    setIsLoading(false);
  };
  const OAuthSignOut = () => {
    supabase.auth.signOut();
    setUser(null);
  };

  useEffect(() => {
    checkAuthUser();
    setIsLoading(false);
  }, []);

  return (
    <OAuthContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        setIsLoading,
        OAuthLogin,
        OAuthSignOut,
      }}
    >
      {children}
    </OAuthContext.Provider>
  );
};

export default OAuthProvider;
