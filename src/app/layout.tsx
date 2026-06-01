import type { Metadata } from "next";
import { Inter, Newsreader, Space_Mono } from "next/font/google";
import { MotionProvider } from "@/components/motion-provider";
import "./globals.css";


const interSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const newsReader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ok",
  description: "My personal homepage built by me.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interSans.variable} ${newsReader.variable} ${spaceMono.variable}  h-full antialiased`}
    >
      <body className="min-h-full flex flex-col items-center">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
