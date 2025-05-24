import type { Metadata } from "next";
import { Spline_Sans_Mono } from "next/font/google";
import "./reset.scss";
import "./globals.scss";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const splineSansMono = Spline_Sans_Mono({
  weight: "variable",
  subsets: ["latin"],
  variable: "--font-spline-sans-mono",
});

const fontVariables = [splineSansMono.variable].join(" ");

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
      <body className={fontVariables}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
