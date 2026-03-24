import { ExamCenter } from "@/app/_components/exam-center";
import { getExams } from "@/app/_data/storage";

export default async function ExamsPage() {
  const exams = await getExams();

  return (
    <div className="section-shell mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[38px] border border-white/55 bg-white/78 p-7 shadow-[0_28px_80px_rgba(64,73,104,0.12)] sm:p-9">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#ff7b54]">
          Kiểm tra online
        </p>
        <div className="mt-4 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <h1 className="text-4xl font-black leading-tight text-[#1f2a44]">
              Học sinh không cần tài khoản, chỉ cần nhập mật khẩu là vào bài thi ngay.
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[#50627f]">
              Mỗi bài kiểm tra đều có đáp án, đếm ngược thời gian và chấm điểm trực tiếp sau khi nộp bài. Phù hợp cho bài giữa buổi, mini quiz và bài ôn tập ngắn trên web.
            </p>
          </div>
          <div className="rounded-[30px] bg-[linear-gradient(135deg,#72ddf7,#00a6fb)] p-6 text-white shadow-[0_20px_44px_rgba(0,166,251,0.22)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em]">Số bài hiện có</p>
            <p className="mt-3 text-3xl font-black">{exams.length} bài thi</p>
            <p className="mt-2 text-sm leading-7 text-white/90">
              Mật khẩu được cô phát riêng khi vào thi. Học sinh làm xong có thể xem lại đáp án từng câu ngay trên màn hình.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-8">
        <ExamCenter exams={exams} />
      </div>
    </div>
  );
}
