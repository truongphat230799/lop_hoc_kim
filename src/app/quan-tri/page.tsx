import { siteName } from "@/app/_data/content";
import { getLocalEditingGuides } from "@/app/_data/storage";

const commands = [
  "npm run dev",
  "git add .",
  'git commit -m "Cập nhật nội dung"',
  "git push",
];

export default async function LocalEditPage() {
  const guides = await getLocalEditingGuides();

  return (
    <div className="section-shell mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[38px] border border-white/55 bg-white/78 p-7 shadow-[0_28px_80px_rgba(64,73,104,0.12)] sm:p-9">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#ff7b54]">
          Cập nhật local
        </p>
        <div className="mt-4 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <h1 className="text-4xl font-black leading-tight text-[#1f2a44]">
              {siteName} không dùng tài khoản hay trang admin riêng nữa.
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[#50627f]">
              Khi cần đổi tài liệu, bài thi, bài lớp học hoặc game cho bé, anh chỉ việc sửa file local trong project rồi commit. Vercel sẽ build lại từ source mới, gọn và dễ bảo trì hơn.
            </p>
          </div>
          <div className="rounded-[30px] bg-[linear-gradient(135deg,#cdb4db,#ffafcc)] p-6 text-white shadow-[0_20px_44px_rgba(205,180,219,0.26)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em]">Luồng làm việc</p>
            <p className="mt-3 text-3xl font-black">Sửa local rồi push</p>
            <p className="mt-2 text-sm leading-7 text-white/90">
              Cấu trúc này phù hợp khi nội dung không thay đổi quá thường xuyên và muốn kiểm soát bằng Git.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[34px] border border-white/55 bg-white/82 p-6 shadow-[0_24px_60px_rgba(64,73,104,0.12)]">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ff7b54]">
            Các file nên sửa
          </p>
          <div className="mt-5 grid gap-4">
            {guides.map((guide) => (
              <article
                key={guide.id}
                className="rounded-[26px] border border-white/60 bg-[#f7f8fe] p-5"
              >
                <h2 className="text-xl font-black text-[#1f2a44]">{guide.title}</h2>
                <p className="mt-2 font-mono text-sm text-[#ff7b54]">{guide.path}</p>
                <p className="mt-3 text-sm leading-7 text-[#50627f]">{guide.summary}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="space-y-6 rounded-[34px] border border-white/55 bg-white/82 p-6 shadow-[0_24px_60px_rgba(64,73,104,0.12)]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ff7b54]">
              Quy trình ngắn
            </p>
            <ol className="mt-4 space-y-3 text-sm leading-7 text-[#50627f]">
              <li>1. Chạy local để xem trước giao diện và nội dung.</li>
              <li>2. Sửa dữ liệu hoặc giao diện trong các file ở cột bên trái.</li>
              <li>3. Commit và push để Vercel build lại bản mới.</li>
            </ol>
          </div>

          <div className="rounded-[26px] bg-[#1f2a44] p-5 text-white">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/75">
              Lệnh thường dùng
            </p>
            <div className="mt-4 space-y-3">
              {commands.map((command) => (
                <div
                  key={command}
                  className="rounded-[18px] bg-white/10 px-4 py-3 font-mono text-sm"
                >
                  {command}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
