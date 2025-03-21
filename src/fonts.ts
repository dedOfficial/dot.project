import { Geist, Geist_Mono, Sora } from "next/font/google";

export const logoFont = Sora({
  weight: "200"
});

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});