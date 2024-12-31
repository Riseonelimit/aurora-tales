/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { genres } from "@/lib/genres";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import React, { useState } from "react";

const page = () => {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [genre, setGenre] = useState<string | null>(null);

  return (
    <div className="flex w-[90%] flex-col items-center justify-start gap-10 border-red-600 p-2 lg:w-2/4">
      <h1 className="self-start text-3xl font-semibold">
        Create your own story ✨
      </h1>
      <div className="flex w-full flex-col items-center justify-start gap-10">
        <div className="flex w-full flex-col items-center justify-center gap-5">
          <h1 className="self-start text-xl font-semibold">Add Keywords</h1>
          <Input
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter" && e.currentTarget.value != "") {
                setKeywords([...keywords, e.currentTarget.value]);

                e.currentTarget.value = "";
              }
            }}
            placeholder="Write your word and press Enter"
            className="border-gray-500"
          />
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
          <h1 className="self-start text-xl font-semibold">Select Genre</h1>
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
          <h1 className="self-start text-xl font-semibold">Additional Notes</h1>
          <Textarea rows={6} className="border-gray-500" />
        </div>
        <Button className="font-semibold">Generate</Button>
      </div>
    </div>
  );
};

export default page;
