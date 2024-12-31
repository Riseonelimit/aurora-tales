import { OAuthContext } from "@/providers/OAuthProvider";
import { useContext } from "react";

export const useOAuthContext = () => {
  return useContext(OAuthContext);
};
