import { OAuthContext } from "@/providers/OAuthProvider";
import { useContext } from "react";

export const useOAuthContext = () => {
  const context = useContext(OAuthContext);
  if (!context) {
    throw new Error("useOAuthContext must be used within a OAuthProvider");
  }
  return context;
};
