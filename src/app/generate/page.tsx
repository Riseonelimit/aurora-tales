/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { usePromptContext } from "@/hooks/usePromptContext";
import { genres } from "@/lib/genres";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { redirect } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const [keyword, setKeyword] = useState<string>("");

  const {
    additionalInfo,
    setAdditionalInfo,
    keywords,
    setKeywords,
    genre,
    setGenre,
  } = usePromptContext();

  const handleGenerate = () => {
    if (keywords.length < 3) {
      alert("Please add at least 3 keywords");
      return;
    }
    if (!genre) {
      alert("Please select a genre");
      return;
    }
    redirect("/generate/output");
  };

  return (
    <div className="flex w-[90%] flex-col items-center justify-start gap-10 border-red-600 p-2 lg:w-2/4">
      <h1 className="self-start text-2xl font-semibold lg:text-3xl">
        Create your own story ✨
      </h1>
      <div className="flex w-full flex-col items-center justify-start gap-10">
        <div className="flex w-full flex-col items-center justify-center gap-5">
          <h1 className="self-start font-semibold lg:text-xl">
            Add Keywords (Press Enter After typing a word)
          </h1>

          <div className="flex w-full gap-3">
            <Input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter" && e.currentTarget.value != "") {
                  setKeywords([...keywords, e.currentTarget.value]);
                  setKeyword("");
                }
              }}
              placeholder="eg: Adventure, Mystery, Love"
              className="border-gray-500"
            />
            <Button
              onClick={() => {
                if (keyword != "") {
                  setKeywords([...keywords, keyword]);
                  setKeyword("");
                }
              }}
              variant={"default"}
            >
              Add
            </Button>
          </div>
          <div className="flex w-full flex-wrap items-center justify-start gap-2">
            {keywords.length > 0 &&
              keywords.map((keyword, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-2 rounded-md border-[1px] p-2 text-xs font-semibold dark:border-white"
                >
                  <p>{keyword}</p>
                  <button
                    onClick={() =>
                      setKeywords(keywords.filter((_, i) => i !== index))
                    }
                  >
                    <X size={15} />
                  </button>
                </div>
              ))}
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-3">
          <h1 className="self-start font-semibold lg:text-xl">Select Genre</h1>
          <div className="flex w-full flex-wrap items-center justify-start gap-2">
            {genres.length > 0 &&
              genres.map((keyword, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (genre == keyword) {
                      setGenre(null);
                    }
                    setGenre(keyword);
                  }}
                  className={cn(
                    "flex cursor-pointer items-center justify-between gap-2 rounded-md border-[1px] p-2 text-xs font-semibold dark:border-rose-400",
                    {
                      "bg-rose-400 text-rose-950": genre === keyword,
                    },
                  )}
                >
                  <p>{keyword}</p>
                </button>
              ))}
          </div>
        </div>
        <div className="w-full flex-col">
          <h1 className="self-start font-semibold lg:text-xl">
            Additional Notes
          </h1>
          <Textarea
            onChange={(e) => setAdditionalInfo(e.target.value)}
            value={additionalInfo ?? ""}
            rows={6}
            placeholder="eg: Use Simple Language, Add a Twist at the end"
            className="border-gray-500"
          />
        </div>
        <Button onClick={handleGenerate} className="font-semibold">
          Generate
        </Button>
      </div>
    </div>
  );
};

export default page;
