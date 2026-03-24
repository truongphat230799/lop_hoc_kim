# Lớp học cô Kim

Website học tập dành cho học sinh từ tiền tiểu học đến lớp 5, xây bằng Next.js App Router và tối ưu để deploy trên Vercel.

## Tính năng chính

- Trang chủ động, trực quan, phù hợp phụ huynh và học sinh.
- Thư viện tài liệu theo khối và môn học, có lọc và tìm kiếm.
- Kiểm tra online trên web, không cần tài khoản, chỉ nhập mật khẩu để vào thi.
- Chấm điểm trực tiếp sau khi nộp bài và xem lại đáp án từng câu.
- Khu lớp học để hiển thị ảnh, nhật ký và hoạt động của lớp.
- Khu `Bé vui học` cho tiền tiểu học: học chữ, ghép tiếng và làm toán đơn giản.
- Nội dung được quản lý bằng file local trong repo, không cần admin panel hay tài khoản quản trị.

## Công nghệ

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4

## Chạy local

```bash
npm install
npm run dev
```

Mở `http://localhost:3000`.

## Mật khẩu bài thi

Tất cả bài kiểm tra hiện dùng chung mật khẩu:

```text
LOPHOCCOKIM
```

## Cách cập nhật nội dung

Anh chủ yếu sẽ sửa các file sau:

- `src/app/_data/content.ts`: dữ liệu tài liệu, bài thi, bài lớp học, nguồn tham khảo.
- `src/app/_data/content-exams.ts`: câu hỏi trắc nghiệm và đáp án.
- `src/app/page.tsx`: nội dung trang chủ.
- `src/app/globals.css`: font Arial, màu sắc và hiệu ứng giao diện.
- `src/app/_components/preschool-playground.tsx`: trò chơi cho bé.

## Quy trình deploy Vercel

1. Sửa nội dung ở local.
2. Kiểm tra lại bằng `npm run lint` và `npm run build`.
3. `git add .`
4. `git commit -m "Cập nhật nội dung"`
5. `git push`
6. Vercel sẽ tự build lại từ source mới.

## Cấu trúc nhanh

- `src/app/page.tsx`: trang chủ
- `src/app/tai-lieu/page.tsx`: thư viện tài liệu
- `src/app/kiem-tra/page.tsx`: trung tâm bài thi
- `src/app/lop-hoc/page.tsx`: nhật ký và album lớp học
- `src/app/be-vui-hoc/page.tsx`: khu mini game cho bé
- `src/app/quan-tri/page.tsx`: hướng dẫn cập nhật local
- `src/app/_components/*`: các thành phần giao diện
- `src/app/_data/*`: dữ liệu nội dung và helper

## Nguồn tham khảo đã gợi ý trong web

Một số nguồn em đã gắn sẵn trong thư viện tham khảo để anh biên tập lại nội dung local:

- https://vndoc.com/de-thi-tieng-viet-lop-1-366623
- https://vndoc.com/de-thi-tieng-viet-lop-2-366616
- https://vndoc.com/de-thi-tieng-anh-lop-3-366529
- https://vndoc.com/bai-tap-toan-lop-4-phep-cong-phan-so-164107
- https://vndoc.com/tron-bo-bai-tap-tieng-viet-co-ban-lop-5-phan-luyen-tu-va-cau-198659
- https://vndoc.com/tong-hop-ngu-phap-tieng-anh-lop-5-171974
