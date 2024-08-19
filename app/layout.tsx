import type { Metadata } from "next";
import Sidebar from "./_components/navigation/sidebar";
import Header from "./_components/navigation/header";
import { Inter } from "next/font/google";
import { cn } from "./_components/utils";
import "./globals.css";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Dr Guthals",
  description: "Sarah Guthal's Personal Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(fontSans.variable, "font-sans grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[180px_1fr]")}>
        <Sidebar />
        <div className="flex flex-col">
          <Header />
          <main className="max-md:mt-14 flex flex-1 flex-col gap-4 lg:gap-6 ">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
