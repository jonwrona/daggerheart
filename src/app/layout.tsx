import type { Metadata } from "next";
import { Open_Sans, Permanent_Marker } from "next/font/google";
import "./reset.scss";
import "./globals.scss";
import { Analytics } from "@vercel/analytics/next";

const openSans = Open_Sans({
  weight: "variable",
  variable: "--font-open-sans",
});

const permanentMarker = Permanent_Marker({
  weight: "400",
  variable: "--font-permanent-marker",
});

export const metadata: Metadata = {
  title: "Daggerheart Tools",
  description:
    "A lightweight toolset for playing Daggerheart just a little bit better.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} ${permanentMarker.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
