"use client";

import AuthButtons from "@/components/AuthButtons";
import OAuthProvider from "@/providers/OAuthProvider";
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
          <ApolloProvider client={client}>
            <nav className="flex items-center justify-between px-4">
              <Link href={"/"} className="w-20">
                <Image
                  src={logo}
                  alt="aurora_tales_logo"
                  className="h-full w-full object-cover"
                />
              </Link>
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
        </OAuthProvider>
      </body>
    </html>
  );
}
