import type { Metadata } from "next";
import { Spline_Sans_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SettingsProvider } from "@/components/settings-context/SettingsContext";
import { DatabaseProvider } from "@/components/database-context/DatabaseContext";
import { ModalProvider } from "@/components/modal/ModalContext";
import { ThemeSetter } from "@/components/theme-setter/ThemeSetter";
import "./reset.scss";
import "./globals.scss";
import "./type.scss";

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
        <SettingsProvider>
          <DatabaseProvider>
            <ModalProvider>
              {children}
              <ThemeSetter />
            </ModalProvider>
          </DatabaseProvider>
        </SettingsProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
