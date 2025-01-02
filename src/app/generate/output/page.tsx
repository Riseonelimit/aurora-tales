/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { Progress } from "@/components/ui/progress";
import { usePromptContext } from "@/hooks/usePromptContext";
import getPromptInput from "@/utils/getPromptInput";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { generateContent } from "./gemini";

const page = () => {
  const { genre, additionalInfo, keywords } = usePromptContext();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [progress, setProgress] = useState<number>(20);

  const [response, setResponse] = useState<{ title: string; story: string }>({
    title: "",
    story: "",
  });

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (genre && keywords.length > 0) {
      const generateResponse = async () => {
        const prompt = getPromptInput(keywords, genre!, additionalInfo);
        setProgress(60);
        timeout = setTimeout(() => {
          setProgress(80);
        }, 1000);
        const response = JSON.parse(await generateContent(prompt));
        console.log(response);
        setResponse(response);

        setIsLoading(false);
        setProgress(100);
      };
      generateResponse();
    } else {
      redirect("/generate");
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [additionalInfo, genre, keywords]);

  if (isLoading) {
    return (
      <div className="flex h-full w-2/4 flex-col items-center justify-center">
        <div className="mt-20 flex flex-col items-center justify-center gap-5">
          <h1>Imagining your creativity</h1>
          <Progress value={progress} />
        </div>
      </div>
    );
  }
  return (
    <div className="mt-10 flex w-[85%] flex-col items-center justify-start gap-2 lg:w-2/4">
      <div className="flex w-full flex-col items-start justify-center gap-3">
        <div className="text-dm rounded-md border-[1px] border-rose-600 bg-rose-950 p-2 text-sm font-medium">
          {genre}
        </div>
        <h1 className="self-start text-3xl font-semibold">{response.title}</h1>
      </div>
      <p className="w-full py-10 leading-10">{response.story}</p>
    </div>
  );
};

export default page;
