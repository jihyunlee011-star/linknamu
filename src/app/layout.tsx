import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { profile } from "@/data/profile";
import "./globals.css";

const pretendard = localFont({
  src: "../../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "45 920",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.name} | 링크나무`,
  description: profile.bio,
};

export const viewport: Viewport = {
  themeColor: "#fdf6ec",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${pretendard.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
