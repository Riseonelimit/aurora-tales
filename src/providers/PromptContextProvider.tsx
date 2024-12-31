import { createContext, ReactNode, useState } from "react";

type PromptContextType = {
  keywords: string[];
  setKeywords: (keywords: string[]) => void;
  genre: string | null;
  setGenre: (genre: string | null) => void;
  additionalInfo: string | null;
  setAdditionalInfo: (additionalInfo: string | null) => void;
};

export const PromptContext = createContext<PromptContextType>({
  keywords: [],
  setKeywords: () => {},
  genre: null,
  setGenre: () => {},
  additionalInfo: null,
  setAdditionalInfo: () => {},
});

const PromptContextProvider = ({ children }: { children: ReactNode }) => {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [genre, setGenre] = useState<string | null>(null);
  const [additionalInfo, setAdditionalInfo] = useState<string | null>(null);
  return (
    <PromptContext.Provider
      value={{
        keywords,
        setKeywords,
        genre,
        setGenre,
        additionalInfo,
        setAdditionalInfo,
      }}
    >
      {children}
    </PromptContext.Provider>
  );
};
export default PromptContextProvider;
