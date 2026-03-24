"use client";

import { useMemo, useState } from "react";

type GameKey = "letters" | "spelling" | "math";

type Task = {
  prompt: string;
  options: string[];
  answerIndex: number;
  helper: string;
  badge: string;
};

const tasksByGame: Record<GameKey, Task[]> = {
  letters: [
    { prompt: "Chữ in hoa A đi với chữ nào?", options: ["a", "e", "o"], answerIndex: 0, helper: "A và a là một cặp chữ cái giống nhau.", badge: "Học chữ cái" },
    { prompt: "Chữ in hoa B đi với chữ nào?", options: ["d", "b", "p"], answerIndex: 1, helper: "B viết thường là b.", badge: "Học chữ cái" },
    { prompt: "Chữ in hoa M đi với chữ nào?", options: ["m", "n", "u"], answerIndex: 0, helper: "M và m là cặp đúng.", badge: "Học chữ cái" },
    { prompt: "Chữ in hoa O đi với chữ nào?", options: ["q", "o", "c"], answerIndex: 1, helper: "O viết thường là o.", badge: "Học chữ cái" },
  ],
  spelling: [
    { prompt: "Để viết tiếng 'bé', con chọn phần còn thiếu nào?", options: ["é", "o", "a"], answerIndex: 0, helper: "b + é = bé.", badge: "Ghép tiếng" },
    { prompt: "Để viết tiếng 'ba', con chọn phần còn thiếu nào?", options: ["a", "e", "i"], answerIndex: 0, helper: "b + a = ba.", badge: "Ghép tiếng" },
    { prompt: "Để viết tiếng 'mẹ', con chọn phần còn thiếu nào?", options: ["e", "ẹ", "o"], answerIndex: 1, helper: "m + ẹ = mẹ.", badge: "Ghép tiếng" },
    { prompt: "Để viết tiếng 'cá', con chọn phần còn thiếu nào?", options: ["á", "a", "ă"], answerIndex: 0, helper: "c + á = cá.", badge: "Ghép tiếng" },
  ],
  math: [
    { prompt: "3 + 2 bằng bao nhiêu?", options: ["4", "5", "6"], answerIndex: 1, helper: "3 cộng 2 bằng 5.", badge: "Toán vui" },
    { prompt: "7 - 3 bằng bao nhiêu?", options: ["3", "4", "5"], answerIndex: 1, helper: "7 bớt 3 còn 4.", badge: "Toán vui" },
    { prompt: "4 + 4 bằng bao nhiêu?", options: ["6", "7", "8"], answerIndex: 2, helper: "4 cộng 4 bằng 8.", badge: "Toán vui" },
    { prompt: "9 - 5 bằng bao nhiêu?", options: ["3", "4", "5"], answerIndex: 1, helper: "9 bớt 5 còn 4.", badge: "Toán vui" },
  ],
};

const gameMeta = {
  letters: {
    label: "Chọn chữ đúng",
    accent: "from-[#ffd166] to-[#ff7b54]",
    blurb: "Bé nhìn chữ và chọn đúng chữ thường tương ứng.",
  },
  spelling: {
    label: "Ghép tiếng đơn giản",
    accent: "from-[#80ed99] to-[#38b000]",
    blurb: "Bé điền phần còn thiếu để hoàn thành tiếng quen thuộc.",
  },
  math: {
    label: "Đếm và cộng trừ vui",
    accent: "from-[#72ddf7] to-[#00a6fb]",
    blurb: "Bé làm phép tính trong phạm vi 10 bằng các câu ngắn dễ hiểu.",
  },
} as const;

export function PreschoolPlayground() {
  const [activeGame, setActiveGame] = useState<GameKey>("letters");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stars, setStars] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const activeTasks = tasksByGame[activeGame];
  const task = activeTasks[currentIndex];
  const meta = gameMeta[activeGame];

  const starsView = useMemo(
    () => Array.from({ length: 5 }, (_, index) => index < Math.min(stars, 5)),
    [stars],
  );

  return (
    <section className="space-y-8">
      <div className="grid gap-4 lg:grid-cols-3">
        {(Object.keys(gameMeta) as GameKey[]).map((game) => (
          <button
            key={game}
            type="button"
            onClick={() => {
              setActiveGame(game);
              setCurrentIndex(0);
              setFeedback("");
              setSelectedIndex(null);
            }}
            className={`overflow-hidden rounded-[30px] border text-left transition hover:-translate-y-1 ${
              activeGame === game
                ? "border-transparent shadow-[0_22px_48px_rgba(64,73,104,0.18)]"
                : "border-white/60 bg-white/80"
            }`}
          >
            <div className={`bg-gradient-to-r ${gameMeta[game].accent} p-5 text-white`}>
              <p className="text-xs font-bold uppercase tracking-[0.24em]">Bé vui học</p>
              <h2 className="mt-2 text-2xl font-black">{gameMeta[game].label}</h2>
              <p className="mt-2 text-sm leading-6 text-white/90">{gameMeta[game].blurb}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="overflow-hidden rounded-[34px] border border-white/60 bg-white/82 shadow-[0_30px_80px_rgba(64,73,104,0.14)]">
          <div className={`bg-gradient-to-br ${meta.accent} p-6 text-white`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em]">{task.badge}</p>
                <h3 className="mt-2 text-3xl font-black">{meta.label}</h3>
              </div>
              <div className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
                Câu {currentIndex + 1}/{activeTasks.length}
              </div>
            </div>
          </div>

          <div className="space-y-6 p-6">
            <div className="rounded-[28px] bg-[#f8fbff] p-6 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#6d7fa6]">
                Cùng chơi nào
              </p>
              <p className="mt-4 text-3xl font-black leading-tight text-[#1f2a44]">
                {task.prompt}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {task.options.map((option, optionIndex) => {
                const isSelected = selectedIndex === optionIndex;

                return (
                  <button
                    key={`${activeGame}-${currentIndex}-${option}`}
                    type="button"
                    onClick={() => {
                      if (selectedIndex !== null) {
                        return;
                      }

                      setSelectedIndex(optionIndex);

                      if (optionIndex === task.answerIndex) {
                        setFeedback(`Đúng rồi. ${task.helper}`);
                        setStars((current) => current + 1);
                      } else {
                        setFeedback(`Chưa đúng, mình thử lại nhé. ${task.helper}`);
                      }
                    }}
                    className={`rounded-[24px] border px-5 py-5 text-lg font-bold transition ${
                      isSelected
                        ? "border-[#ff9f1c] bg-[#fff4e7] text-[#1f2a44]"
                        : "border-[#dbe2f7] bg-white text-[#31456a] hover:-translate-y-0.5"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 rounded-[26px] bg-[#fff6ee] px-5 py-4">
              <p className="text-sm font-medium leading-7 text-[#50627f]">
                {feedback || "Bé bấm chọn một đáp án để xem kết quả ngay."}
              </p>
              <button
                type="button"
                onClick={() => {
                  setCurrentIndex((current) => (current + 1) % activeTasks.length);
                  setFeedback("");
                  setSelectedIndex(null);
                }}
                className="rounded-full bg-[#1f2a44] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
              >
                Câu mới
              </button>
            </div>
          </div>
        </div>

        <aside className="space-y-5 rounded-[34px] border border-white/60 bg-white/82 p-6 shadow-[0_30px_80px_rgba(64,73,104,0.14)]">
          <div className="rounded-[28px] bg-[linear-gradient(135deg,#fff1cf,#ffd6a5)] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#b4692c]">
              Thành tích bé
            </p>
            <div className="mt-4 flex gap-2">
              {starsView.map((filled, index) => (
                <span
                  key={`star-${index}`}
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl text-xl ${
                    filled ? "bg-[#ffcf5c]" : "bg-white/70"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm leading-7 text-[#6b5a38]">
              Mỗi lần bé chọn đúng sẽ nhận thêm một ngôi sao. Khi đổi game, số sao vẫn được giữ trong lượt chơi hiện tại.
            </p>
          </div>

          <div className="rounded-[28px] bg-[#f6f8ff] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#6d7fa6]">
              Gợi ý cho cô
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[#50627f]">
              <li>Cho bé đọc to đáp án trước khi bấm để luyện phát âm.</li>
              <li>Đổi sang game khác khi bé hoàn thành 2 đến 3 câu liên tiếp.</li>
              <li>Có thể thay bộ câu hỏi trực tiếp trong component này hoặc trong file dữ liệu local.</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
