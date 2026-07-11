import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Monis Workspace Builder",
  description: "Design and rent a flexible workspace setup."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
