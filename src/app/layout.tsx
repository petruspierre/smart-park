import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  weight: ["300", "400", "700", "900"],
  variable: "--font-sans",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "smartPark",
  description: "Estacionamento inteligente",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ptBR">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          poppins.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
