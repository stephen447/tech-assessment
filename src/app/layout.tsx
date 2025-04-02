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
      {/* <ThemeInitializer /> */}
      <link rel="icon" href="/favicon.svg" sizes="any" />
      <body
        className={`antialiased min-h-fit h-screen bg-background_light dark:bg-background_dark !text-text_light dark:!text-text_dark`}
      >
        {children}
      </body>
    </html>
  );
}
