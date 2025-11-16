import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Credit Calculator",
  description: "Calculate your loan payments instantly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
