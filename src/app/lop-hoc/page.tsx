import { ClassroomJournal } from "@/app/_components/classroom-journal";
import { getClassPosts } from "@/app/_data/storage";

export default async function ClassroomPage() {
  const posts = await getClassPosts();

  return (
    <div className="section-shell mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[38px] border border-white/55 bg-white/78 p-7 shadow-[0_28px_80px_rgba(64,73,104,0.12)] sm:p-9">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#ff7b54]">
          Lớp học và nhật ký
        </p>
        <div className="mt-4 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <h1 className="text-4xl font-black leading-tight text-[#1f2a44]">
              Ghi lại khoảnh khắc đẹp của lớp bằng hình ảnh, chú thích và nhật ký gần gũi.
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[#50627f]">
              Đây là khu vực kết nối nhà trường với phụ huynh: đăng album, ghi chú tiết học, chia sẻ chủ đề sinh hoạt và lưu lại tiến trình của lớp qua từng tuần.
            </p>
          </div>
          <div className="rounded-[30px] bg-[linear-gradient(135deg,#80ed99,#38b000)] p-6 text-white shadow-[0_20px_44px_rgba(56,176,0,0.2)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em]">Nhật ký mới nhất</p>
            <p className="mt-3 text-3xl font-black">{posts.length} bài đăng lớp học</p>
            <p className="mt-2 text-sm leading-7 text-white/90">
              Nơi cập nhật thường xuyên các hoạt động học tập, sáng tạo và vui chơi đầy thú vị của các con.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-8">
        <ClassroomJournal posts={posts} />
      </div>
    </div>
  );
}
