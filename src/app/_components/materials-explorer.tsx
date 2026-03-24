"use client";

import Link from "next/link";
import { useDeferredValue, useState } from "react";

import {
  gradeOptions,
  subjectOptions,
  type MaterialItem,
} from "@/app/_data/content";
import {
  formatDate,
  getGradeLabel,
  getMaterialTypeLabel,
  getSubjectLabel,
} from "@/app/_data/utils";

type MaterialsExplorerProps = {
  items: MaterialItem[];
};

export function MaterialsExplorer({ items }: MaterialsExplorerProps) {
  const [selectedGrade, setSelectedGrade] = useState<string>("all");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const filteredItems = items.filter((item) => {
    const matchesGrade = selectedGrade === "all" || item.grade === selectedGrade;
    const matchesSubject = selectedSubject === "all" || item.subject === selectedSubject;
    const haystack = `${item.title} ${item.description} ${item.author}`.toLowerCase();
    const matchesQuery = !deferredQuery || haystack.includes(deferredQuery);

    return matchesGrade && matchesSubject && matchesQuery;
  });

  return (
    <section className="space-y-8">
      <div className="grid gap-4 rounded-[32px] border border-white/55 bg-white/75 p-5 shadow-[0_28px_80px_rgba(64,73,104,0.12)] lg:grid-cols-[1.4fr_1fr_1fr] lg:items-center">
        <label className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.28em] text-[#ff7b54]">
            Tìm tài liệu
          </span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Nhập môn học, tên tài liệu, giáo viên..."
            className="w-full rounded-[22px] border border-[#d5ddf7] bg-white px-4 py-3 text-sm text-[#24334d] outline-none transition focus:border-[#ff7b54]"
          />
        </label>

        <label className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.28em] text-[#ff7b54]">
            Chọn khối
          </span>
          <select
            value={selectedGrade}
            onChange={(event) => setSelectedGrade(event.target.value)}
            className="w-full rounded-[22px] border border-[#d5ddf7] bg-white px-4 py-3 text-sm text-[#24334d] outline-none transition focus:border-[#ff7b54]"
          >
            <option value="all">Tất cả các khối</option>
            {gradeOptions.map((grade) => (
              <option key={grade.id} value={grade.id}>
                {grade.label}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.28em] text-[#ff7b54]">
            Chọn môn
          </span>
          <select
            value={selectedSubject}
            onChange={(event) => setSelectedSubject(event.target.value)}
            className="w-full rounded-[22px] border border-[#d5ddf7] bg-white px-4 py-3 text-sm text-[#24334d] outline-none transition focus:border-[#ff7b54]"
          >
            <option value="all">Tất cả môn học</option>
            {subjectOptions.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {filteredItems.map((item) => (
          <article
            key={item.id}
            className="group overflow-hidden rounded-[30px] border border-white/65 bg-white/85 shadow-[0_24px_70px_rgba(72,84,121,0.14)] transition hover:-translate-y-1.5"
          >
            <div className={`bg-gradient-to-br ${item.coverTone} p-6 text-white`}>
              <div className="mb-10 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.22em]">
                <span className="rounded-full bg-white/20 px-3 py-1 backdrop-blur-sm">
                  {getGradeLabel(item.grade)}
                </span>
                <span className="rounded-full bg-white/20 px-3 py-1 backdrop-blur-sm">
                  {getSubjectLabel(item.subject)}
                </span>
              </div>
              <h3 className="max-w-[14ch] text-2xl font-black leading-tight">
                {item.title}
              </h3>
            </div>

            <div className="space-y-4 p-6 text-[#31456a]">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#6d7fa6]">
                <span>{getMaterialTypeLabel(item.type)}</span>
                <span className="h-1 w-1 rounded-full bg-[#9dadcf]" />
                <span>{formatDate(item.createdAt)}</span>
              </div>

              <p className="min-h-20 text-sm leading-7 text-[#50627f]">{item.description}</p>

              <div className="flex items-center justify-between rounded-[24px] bg-[#f7f8fe] px-4 py-3 text-sm">
                <div>
                  <p className="font-semibold text-[#1f2a44]">{item.author}</p>
                  <p className="text-[#6d7fa6]">
                    {item.fileName ? item.fileName : "Liên kết học tập"}
                  </p>
                </div>
                {item.fileUrl ? (
                  <Link
                    href={item.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-[#1f2a44] px-4 py-2 font-semibold text-white transition group-hover:bg-[#ff7b54]"
                  >
                    {item.ctaLabel ?? "Mở ngay"}
                  </Link>
                ) : (
                  <span className="rounded-full bg-[#fff1e7] px-4 py-2 font-semibold text-[#ff7b54]">
                    Chưa có file
                  </span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredItems.length === 0 ? (
        <div className="rounded-[28px] border border-dashed border-[#c9d2ef] bg-white/70 px-6 py-10 text-center text-[#50627f]">
          Chưa tìm thấy tài liệu phù hợp. Thử đổi khối, môn học hoặc từ khóa tìm kiếm.
        </div>
      ) : null}
    </section>
  );
}
