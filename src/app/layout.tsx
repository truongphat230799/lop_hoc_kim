import type { Metadata } from "next";
import { Nunito, Quicksand } from "next/font/google";

import "./globals.css";
import { SiteHeader } from "@/app/_components/site-header";
import { siteName } from "@/app/_data/content";

const nunito = Nunito({
  subsets: ["vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

const quicksand = Quicksand({
  subsets: ["vietnamese"],
  weight: ["500", "600", "700"],
  variable: "--font-quicksand",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteName} | Không gian học tập cho tiền tiểu học đến lớp 5`,
  description:
    "Website học tập có thư viện tài liệu, kiểm tra online nhập mật khẩu, góc lớp học và khu trò chơi cho bé, tối ưu để deploy trên Vercel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`h-full scroll-smooth antialiased ${nunito.variable} ${quicksand.variable}`}>
      <body className="min-h-full font-sans">
        <div className="site-shell flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-white/45 bg-[rgba(255,250,241,0.82)] backdrop-blur-xl">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-8 text-sm text-[#50627f] sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
              <div>
                <p className="font-black uppercase tracking-[0.24em] text-[#1f2a44]">
                  {siteName}
                </p>
                <p className="mt-1 max-w-2xl leading-7">
                  Một giao diện học tập vui mắt, trực quan cho học sinh từ tiền tiểu học đến lớp 5.
                </p>
              </div>
              <div className="rounded-full bg-white/70 px-4 py-2 font-semibold text-[#1f2a44] shadow-[0_14px_34px_rgba(64,73,104,0.08)]">
                Sẵn sàng deploy Vercel
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
