import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Crypto Sphere",
  description: "An application to give cryto data",
  icons: {
    icon: "/favicon.svg", // Path relative to /public
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.svg" sizes="any" />
      <body className={`antialiased min-h-fit h-screen bg-gray-900`}>
        {children}
      </body>
    </html>
  );
}
