import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Haris Aqeel — Senior Data Engineer",
  description:
    "Data Engineer who thinks like a software engineer. Building scalable data systems with Azure, Databricks, and Power BI.",
  keywords: [
    "Data Engineer",
    "Azure",
    "Databricks",
    "Power BI",
    "Microsoft Fabric",
    "Portfolio",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-[family-name:var(--font-inter)] antialiased bg-[#0a0a0a] text-[#f4f4f5]`}
      >
        {children}
      </body>
    </html>
  );
}
