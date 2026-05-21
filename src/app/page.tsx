import Link from "next/link";

import { gradeOptions, statCards } from "@/app/_data/content";
import {
  getClassPosts,
  getExams,
  getExternalResources,
  getMaterials,
  getPreschoolGames,
} from "@/app/_data/storage";
import { formatDate, getGradeLabel, getSubjectLabel } from "@/app/_data/utils";

export default async function Home() {
  const [materials, exams, posts, resources, preschoolGames] = await Promise.all([
    getMaterials(),
    getExams(),
    getClassPosts(),
    getExternalResources(),
    getPreschoolGames(),
  ]);

  return (
    <div className="section-shell">
      <section className="mx-auto w-full max-w-7xl px-4 pb-18 pt-10 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[38px] border border-white/55 bg-white/78 p-7 shadow-[0_30px_90px_rgba(64,73,104,0.14)] sm:p-10">
            <div className="inline-flex rounded-full bg-[#fff1e7] px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-[#ff7b54]">
              Nền tảng học tập cho học sinh 4-11 tuổi
            </div>

            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight text-[#1f2a44] sm:text-5xl lg:text-6xl">
              Chào mừng các con đến với Lớp học cô Kim!
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-9 text-[#50627f]">
              Không gian học tập và vui chơi thân thiện dành cho học sinh từ tiền tiểu học đến lớp 5. Tại đây, các con có thể tải tài liệu ôn tập, làm các bài kiểm tra trắc nghiệm vui vẻ và tham gia khu trò chơi phát triển trí tuệ.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/tai-lieu"
                className="rounded-full bg-[#1f2a44] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_36px_rgba(31,42,68,0.24)]"
              >
                Xem thư viện tài liệu
              </Link>
              <Link
                href="/be-vui-hoc"
                className="rounded-full bg-[#ff7b54] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_36px_rgba(255,123,84,0.26)]"
              >
                Vào khu Bé vui học
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full bg-[#eef6ff] px-4 py-2 text-sm font-semibold text-[#2656a8]">
                Sửa nội dung bằng file local
              </span>
              <span className="rounded-full bg-[#fff5e3] px-4 py-2 text-sm font-semibold text-[#b4692c]">
                Commit lên Vercel là build lại
              </span>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[36px] bg-[linear-gradient(135deg,#ff8a5b,#ffd166,#fff0c7)] p-7 text-white shadow-[0_30px_90px_rgba(255,138,91,0.24)]">
              <p className="text-xs font-bold uppercase tracking-[0.3em]">Bảng điều khiển nhanh</p>
              <div className="mt-5 grid gap-3">
                {[
                  { label: "Tài liệu theo khối", note: "Tìm nhanh theo môn học và khối lớp" },
                  { label: "Bài thi có chấm điểm", note: "Làm bài xong là xem điểm và đáp án" },
                  { label: "Lớp học và nhật ký", note: "Đăng ảnh, ghi chú, hoạt động từng tuần" },
                ].map((item) => (
                  <div key={item.label} className="rounded-[24px] bg-white/20 px-4 py-4 backdrop-blur-sm">
                    <p className="text-lg font-black">{item.label}</p>
                    <p className="mt-1 text-sm text-white/90">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {statCards.map((card) => (
                <article
                  key={card.label}
                  className="rounded-[28px] border border-white/55 bg-white/80 p-5 shadow-[0_18px_50px_rgba(64,73,104,0.12)]"
                >
                  <p className="text-3xl font-black text-[#1f2a44]">{card.value}</p>
                  <p className="mt-2 text-sm font-semibold text-[#31456a]">{card.label}</p>
                  <p className="mt-2 text-sm leading-6 text-[#6d7fa6]">{card.note}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-[38px] border border-white/55 bg-white/78 p-6 shadow-[0_28px_80px_rgba(64,73,104,0.12)]">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#ff7b54]">
                Khối học
              </p>
              <h2 className="mt-2 text-3xl font-black text-[#1f2a44]">
                Lộ trình từ tiền tiểu học đến lớp 5
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-[#50627f]">
              Mỗi khối được phân màu riêng để phụ huynh và học sinh dễ chọn tài liệu, bài thi và khu hoạt động phù hợp.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-6">
            {gradeOptions.map((grade) => (
              <article
                key={grade.id}
                className="overflow-hidden rounded-[28px] border border-white/65 bg-white shadow-[0_16px_40px_rgba(64,73,104,0.08)]"
              >
                <div className={`bg-gradient-to-r ${grade.accent} px-5 py-4 text-white`}>
                  <p className="text-xl font-black">{grade.label}</p>
                  <p className="mt-1 text-sm text-white/90">{grade.age}</p>
                </div>
                <div className="space-y-3 px-5 py-5 text-sm text-[#50627f]">
                  <p>Tài liệu được chọn lọc theo độ tuổi và kỹ năng chính.</p>
                  <p>Bài thi mẫu có đáp án để ôn tập hoặc kiểm tra nhanh.</p>
                  <p>Khu lớp học và hoạt động để phụ huynh theo dõi tiến trình.</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="rounded-[34px] border border-white/55 bg-white/82 p-6 shadow-[0_24px_60px_rgba(64,73,104,0.12)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#ff7b54]">
                Nổi bật
              </p>
              <h2 className="mt-2 text-2xl font-black text-[#1f2a44]">Tài liệu mới</h2>
            </div>
            <Link href="/tai-lieu" className="text-sm font-semibold text-[#ff7b54]">
              Xem tất cả
            </Link>
          </div>
          <div className="mt-5 space-y-4">
            {materials.slice(0, 3).map((item) => (
              <article key={item.id} className="rounded-[24px] bg-[#f7f8fe] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6d7fa6]">
                  {getGradeLabel(item.grade)} / {getSubjectLabel(item.subject)}
                </p>
                <h3 className="mt-2 text-lg font-black text-[#1f2a44]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#50627f]">{item.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-[34px] border border-white/55 bg-white/82 p-6 shadow-[0_24px_60px_rgba(64,73,104,0.12)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#ff7b54]">
                Nổi bật
              </p>
              <h2 className="mt-2 text-2xl font-black text-[#1f2a44]">Bài thi mở nhanh</h2>
            </div>
            <Link href="/kiem-tra" className="text-sm font-semibold text-[#ff7b54]">
              Vào trung tâm thi
            </Link>
          </div>
          <div className="mt-5 space-y-4">
            {exams.slice(0, 3).map((item) => (
              <article key={item.id} className="rounded-[24px] bg-[#f7f8fe] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6d7fa6]">
                  {item.durationMinutes} phút / {item.questionCount} câu
                </p>
                <h3 className="mt-2 text-lg font-black text-[#1f2a44]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#50627f]">{item.summary}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-[34px] border border-white/55 bg-white/82 p-6 shadow-[0_24px_60px_rgba(64,73,104,0.12)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#ff7b54]">
                Nổi bật
              </p>
              <h2 className="mt-2 text-2xl font-black text-[#1f2a44]">Nhật ký lớp học</h2>
            </div>
            <Link href="/lop-hoc" className="text-sm font-semibold text-[#ff7b54]">
              Xem album
            </Link>
          </div>
          <div className="mt-5 space-y-4">
            {posts.slice(0, 3).map((item) => (
              <article key={item.id} className="rounded-[24px] bg-[#f7f8fe] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6d7fa6]">
                  {item.className} / {formatDate(item.createdAt)}
                </p>
                <h3 className="mt-2 text-lg font-black text-[#1f2a44]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#50627f]">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="rounded-[34px] border border-white/55 bg-white/82 p-6 shadow-[0_24px_60px_rgba(64,73,104,0.12)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#ff7b54]">
                Tiền tiểu học
              </p>
              <h2 className="mt-2 text-2xl font-black text-[#1f2a44]">Khu Bé vui học</h2>
            </div>
            <Link href="/be-vui-hoc" className="text-sm font-semibold text-[#ff7b54]">
              Chơi ngay
            </Link>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {preschoolGames.map((game) => (
              <article key={game.id} className="overflow-hidden rounded-[26px] border border-white/60 bg-[#f8fbff]">
                <div className={`bg-gradient-to-r ${game.accent} px-4 py-4 text-white`}>
                  <h3 className="text-lg font-black">{game.title}</h3>
                </div>
                <div className="p-4 text-sm leading-7 text-[#50627f]">{game.description}</div>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-[34px] border border-white/55 bg-white/82 p-6 shadow-[0_24px_60px_rgba(64,73,104,0.12)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#ff7b54]">
                Nguồn tham khảo
              </p>
              <h2 className="mt-2 text-2xl font-black text-[#1f2a44]">Kho bài tập để biên soạn đề</h2>
            </div>
            <Link href="/tai-lieu" className="text-sm font-semibold text-[#ff7b54]">
              Mở thư viện
            </Link>
          </div>
          <div className="mt-5 space-y-4">
            {resources.slice(0, 4).map((item) => (
              <article key={item.id} className="rounded-[24px] bg-[#f7f8fe] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6d7fa6]">
                  {getGradeLabel(item.grade)} / {getSubjectLabel(item.subject)}
                </p>
                <h3 className="mt-2 text-lg font-black text-[#1f2a44]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#50627f]">{item.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
