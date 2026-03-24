"use client";

import { useEffect, useState } from "react";

import {
  gradeOptions,
  subjectOptions,
  type ExamItem,
} from "@/app/_data/content";
import { formatDate, getGradeLabel, getSubjectLabel } from "@/app/_data/utils";

type ExamCenterProps = {
  exams: ExamItem[];
};

export function ExamCenter({ exams }: ExamCenterProps) {
  const [selectedGrade, setSelectedGrade] = useState<string>("all");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedExamId, setSelectedExamId] = useState(exams[0]?.id ?? "");
  const [accessCode, setAccessCode] = useState("");
  const [examStarted, setExamStarted] = useState(false);
  const [examUnlocked, setExamUnlocked] = useState(false);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<{ score: number; total: number } | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");

  const filteredExams = exams.filter((exam) => {
    const matchesGrade = selectedGrade === "all" || exam.grade === selectedGrade;
    const matchesSubject = selectedSubject === "all" || exam.subject === selectedSubject;
    return matchesGrade && matchesSubject;
  });

  const selectedExam =
    filteredExams.find((exam) => exam.id === selectedExamId) ?? filteredExams[0] ?? null;

  useEffect(() => {
    if (!examStarted || timeLeft === null) {
      return;
    }

    if (timeLeft <= 0) {
      if (selectedExam) {
        const score = selectedExam.questions.reduce((total, question) => {
          return total + Number(answers[question.id] === question.correctIndex);
        }, 0);

        setResult({ score, total: selectedExam.questions.length });
        setExamStarted(false);
      }
      return;
    }

    const timerId = window.setTimeout(() => {
      setTimeLeft((current) => (current === null ? null : current - 1));
    }, 1000);

    return () => window.clearTimeout(timerId);
  }, [answers, examStarted, selectedExam, timeLeft]);

  useEffect(() => {
    if (!selectedExam) {
      return;
    }

    setSelectedExamId(selectedExam.id);
    setExamUnlocked(false);
    setExamStarted(false);
    setAnswers({});
    setResult(null);
    setTimeLeft(selectedExam.durationMinutes * 60);
    setFeedback("");
    setAccessCode("");
  }, [selectedExam]);

  const progressPercent = selectedExam
    ? Math.round((Object.keys(answers).length / selectedExam.questions.length) * 100)
    : 0;

  return (
    <section className="grid gap-8 xl:grid-cols-[0.95fr_1.25fr]">
      <aside className="space-y-5 rounded-[32px] border border-white/55 bg-white/78 p-5 shadow-[0_28px_80px_rgba(64,73,104,0.12)]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#ff7b54]">
            Lọc bài thi
          </p>
          <h2 className="mt-2 text-2xl font-black text-[#1f2a44]">Trung tâm kiểm tra</h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6d7fa6]">
              Khối
            </span>
            <select
              value={selectedGrade}
              onChange={(event) => setSelectedGrade(event.target.value)}
              className="w-full rounded-[20px] border border-[#d5ddf7] bg-white px-4 py-3 text-sm text-[#24334d] outline-none transition focus:border-[#ff7b54]"
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
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6d7fa6]">
              Môn học
            </span>
            <select
              value={selectedSubject}
              onChange={(event) => setSelectedSubject(event.target.value)}
              className="w-full rounded-[20px] border border-[#d5ddf7] bg-white px-4 py-3 text-sm text-[#24334d] outline-none transition focus:border-[#ff7b54]"
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

        <div className="space-y-4">
          {filteredExams.map((exam) => (
            <button
              key={exam.id}
              type="button"
              onClick={() => setSelectedExamId(exam.id)}
              className={`w-full rounded-[28px] border p-5 text-left transition ${
                selectedExam?.id === exam.id
                  ? "border-transparent bg-[#1f2a44] text-white shadow-[0_20px_45px_rgba(31,42,68,0.24)]"
                  : "border-white/70 bg-white text-[#31456a] hover:-translate-y-1"
              }`}
            >
              <div className={`mb-4 rounded-[22px] bg-gradient-to-r ${exam.tone} px-4 py-4 text-white`}>
                <p className="text-xs font-bold uppercase tracking-[0.22em]">
                  {getGradeLabel(exam.grade)} / {getSubjectLabel(exam.subject)}
                </p>
                <h3 className="mt-2 text-xl font-black">{exam.title}</h3>
              </div>
              <p className="text-sm leading-6">{exam.summary}</p>
              <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.18em] opacity-80">
                <span>{exam.durationMinutes} phút</span>
                <span>{exam.questionCount} câu</span>
                <span>{formatDate(exam.createdAt)}</span>
              </div>
            </button>
          ))}
        </div>
      </aside>

      <div className="space-y-6 rounded-[34px] border border-white/55 bg-white/80 p-6 shadow-[0_28px_80px_rgba(64,73,104,0.12)]">
        {selectedExam ? (
          <>
            <div className={`rounded-[30px] bg-gradient-to-br ${selectedExam.tone} p-6 text-white`}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.26em]">
                    Nhập mật khẩu để vào thi
                  </p>
                  <h2 className="mt-3 text-3xl font-black">{selectedExam.title}</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-white/90">
                    {selectedExam.summary}
                  </p>
                </div>

                <div className="rounded-[24px] bg-white/20 px-4 py-3 text-sm font-semibold backdrop-blur-sm">
                  <p>{selectedExam.durationMinutes} phút</p>
                  <p>{selectedExam.questionCount} câu hỏi</p>
                </div>
              </div>
            </div>

            {!examUnlocked ? (
              <div className="grid gap-4 rounded-[30px] border border-[#e2e7fb] bg-[#f7f8fe] p-6 lg:grid-cols-[1fr_auto] lg:items-end">
                <label className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#6d7fa6]">
                    Mật khẩu vào thi
                  </span>
                  <input
                    value={accessCode}
                    onChange={(event) => setAccessCode(event.target.value.toUpperCase())}
                    placeholder="Nhập mật khẩu"
                    className="w-full rounded-[22px] border border-[#d5ddf7] bg-white px-4 py-3 text-sm text-[#24334d] outline-none transition focus:border-[#ff7b54]"
                  />
                </label>

                <button
                  type="button"
                  onClick={() => {
                    if (accessCode.trim() === selectedExam.accessCode) {
                      setExamUnlocked(true);
                      setFeedback("Mật khẩu đúng. Em có thể bắt đầu bài thi.");
                    } else {
                      setFeedback("Mật khẩu chưa đúng. Anh kiểm tra lại giúp em.");
                    }
                  }}
                  className="rounded-full bg-[#1f2a44] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                >
                  Mở bài thi
                </button>

                {feedback ? (
                  <p className="text-sm font-medium text-[#31456a] lg:col-span-2">{feedback}</p>
                ) : null}
              </div>
            ) : null}

            {examUnlocked ? (
              <div className="space-y-6">
                <div className="grid gap-4 rounded-[28px] bg-[#f7f8fe] p-5 lg:grid-cols-[1fr_auto_auto] lg:items-center">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#6d7fa6]">
                      Tiến độ làm bài
                    </p>
                    <div className="mt-3 h-3 overflow-hidden rounded-full bg-white">
                      <div
                        className="h-full rounded-full bg-[linear-gradient(90deg,#ff9f1c,#ff7b54)] transition-all"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                  <div className="rounded-[22px] bg-white px-4 py-3 text-center text-sm font-semibold text-[#1f2a44]">
                    {Object.keys(answers).length}/{selectedExam.questions.length} câu
                  </div>
                  <div className="rounded-[22px] bg-white px-4 py-3 text-center text-sm font-semibold text-[#1f2a44]">
                    {formatSeconds(timeLeft ?? 0)}
                  </div>
                </div>

                {!examStarted ? (
                  <button
                    type="button"
                    onClick={() => {
                      setExamStarted(true);
                      setResult(null);
                      setAnswers({});
                      setTimeLeft(selectedExam.durationMinutes * 60);
                    }}
                    className="rounded-full bg-[#ff7b54] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(255,123,84,0.26)] transition hover:-translate-y-0.5"
                  >
                    Bắt đầu làm bài
                  </button>
                ) : null}

                {examStarted ? (
                  <div className="space-y-5">
                    {selectedExam.questions.map((question, questionIndex) => (
                      <article
                        key={question.id}
                        className="rounded-[28px] border border-[#e2e7fb] bg-white p-5 shadow-[0_18px_45px_rgba(87,96,123,0.08)]"
                      >
                        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ff7b54]">
                          Câu {questionIndex + 1}
                        </p>
                        <h3 className="mt-3 text-lg font-bold leading-8 text-[#1f2a44]">
                          {question.prompt}
                        </h3>

                        <div className="mt-4 grid gap-3">
                          {question.choices.map((choice, choiceIndex) => {
                            const checked = answers[question.id] === choiceIndex;

                            return (
                              <label
                                key={`${question.id}-${choiceIndex}`}
                                className={`flex cursor-pointer items-center gap-3 rounded-[22px] border px-4 py-3 text-sm transition ${
                                  checked
                                    ? "border-[#ff9f1c] bg-[#fff4e7] text-[#1f2a44]"
                                    : "border-[#dbe2f7] bg-[#f9faff] text-[#50627f]"
                                }`}
                              >
                                <input
                                  type="radio"
                                  name={question.id}
                                  checked={checked}
                                  onChange={() =>
                                    setAnswers((current) => ({
                                      ...current,
                                      [question.id]: choiceIndex,
                                    }))
                                  }
                                  className="h-4 w-4 accent-[#ff7b54]"
                                />
                                <span>{choice}</span>
                              </label>
                            );
                          })}
                        </div>
                      </article>
                    ))}

                    <button
                      type="button"
                      onClick={() => finishExam(selectedExam)}
                      className="rounded-full bg-[#1f2a44] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                    >
                      Nộp bài và chấm điểm
                    </button>
                  </div>
                ) : null}

                {result ? (
                  <div className="rounded-[30px] border border-[#cfe1c8] bg-[#eef7ea] p-6 text-[#295135]">
                    <p className="text-xs font-bold uppercase tracking-[0.24em]">Kết quả</p>
                    <h3 className="mt-2 text-3xl font-black">
                      {result.score}/{result.total} câu đúng
                    </h3>
                    <p className="mt-3 text-sm leading-7">
                      Tỷ lệ hoàn thành: {Math.round((result.score / result.total) * 100)}%.
                      Anh có thể xem từng câu phía dưới để đối chiếu đáp án.
                    </p>

                    <div className="mt-5 space-y-4">
                      {selectedExam.questions.map((question, index) => {
                        const selectedAnswer = answers[question.id];
                        const correct = selectedAnswer === question.correctIndex;

                        return (
                          <div
                            key={`${question.id}-review`}
                            className="rounded-[22px] bg-white/75 px-4 py-4 text-sm"
                          >
                            <p className="font-semibold">
                              Câu {index + 1}: {correct ? "Đúng" : "Cần xem lại"}
                            </p>
                            <p className="mt-2">
                              Đáp án của em:{" "}
                              {selectedAnswer !== undefined
                                ? question.choices[selectedAnswer]
                                : "Chưa chọn"}
                            </p>
                            <p className="mt-1">
                              Đáp án đúng: {question.choices[question.correctIndex]}
                            </p>
                            {question.explanation ? (
                              <p className="mt-1 text-[#53705d]">{question.explanation}</p>
                            ) : null}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </>
        ) : (
          <div className="rounded-[28px] border border-dashed border-[#c9d2ef] bg-white/70 px-6 py-10 text-center text-[#50627f]">
            Chưa có bài thi phù hợp với bộ lọc hiện tại.
          </div>
        )}
      </div>
    </section>
  );

  function finishExam(exam: ExamItem) {
    const score = exam.questions.reduce((total, question) => {
      return total + Number(answers[question.id] === question.correctIndex);
    }, 0);

    setResult({ score, total: exam.questions.length });
    setExamStarted(false);
  }
}

function formatSeconds(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}`;
}
