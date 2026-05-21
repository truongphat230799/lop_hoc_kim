import {
  gradeOptions,
  materialTypeLabels,
  moodLabels,
  subjectOptions,
} from "@/app/_data/content";
import { formatDate } from "@/app/_data/utils";
import {
  deleteClassPostAction,
  deleteExamAction,
  deleteMaterialAction,
  getAdminData,
  isAdminAuthenticated,
  loginAdmin,
  logoutAdmin,
  upsertClassPostAction,
  upsertExamAction,
  upsertMaterialAction,
} from "@/app/quan-tri/actions";

const materialTypeOptions = Object.entries(materialTypeLabels);
const moodOptions = Object.entries(moodLabels);

export default async function AdminPage() {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    return (
      <div className="section-shell mx-auto flex min-h-[70vh] w-full max-w-3xl items-center px-4 py-10 sm:px-6 lg:px-8">
        <section className="w-full rounded-[38px] border border-white/55 bg-white/82 p-7 shadow-[0_28px_80px_rgba(64,73,104,0.12)] sm:p-9">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#ff7b54]">
            Quản trị nội dung
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-[#1f2a44]">
            Đăng nhập để quản lý tài liệu, bài thi và nhật ký lớp học.
          </h1>
          <p className="mt-4 text-base leading-8 text-[#50627f]">
            Phase 1 đã chuyển khu này thành admin thật. Anh đăng nhập bằng mật khẩu quản trị để sửa nội dung trực tiếp trên web.
          </p>

          <form action={loginAdmin} className="mt-8 grid gap-4 rounded-[30px] bg-[#f7f8fe] p-6">
            <label className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#6d7fa6]">
                Mật khẩu quản trị
              </span>
              <input
                type="password"
                name="password"
                placeholder="Nhập mật khẩu"
                className="w-full rounded-[22px] border border-[#d5ddf7] bg-white px-4 py-3 text-sm text-[#24334d] outline-none transition focus:border-[#ff7b54]"
              />
            </label>
            <button
              type="submit"
              className="w-fit rounded-full bg-[#1f2a44] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
            >
              Đăng nhập quản trị
            </button>
          </form>

          <div className="mt-6 rounded-[24px] bg-[#fff6ee] px-5 py-4 text-sm leading-7 text-[#50627f]">
            Mặc định hệ thống dùng biến môi trường <span className="font-mono text-[#1f2a44]">ADMIN_PASSWORD</span>. Nếu chưa cấu hình, hệ thống đang fallback về mật khẩu cũ để anh test nhanh local.
          </div>
        </section>
      </div>
    );
  }

  const { materials, exams, posts } = await getAdminData();

  return (
    <div className="section-shell mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[38px] border border-white/55 bg-white/78 p-7 shadow-[0_28px_80px_rgba(64,73,104,0.12)] sm:p-9">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#ff7b54]">
              Admin dashboard
            </p>
            <h1 className="mt-4 text-4xl font-black leading-tight text-[#1f2a44]">
              Quản lý nội dung trực tiếp trên web thay vì sửa seed bằng tay.
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[#50627f]">
              Dữ liệu phase 1 được lưu local tại <span className="font-mono text-[#1f2a44]">.data/admin-content.json</span>. Sang phase 2 em sẽ nối sang storage bền vững và upload file/ảnh.
            </p>
          </div>
          <form action={logoutAdmin}>
            <button
              type="submit"
              className="rounded-full bg-[#1f2a44] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
            >
              Đăng xuất
            </button>
          </form>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { label: "Tài liệu", value: materials.length },
            { label: "Bài thi", value: exams.length },
            { label: "Bài lớp học", value: posts.length },
          ].map((item) => (
            <article key={item.label} className="rounded-[26px] border border-white/60 bg-white/82 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#6d7fa6]">{item.label}</p>
              <p className="mt-3 text-3xl font-black text-[#1f2a44]">{item.value}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="mt-8 grid gap-8">
        <section className="rounded-[34px] border border-white/55 bg-white/82 p-6 shadow-[0_24px_60px_rgba(64,73,104,0.12)]">
          <h2 className="text-2xl font-black text-[#1f2a44]">Tài liệu</h2>
          <p className="mt-2 text-sm leading-7 text-[#50627f]">Thêm nhanh tài liệu mới hoặc sửa tài liệu hiện có.</p>
          <AdminMaterialForm />
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {materials.map((item) => (
              <article key={item.id} className="rounded-[26px] bg-[#f7f8fe] p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-black text-[#1f2a44]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[#50627f]">{item.description}</p>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#6d7fa6]">
                      {item.grade} · {item.subject} · {item.type} · {formatDate(item.createdAt)}
                    </p>
                  </div>
                  <DeleteForm action={deleteMaterialAction} id={item.id} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[34px] border border-white/55 bg-white/82 p-6 shadow-[0_24px_60px_rgba(64,73,104,0.12)]">
          <h2 className="text-2xl font-black text-[#1f2a44]">Bài thi</h2>
          <p className="mt-2 text-sm leading-7 text-[#50627f]">Nhập metadata và danh sách câu hỏi dạng JSON.</p>
          <AdminExamForm />
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {exams.map((item) => (
              <article key={item.id} className="rounded-[26px] bg-[#f7f8fe] p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-black text-[#1f2a44]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[#50627f]">{item.summary}</p>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#6d7fa6]">
                      {item.grade} · {item.subject} · {item.durationMinutes} phút · {item.questions.length} câu
                    </p>
                  </div>
                  <DeleteForm action={deleteExamAction} id={item.id} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[34px] border border-white/55 bg-white/82 p-6 shadow-[0_24px_60px_rgba(64,73,104,0.12)]">
          <h2 className="text-2xl font-black text-[#1f2a44]">Nhật ký lớp học</h2>
          <p className="mt-2 text-sm leading-7 text-[#50627f]">Tạo bài lớp học với tag, ảnh và cảm xúc hiển thị.</p>
          <AdminClassPostForm />
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {posts.map((item) => (
              <article key={item.id} className="rounded-[26px] bg-[#f7f8fe] p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-black text-[#1f2a44]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[#50627f]">{item.body}</p>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#6d7fa6]">
                      {item.className} · {item.mood} · {formatDate(item.createdAt)}
                    </p>
                  </div>
                  <DeleteForm action={deleteClassPostAction} id={item.id} />
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function AdminMaterialForm() {
  return (
    <form action={upsertMaterialAction} encType="multipart/form-data" className="mt-6 grid gap-4 rounded-[28px] bg-[#fffaf4] p-5 lg:grid-cols-2">
      <input name="id" placeholder="id (để trống nếu tạo mới)" className={inputClassName} />
      <input name="title" placeholder="Tiêu đề" className={inputClassName} required />
      <textarea name="description" placeholder="Mô tả" className={`${inputClassName} min-h-28 lg:col-span-2`} required />
      <SelectGrade />
      <SelectSubject />
      <label className="space-y-2">
        <span className={labelClassName}>Loại tài liệu</span>
        <select name="type" className={inputClassName} defaultValue="worksheet">
          {materialTypeOptions.map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </label>
      <input name="author" placeholder="Tác giả/Nguồn" className={inputClassName} />
      <input name="createdAt" type="date" className={inputClassName} />
      <input name="coverTone" placeholder="from-[#ffd166] to-[#ff7b54]" className={inputClassName} />
      <input name="fileName" placeholder="Tên file" className={inputClassName} />
      <input name="fileUrl" placeholder="Link file hoặc nguồn" className={`${inputClassName} lg:col-span-2`} />
      <label className="space-y-2 lg:col-span-2">
        <span className={labelClassName}>Upload file tài liệu</span>
        <input name="file" type="file" className={inputClassName} />
      </label>
      <input name="ctaLabel" placeholder="Nhãn nút" className={inputClassName} />
      <label className="flex items-center gap-3 rounded-[22px] border border-[#d5ddf7] bg-white px-4 py-3 text-sm text-[#24334d]">
        <input type="checkbox" name="downloadable" defaultChecked className="accent-[#ff7b54]" />
        Có thể mở/tải
      </label>
      <button type="submit" className={submitClassName}>Lưu tài liệu</button>
    </form>
  );
}

function AdminExamForm() {
  return (
    <form action={upsertExamAction} className="mt-6 grid gap-4 rounded-[28px] bg-[#fffaf4] p-5 lg:grid-cols-2">
      <input name="id" placeholder="id (để trống nếu tạo mới)" className={inputClassName} />
      <input name="title" placeholder="Tiêu đề bài thi" className={inputClassName} required />
      <textarea name="summary" placeholder="Mô tả ngắn" className={`${inputClassName} min-h-24 lg:col-span-2`} required />
      <SelectGrade />
      <SelectSubject />
      <input name="durationMinutes" type="number" min="1" placeholder="Thời gian (phút)" className={inputClassName} defaultValue="10" required />
      <input name="accessCode" placeholder="Mật khẩu vào thi" className={inputClassName} required />
      <input name="createdAt" type="date" className={inputClassName} />
      <input name="tone" placeholder="from-[#72ddf7] to-[#00a6fb]" className={inputClassName} />
      <textarea
        name="questions"
        required
        className={`${inputClassName} min-h-52 font-mono text-xs lg:col-span-2`}
        defaultValue={'[{"id":"q1","prompt":"2 + 2 bằng bao nhiêu?","choices":["3","4","5","6"],"correctIndex":1,"explanation":"2 cộng 2 bằng 4."}]'}
      />
      <button type="submit" className={submitClassName}>Lưu bài thi</button>
    </form>
  );
}

function AdminClassPostForm() {
  return (
    <form action={upsertClassPostAction} encType="multipart/form-data" className="mt-6 grid gap-4 rounded-[28px] bg-[#fffaf4] p-5 lg:grid-cols-2">
      <input name="id" placeholder="id (để trống nếu tạo mới)" className={inputClassName} />
      <input name="title" placeholder="Tiêu đề bài đăng" className={inputClassName} required />
      <textarea name="body" placeholder="Nội dung" className={`${inputClassName} min-h-28 lg:col-span-2`} required />
      <input name="className" placeholder="Tên lớp" className={inputClassName} required />
      <label className="space-y-2">
        <span className={labelClassName}>Mood</span>
        <select name="mood" className={inputClassName} defaultValue="sunny">
          {moodOptions.map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </label>
      <input name="createdAt" type="date" className={inputClassName} />
      <input name="tags" placeholder="tag1, tag2, tag3" className={inputClassName} />
      <input name="imageUrl" placeholder="Link ảnh hoặc data URL" className={`${inputClassName} lg:col-span-2`} />
      <label className="space-y-2 lg:col-span-2">
        <span className={labelClassName}>Upload ảnh lớp học</span>
        <input name="image" type="file" accept="image/*" className={inputClassName} />
      </label>
      <input name="imageAlt" placeholder="Mô tả ảnh" className={inputClassName} />
      <button type="submit" className={submitClassName}>Lưu bài đăng</button>
    </form>
  );
}

function SelectGrade() {
  return (
    <label className="space-y-2">
      <span className={labelClassName}>Khối</span>
      <select name="grade" className={inputClassName} defaultValue="grade-1">
        {gradeOptions.map((grade) => (
          <option key={grade.id} value={grade.id}>{grade.label}</option>
        ))}
      </select>
    </label>
  );
}

function SelectSubject() {
  return (
    <label className="space-y-2">
      <span className={labelClassName}>Môn học</span>
      <select name="subject" className={inputClassName} defaultValue="math">
        {subjectOptions.map((subject) => (
          <option key={subject.id} value={subject.id}>{subject.label}</option>
        ))}
      </select>
    </label>
  );
}

function DeleteForm({ action, id }: { action: (formData: FormData) => Promise<void>; id: string }) {
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="rounded-full bg-[#ffe4db] px-4 py-2 text-sm font-semibold text-[#c2562f] transition hover:-translate-y-0.5">
        Xóa
      </button>
    </form>
  );
}

const inputClassName = "w-full rounded-[22px] border border-[#d5ddf7] bg-white px-4 py-3 text-sm text-[#24334d] outline-none transition focus:border-[#ff7b54]";
const labelClassName = "text-xs font-bold uppercase tracking-[0.2em] text-[#6d7fa6]";
const submitClassName = "w-fit rounded-full bg-[#1f2a44] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5";
