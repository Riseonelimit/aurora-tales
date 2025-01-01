"use client";

import { Button } from "@/components/ui/button";
import { useOAuthContext } from "@/hooks/useOAuthContext";
import Link from "next/link";

export default function Home() {
  const { user } = useOAuthContext();
  return (
    <div className="mt-[13%] flex w-3/4 flex-col items-center justify-center gap-5 lg:w-full">
      <h1 className="bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-lime-200 via-cyan-500 to-violet-300 bg-clip-text text-center text-6xl font-bold text-transparent">
        Aurora Tales
      </h1>
      <p className="text-center text-sm text-white/70">
        Transform your keywords into captivating stories using the power of AI
      </p>
      <Button>
        <Link href={"/generate"}>Get Started</Link>
      </Button>

      <h1>{user?.user_metadata.name}</h1>
    </div>
  );
}
