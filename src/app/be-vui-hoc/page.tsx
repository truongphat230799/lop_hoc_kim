import { PreschoolPlayground } from "@/app/_components/preschool-playground";
import { getPreschoolGames } from "@/app/_data/storage";

export default async function PreschoolPage() {
  const games = await getPreschoolGames();

  return (
    <div className="section-shell mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[38px] border border-white/55 bg-white/78 p-7 shadow-[0_28px_80px_rgba(64,73,104,0.12)] sm:p-9">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#ff7b54]">
          Bé vui học
        </p>
        <div className="mt-4 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <h1 className="text-4xl font-black leading-tight text-[#1f2a44]">
              Không gian học vui cho tiền tiểu học: học chữ, ghép tiếng và làm toán thật nhẹ nhàng.
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[#50627f]">
              Khu này dành riêng cho các bé mới làm quen với chữ và số. Giao diện lớn, màu sắc tươi, thao tác đơn giản để cô và phụ huynh có thể cho bé chơi học ngay trên web.
            </p>
          </div>
          <div className="rounded-[30px] bg-[linear-gradient(135deg,#ffb703,#fb8500)] p-6 text-white shadow-[0_20px_44px_rgba(251,133,0,0.22)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em]">Mini game hiện có</p>
            <p className="mt-3 text-3xl font-black">{games.length} trò chơi</p>
            <p className="mt-2 text-sm leading-7 text-white/90">
              Mỗi trò chơi được thiết kế ngắn gọn để bé học theo từng bước nhỏ, dễ tập trung và dễ khen thưởng.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {games.map((game) => (
          <article
            key={game.id}
            className="overflow-hidden rounded-[28px] border border-white/60 bg-white/82 shadow-[0_18px_50px_rgba(64,73,104,0.12)]"
          >
            <div className={`bg-gradient-to-r ${game.accent} p-5 text-white`}>
              <p className="text-xs font-bold uppercase tracking-[0.22em]">Tiền tiểu học</p>
              <h2 className="mt-2 text-2xl font-black">{game.title}</h2>
            </div>
            <div className="p-5 text-sm leading-7 text-[#50627f]">{game.description}</div>
          </article>
        ))}
      </div>

      <div className="mt-8">
        <PreschoolPlayground />
      </div>
    </div>
  );
}
