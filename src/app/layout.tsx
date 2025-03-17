import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Crypto Hub",
  description: "An application to give cryto data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased min-h-fit h-screen bg-gray-900`}>
        {children}
      </body>
    </html>
  );
}
