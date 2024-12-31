import { PromptContext } from "@/providers/PromptContextProvider";
import { useContext } from "react";

export const usePromptContext = () => {
  const context = useContext(PromptContext);
  if (!context) {
    throw new Error("usePromptContext must be used within a PromptProvider");
  }
  return context;
};
