import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Haris Aqeel | Senior Data Engineer",
  description:
    "Senior Data Engineer specializing in Microsoft Fabric, Azure, and Databricks. Building scalable data platforms with software engineering principles.",
  keywords: [
    "Data Engineer",
    "Azure",
    "Databricks",
    "Power BI",
    "Microsoft Fabric",
    "Portfolio",
  ],
  openGraph: {
    title: "Haris Aqeel | Senior Data Engineer",
    description: "Building scalable data platforms with software engineering principles.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#1a1a1a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
