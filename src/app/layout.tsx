import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { Providers } from "@/components/layout/Providers";
import "./globals.css";

const notoSans = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans",
});

export const metadata: Metadata = {
  title: "마음챙김 | 명상 웹앱",
  description:
    "시간대별 자연 풍경과 명상 콘텐츠로 30초 안에 명상을 시작하세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSans.variable} h-full`}>
      <body className="min-h-full bg-primary font-sans text-primary antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
