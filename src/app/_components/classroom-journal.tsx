/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";

import { type ClassPost } from "@/app/_data/content";
import { formatDate, getMoodLabel } from "@/app/_data/utils";

type ClassroomJournalProps = {
  posts: ClassPost[];
};

export function ClassroomJournal({ posts }: ClassroomJournalProps) {
  const [activeTag, setActiveTag] = useState<string>("all");

  const tagOptions = Array.from(new Set(posts.flatMap((post) => post.tags))).sort((left, right) =>
    left.localeCompare(right),
  );

  const filteredPosts =
    activeTag === "all" ? posts : posts.filter((post) => post.tags.includes(activeTag));

  return (
    <section className="space-y-8">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setActiveTag("all")}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            activeTag === "all"
              ? "bg-[#1f2a44] text-white"
              : "bg-white/75 text-[#31456a] hover:bg-[#fff1e7]"
          }`}
        >
          Tất cả
        </button>

        {tagOptions.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag(tag)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeTag === tag
                ? "bg-[#ff7b54] text-white"
                : "bg-white/75 text-[#31456a] hover:bg-[#fff1e7]"
            }`}
          >
            #{tag}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="overflow-hidden rounded-[32px] border border-white/60 bg-white/82 shadow-[0_28px_80px_rgba(64,73,104,0.12)]"
          >
            {post.imageUrl ? (
              <div className="relative h-72 overflow-hidden bg-[#dce8ff]">
                <img
                  src={post.imageUrl}
                  alt={post.imageAlt ?? post.title}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>
            ) : (
              <div className="flex h-72 items-center justify-center bg-[linear-gradient(135deg,#ffd6a5,#fdffb6)] text-4xl font-black text-[#31456a]">
                {post.className}
              </div>
            )}

            <div className="space-y-4 p-6">
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#6d7fa6]">
                <span className="rounded-full bg-[#f3f5ff] px-3 py-1 text-[#1f2a44]">
                  {post.className}
                </span>
                <span>{formatDate(post.createdAt)}</span>
                <span className="rounded-full bg-[#fff1e7] px-3 py-1 text-[#ff7b54]">
                  {getMoodLabel(post.mood)}
                </span>
              </div>

              <h3 className="text-2xl font-black text-[#1f2a44]">{post.title}</h3>
              <p className="text-sm leading-7 text-[#50627f]">{post.body}</p>

              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={`${post.id}-${tag}`}
                    className="rounded-full bg-[#eef2ff] px-3 py-1 text-xs font-semibold text-[#4c5f8c]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
