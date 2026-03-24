import Link from "next/link";

import { MaterialsExplorer } from "@/app/_components/materials-explorer";
import { getExternalResources, getMaterials } from "@/app/_data/storage";
import { getGradeLabel, getSubjectLabel } from "@/app/_data/utils";

export default async function MaterialsPage() {
  const [items, resources] = await Promise.all([getMaterials(), getExternalResources()]);

  return (
    <div className="section-shell mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[38px] border border-white/55 bg-white/78 p-7 shadow-[0_28px_80px_rgba(64,73,104,0.12)] sm:p-9">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#ff7b54]">
          Thư viện tài liệu
        </p>
        <div className="mt-4 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <h1 className="text-4xl font-black leading-tight text-[#1f2a44]">
              Chọn tài liệu theo từng khối, từng môn học và từng mục tiêu ôn luyện.
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[#50627f]">
              Từ tiền tiểu học đến lớp 5, mỗi tài liệu đều được nhóm theo khối và môn để giáo viên, phụ huynh và học sinh dễ tìm. Nội dung chính được sửa trực tiếp trong repo nên rất gọn khi deploy Vercel.
            </p>
          </div>
          <div className="rounded-[30px] bg-[linear-gradient(135deg,#ffd166,#ff8a5b)] p-6 text-white shadow-[0_20px_44px_rgba(255,138,91,0.24)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em]">Trạng thái dữ liệu</p>
            <p className="mt-3 text-3xl font-black">{items.length} tài liệu local</p>
            <p className="mt-2 text-sm leading-7 text-white/90">
              Khi cần cập nhật, anh chỉ việc sửa file dữ liệu rồi commit. Không cần tài khoản hay trang quản trị riêng.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-8">
        <MaterialsExplorer items={items} />
      </div>

      <section className="mt-10 rounded-[38px] border border-white/55 bg-white/78 p-7 shadow-[0_28px_80px_rgba(64,73,104,0.12)] sm:p-9">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#ff7b54]">
              Nguồn tham khảo
            </p>
            <h2 className="mt-2 text-3xl font-black text-[#1f2a44]">
              Gợi ý nguồn bài tập và đề có đáp án theo khối
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-[#50627f]">
            Đây là các nguồn tham khảo em đã chọn để anh biên tập lại thành nội dung local trong repo.
          </p>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {resources.map((item) => (
            <article
              key={item.id}
              className="rounded-[28px] border border-white/60 bg-[#f8fbff] p-5 shadow-[0_16px_40px_rgba(64,73,104,0.08)]"
            >
              <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#6d7fa6]">
                <span className="rounded-full bg-white px-3 py-1">
                  {getGradeLabel(item.grade)}
                </span>
                <span className="rounded-full bg-white px-3 py-1">
                  {getSubjectLabel(item.subject)}
                </span>
                <span className="rounded-full bg-white px-3 py-1">{item.format}</span>
              </div>
              <h3 className="mt-4 text-xl font-black text-[#1f2a44]">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#50627f]">{item.note}</p>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-semibold text-[#31456a]">
                  Nguồn: {item.source}
                  {item.isPaid ? " · Có thể cần mở kho tài liệu" : ""}
                </p>
                <Link
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-[#1f2a44] px-4 py-2 text-sm font-semibold text-white"
                >
                  Mở nguồn
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
