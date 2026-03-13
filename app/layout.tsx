import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-[#1B1B1F] text-white">
        {children}
      </body>
    </html>
  );
}
