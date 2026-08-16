import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/lib/query/QueryProvider";
import { CategoryProvider } from "@/context/categoryContext";

export const metadata: Metadata = {
  title: "Nestify",
  description: "Household Service Marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <CategoryProvider>
            {children}
          </CategoryProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
