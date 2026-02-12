import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "hack.msa — UT Austin's First MSA Hackathon",
  description:
    "Inspiring the next generation of Muslim builders. April 18-19 at UT Austin.",
  themeColor: "#f8f1e8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
