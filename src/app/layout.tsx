"use client";

import AuthButtons from "@/components/AuthButtons";
import OAuthProvider from "@/providers/OAuthProvider";
import PromptContextProvider from "@/providers/PromptContextProvider";
import { ApolloProvider } from "@apollo/client";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/aurora-tales-transparent.png";
import client from "../lib/apolloClient";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} dark relative antialiased`}>
        <OAuthProvider>
          <PromptContextProvider>
            <ApolloProvider client={client}>
              <nav className="flex items-center justify-between px-4">
                <div className="flex items-center justify-center gap-2">
                  <Link href={"/"} className="w-20">
                    <Image
                      src={logo}
                      alt="aurora_tales_logo"
                      className="h-full w-full object-cover"
                    />
                  </Link>

                  <p className="flex items-center justify-center gap-2 rounded-md border-[1px] border-yellow-400 bg-yellow-950/30 p-2 text-xs font-medium">
                    ⚠️ Under Development
                  </p>
                </div>
                <ul className="flex items-center justify-center space-x-4 px-4 text-sm">
                  <li>
                    <Link href="/generate">Generate</Link>
                  </li>
                  <li>
                    <AuthButtons />
                  </li>
                </ul>
              </nav>
              <section className="flex w-full flex-col items-center justify-center">
                {children}
              </section>
            </ApolloProvider>
          </PromptContextProvider>
        </OAuthProvider>
      </body>
    </html>
  );
}
