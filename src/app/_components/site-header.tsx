import Link from "next/link";

import { siteName } from "@/app/_data/content";

const navItems = [
  { href: "/", label: "Trang chủ" },
  { href: "/tai-lieu", label: "Tài liệu" },
  { href: "/kiem-tra", label: "Kiểm tra" },
  { href: "/lop-hoc", label: "Lớp học" },
  { href: "/be-vui-hoc", label: "Bé vui học" },
  { href: "/quan-tri", label: "Sửa local" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/45 bg-[rgba(255,250,241,0.8)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#ff8a5b,#ffd166)] text-lg font-black text-white shadow-[0_12px_35px_rgba(255,138,91,0.35)]">
            CK
          </div>
          <div>
            <p className="text-xl font-black tracking-[0.01em] text-[#1f2a44]">
              {siteName}
            </p>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#ff7b54]">
              Không gian học tập tiểu học
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-white/55 bg-white/65 p-1.5 text-sm font-semibold text-[#31456a] shadow-[0_14px_40px_rgba(79,94,128,0.12)] lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 transition hover:bg-[#1f2a44] hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/quan-tri"
          className="rounded-full bg-[#1f2a44] px-4 py-2 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(31,42,68,0.24)] transition hover:-translate-y-0.5"
        >
          Chỉnh nội dung
        </Link>
      </div>
    </header>
  );
}
