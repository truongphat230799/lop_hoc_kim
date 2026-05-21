import { examsSeed } from "@/app/_data/content-exams";

export type GradeId =
  | "pre-k"
  | "grade-1"
  | "grade-2"
  | "grade-3"
  | "grade-4"
  | "grade-5";

export type MaterialType = "worksheet" | "lesson-plan" | "reading" | "activity";

export type SubjectId =
  | "math"
  | "vietnamese"
  | "english"
  | "science"
  | "life-skills"
  | "art";

export type MaterialItem = {
  id: string;
  title: string;
  description: string;
  grade: GradeId;
  subject: SubjectId;
  type: MaterialType;
  coverTone: string;
  createdAt: string;
  author: string;
  downloadable: boolean;
  fileName?: string;
  fileUrl?: string;
  ctaLabel?: string;
};

export type ExamQuestion = {
  id: string;
  prompt: string;
  choices: string[];
  correctIndex: number;
  explanation?: string;
};

export type ExamItem = {
  id: string;
  title: string;
  summary: string;
  grade: GradeId;
  subject: SubjectId;
  durationMinutes: number;
  accessCode: string;
  createdAt: string;
  questionCount: number;
  tone: string;
  questions: ExamQuestion[];
};

export type ExamResultItem = {
  id: string;
  examId: string;
  examTitle: string;
  studentName: string;
  score: number;
  total: number;
  submittedAt: string;
  durationSeconds: number;
  answers: Record<string, number>;
};

export type ClassPost = {
  id: string;
  title: string;
  body: string;
  className: string;
  createdAt: string;
  imageUrl?: string;
  imageAlt?: string;
  tags: string[];
  mood: "sunny" | "playful" | "calm";
};

export type GradeOption = {
  id: GradeId;
  label: string;
  age: string;
  accent: string;
};

export type SubjectOption = {
  id: SubjectId;
  label: string;
};

export type StatCard = {
  label: string;
  value: string;
  note: string;
};

export type ExternalResource = {
  id: string;
  title: string;
  grade: GradeId;
  subject: SubjectId;
  format: string;
  note: string;
  url: string;
  source: string;
  isPaid?: boolean;
};

export type PreschoolGame = {
  id: string;
  title: string;
  description: string;
  accent: string;
  category: "letters" | "spelling" | "math";
};

export type LocalEditingGuide = {
  id: string;
  title: string;
  path: string;
  summary: string;
};

export const siteName = "Lớp học cô Kim";
export const universalExamPassword = "LOPHOCCOKIM";

export const gradeOptions: GradeOption[] = [
  { id: "pre-k", label: "Tiền tiểu học", age: "4-5 tuổi", accent: "from-[#ffb37a] to-[#ff7b54]" },
  { id: "grade-1", label: "Lớp 1", age: "6 tuổi", accent: "from-[#ffd15c] to-[#ff9f1c]" },
  { id: "grade-2", label: "Lớp 2", age: "7 tuổi", accent: "from-[#80ed99] to-[#38b000]" },
  { id: "grade-3", label: "Lớp 3", age: "8 tuổi", accent: "from-[#72ddf7] to-[#00a6fb]" },
  { id: "grade-4", label: "Lớp 4", age: "9 tuổi", accent: "from-[#bdb2ff] to-[#8f5cff]" },
  { id: "grade-5", label: "Lớp 5", age: "10-11 tuổi", accent: "from-[#ff8fab] to-[#fb5607]" },
];

export const subjectOptions: SubjectOption[] = [
  { id: "math", label: "Toán" },
  { id: "vietnamese", label: "Tiếng Việt" },
  { id: "english", label: "Tiếng Anh" },
  { id: "science", label: "Khoa học" },
  { id: "life-skills", label: "Kỹ năng sống" },
  { id: "art", label: "Mỹ thuật" },
];

export const statCards: StatCard[] = [
  {
    label: "Kho nội dung local",
    value: "6 khối",
    note: "Sửa trực tiếp trong repo rồi commit để Vercel build lại.",
  },
  {
    label: "Đề chấm điểm",
    value: "12",
    note: "Mỗi bài có đáp án, chấm điểm và xem lại câu đúng sai ngay trên web.",
  },
  {
    label: "Trò chơi cho bé",
    value: "3",
    note: "Có khu học chữ, ghép vần và làm phép tính đơn giản cho tiền tiểu học.",
  },
];

export const materialsSeed: MaterialItem[] = [
  {
    id: "material-prek-letters",
    title: "Flashcard chữ cái cho bé",
    description:
      "Bộ thẻ học chữ cái và nhận diện âm đầu cho tiền tiểu học, phù hợp hoạt động tại lớp và ở nhà.",
    grade: "pre-k",
    subject: "vietnamese",
    type: "activity",
    coverTone: "from-[#ffe29f] via-[#ffd6a5] to-[#ffcad4]",
    createdAt: "2026-03-24",
    author: siteName,
    downloadable: true,
    ctaLabel: "Mở tài liệu",
    fileUrl: "https://vndoc.com/de-thi-tieng-viet-lop-1-366623",
    fileName: "tai-lieu-lam-quen-tieng-viet-lop-1-vndoc",
  },
  {
    id: "material-grade1-math",
    title: "Trắc nghiệm Toán lớp 1 có đáp án",
    description:
      "Bộ câu hỏi làm quen dạng trắc nghiệm và bài toán có lời văn cho học sinh lớp 1.",
    grade: "grade-1",
    subject: "math",
    type: "worksheet",
    coverTone: "from-[#f9f871] via-[#ffc75f] to-[#ff9671]",
    createdAt: "2026-03-24",
    author: "VnDoc",
    downloadable: true,
    ctaLabel: "Mở nguồn tham khảo",
    fileUrl: "https://vndoc.com/test-30-cau-hoi-trac-nghiem-toan-lop-1-co-dap-an-207626",
  },
  {
    id: "material-grade2-math",
    title: "15 đề tự luyện Toán lớp 2",
    description:
      "Kho đề ôn tập Toán lớp 2 có đáp án để luyện tính, bài toán lời văn và ôn thi học kỳ.",
    grade: "grade-2",
    subject: "math",
    type: "worksheet",
    coverTone: "from-[#d9ed92] via-[#76c893] to-[#34a0a4]",
    createdAt: "2026-03-24",
    author: "VnDoc",
    downloadable: true,
    ctaLabel: "Xem bộ đề",
    fileUrl: "https://vndoc.com/bo-de-tu-luyen-mon-toan-lop-2-128255",
  },
  {
    id: "material-grade3-math",
    title: "30 bài Toán có lời văn lớp 3",
    description:
      "Tuyển tập bài toán có lời văn lớp 3 kèm hướng dẫn giải, phù hợp làm phiếu bài tập hoặc đề luyện thêm.",
    grade: "grade-3",
    subject: "math",
    type: "worksheet",
    coverTone: "from-[#caf0f8] via-[#90e0ef] to-[#0077b6]",
    createdAt: "2026-03-24",
    author: "VnDoc",
    downloadable: true,
    ctaLabel: "Mở tài liệu",
    fileUrl: "https://vndoc.com/30-bai-toan-co-loi-van-lop-3-124988",
  },
  {
    id: "material-grade4-vietnamese",
    title: "Đọc hiểu Tiếng Việt lớp 4 cả năm",
    description:
      "Nguồn đọc hiểu lớp 4 theo nhiều mức độ, có câu hỏi và đáp án chi tiết để soạn phiếu học tập.",
    grade: "grade-4",
    subject: "vietnamese",
    type: "reading",
    coverTone: "from-[#b8f2e6] via-[#aed9e0] to-[#5e6472]",
    createdAt: "2026-03-24",
    author: "VnDoc",
    downloadable: true,
    ctaLabel: "Mở nguồn đọc hiểu",
    fileUrl: "https://vndoc.com/bo-186-bai-doc-hieu-tieng-viet-lop-4-ca-nam-co-dap-an-375246",
  },
  {
    id: "material-grade5-math",
    title: "Chuyên đề Toán lớp 5 có đáp án",
    description:
      "Tổng hợp chuyên đề Toán lớp 5 theo dạng bài cơ bản và nâng cao để dùng khi làm đề ôn tập.",
    grade: "grade-5",
    subject: "math",
    type: "worksheet",
    coverTone: "from-[#ffd6ff] via-[#e7c6ff] to-[#c8b6ff]",
    createdAt: "2026-03-24",
    author: "VnDoc",
    downloadable: true,
    ctaLabel: "Xem chuyên đề",
    fileUrl: "https://vndoc.com/bai-tap-theo-chuyen-de-mon-toan-lop-5-316813",
  },
];

export const externalResources: ExternalResource[] = [
  {
    id: "res-grade1-math",
    title: "30 câu hỏi trắc nghiệm Toán lớp 1 có đáp án",
    grade: "grade-1",
    subject: "math",
    format: "Bài tập / đáp án",
    note: "Có thể chọn nhanh các câu phù hợp để đưa vào đề kiểm tra local.",
    url: "https://vndoc.com/test-30-cau-hoi-trac-nghiem-toan-lop-1-co-dap-an-207626",
    source: "VnDoc",
  },
  {
    id: "res-grade1-viet",
    title: "Đề thi Tiếng Việt lớp 1 năm 2026",
    grade: "grade-1",
    subject: "vietnamese",
    format: "Đề thi / đáp án",
    note: "Có nhiều mốc giữa kỳ, cuối kỳ để chọn lọc câu hỏi và biên tập lại thành đề local.",
    url: "https://vndoc.com/de-thi-tieng-viet-lop-1-366623",
    source: "VnDoc",
    isPaid: true,
  },
  {
    id: "res-grade2-math",
    title: "Bộ đề tự luyện môn Toán lớp 2",
    grade: "grade-2",
    subject: "math",
    format: "Bộ đề / đáp án",
    note: "Nguồn đề luyện theo mức độ cơ bản, dễ chuyển thành bài tập trong repo.",
    url: "https://vndoc.com/bo-de-tu-luyen-mon-toan-lop-2-128255",
    source: "VnDoc",
  },
  {
    id: "res-grade2-viet",
    title: "Đề thi Tiếng Việt lớp 2 năm 2026",
    grade: "grade-2",
    subject: "vietnamese",
    format: "Đề thi / đáp án",
    note: "Có nhiều bộ sách và các mốc giữa kỳ, cuối kỳ.",
    url: "https://vndoc.com/de-thi-tieng-viet-lop-2-366616",
    source: "VnDoc",
    isPaid: true,
  },
  {
    id: "res-grade3-math",
    title: "30 bài Toán có lời văn lớp 3",
    grade: "grade-3",
    subject: "math",
    format: "Phiếu bài tập / lời giải",
    note: "Rất phù hợp để tách câu hỏi ngắn thành đề luyện trên web.",
    url: "https://vndoc.com/30-bai-toan-co-loi-van-lop-3-124988",
    source: "VnDoc",
  },
  {
    id: "res-grade3-english",
    title: "Đề thi Tiếng Anh lớp 3 năm 2026",
    grade: "grade-3",
    subject: "english",
    format: "Đề thi / đáp án",
    note: "Nguồn tốt để chọn câu hỏi ngữ âm, từ vựng và giao tiếp cơ bản.",
    url: "https://vndoc.com/de-thi-tieng-anh-lop-3-366529",
    source: "VnDoc",
    isPaid: true,
  },
  {
    id: "res-grade4-math",
    title: "Bài tập Toán lớp 4: Phép cộng phân số",
    grade: "grade-4",
    subject: "math",
    format: "Chuyên đề / đáp án",
    note: "Có mô tả số trang và số câu, phù hợp đưa vào kho luyện chuyên đề.",
    url: "https://vndoc.com/bai-tap-toan-lop-4-phep-cong-phan-so-164107",
    source: "VnDoc",
    isPaid: true,
  },
  {
    id: "res-grade4-viet",
    title: "186 bài đọc hiểu Tiếng Việt lớp 4 cả năm",
    grade: "grade-4",
    subject: "vietnamese",
    format: "Đọc hiểu / đáp án",
    note: "Có sẵn câu hỏi đọc hiểu theo từng dạng nên rất tiện biên soạn đề.",
    url: "https://vndoc.com/bo-186-bai-doc-hieu-tieng-viet-lop-4-ca-nam-co-dap-an-375246",
    source: "VnDoc",
  },
  {
    id: "res-grade5-math",
    title: "Bài tập theo chuyên đề môn Toán lớp 5",
    grade: "grade-5",
    subject: "math",
    format: "Chuyên đề / đáp án",
    note: "Dùng để gom câu hỏi theo từng chuyên đề trước khi cập nhật local.",
    url: "https://vndoc.com/bai-tap-theo-chuyen-de-mon-toan-lop-5-316813",
    source: "VnDoc",
  },
  {
    id: "res-grade5-viet",
    title: "400 câu hỏi Luyện từ và câu lớp 5",
    grade: "grade-5",
    subject: "vietnamese",
    format: "Bộ bài tập / đáp án",
    note: "Kho câu hỏi khá dày để trích lọc theo chủ điểm học kỳ.",
    url: "https://vndoc.com/tron-bo-bai-tap-tieng-viet-co-ban-lop-5-phan-luyen-tu-va-cau-198659",
    source: "VnDoc",
    isPaid: true,
  },
  {
    id: "res-grade5-english",
    title: "Tổng hợp ngữ pháp và bài tập Tiếng Anh lớp 5",
    grade: "grade-5",
    subject: "english",
    format: "Ngữ pháp / bài tập",
    note: "Có nhiều link bài tập chuyên đề để dùng khi cập nhật local.",
    url: "https://vndoc.com/tong-hop-ngu-phap-tieng-anh-lop-5-171974",
    source: "VnDoc",
  },
];

export const classPostsSeed: ClassPost[] = [
  {
    id: "post-001",
    title: "Góc đọc sách đầu tuần",
    body:
      "Các bé khởi động buổi sáng bằng hoạt động chọn thẻ chữ và ghép tiếng đơn giản. Cô Kim chụp lại những thẻ các con ghép đúng để phụ huynh theo dõi tiến bộ.",
    className: "Tiền tiểu học A",
    createdAt: "2026-03-22",
    imageUrl:
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='520'><defs><linearGradient id='g' x1='0' x2='1'><stop stop-color='%23ffe29f'/><stop offset='1' stop-color='%23ffa99f'/></linearGradient></defs><rect width='100%' height='100%' rx='40' fill='url(%23g)'/><circle cx='150' cy='140' r='70' fill='%23fff4d6'/><circle cx='680' cy='80' r='45' fill='%23ffffff88'/><rect x='120' y='220' width='560' height='170' rx='30' fill='%23ffffffbb'/><rect x='180' y='170' width='100' height='180' rx='20' fill='%23ff8fab'/><rect x='300' y='150' width='100' height='200' rx='20' fill='%23ffd166'/><rect x='420' y='185' width='100' height='165' rx='20' fill='%2390be6d'/><rect x='540' y='160' width='100' height='190' rx='20' fill='%2364b6f7'/><text x='400' y='455' text-anchor='middle' font-family='Arial' font-size='34' fill='%23314c63'>Góc đọc sách sắc màu</text></svg>",
    imageAlt: "Góc đọc sách sắc màu",
    tags: ["đọc sách", "làm quen chữ cái", "hoạt động nhóm"],
    mood: "sunny",
  },
  {
    id: "post-002",
    title: "Tiết STEM chồng tháp giấy",
    body:
      "Lớp 3 cùng thi xem nhóm nào dựng được tháp giấy cao nhất. Sau tiết học, cô tổng hợp ảnh và ghi chú cách các nhóm hợp tác để phụ huynh xem lại.",
    className: "Lớp 3B",
    createdAt: "2026-03-20",
    imageUrl:
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='520'><defs><linearGradient id='g' x1='0' x2='1'><stop stop-color='%2390e0ef'/><stop offset='1' stop-color='%2300b4d8'/></linearGradient></defs><rect width='100%' height='100%' rx='40' fill='url(%23g)'/><rect x='80' y='300' width='640' height='120' rx='24' fill='%23ffffffbb'/><polygon points='220,300 320,130 420,300' fill='%23ffd166'/><polygon points='360,300 450,170 560,300' fill='%23ff7b54'/><polygon points='140,300 220,190 300,300' fill='%2390be6d'/><circle cx='660' cy='120' r='46' fill='%23ffffff77'/><text x='400' y='455' text-anchor='middle' font-family='Arial' font-size='34' fill='%23023e8a'>Thử thách xây tháp giấy</text></svg>",
    imageAlt: "Tiết STEM xây tháp giấy",
    tags: ["stem", "hợp tác", "giải quyết vấn đề"],
    mood: "playful",
  },
  {
    id: "post-003",
    title: "Vườn lời hứa trước kỳ thi",
    body:
      "Lớp 5 viết mục tiêu nhỏ trước buổi ôn tập: đọc kỹ đề, làm chậm mà chắc, kiểm tra lại đáp án. Góc lớp vì thế cũng nhẹ nhàng và tích cực hơn.",
    className: "Lớp 5A",
    createdAt: "2026-03-18",
    imageUrl:
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='520'><defs><linearGradient id='g' x1='0' x2='1'><stop stop-color='%23d8f3dc'/><stop offset='1' stop-color='%2395d5b2'/></linearGradient></defs><rect width='100%' height='100%' rx='40' fill='url(%23g)'/><rect x='110' y='110' width='580' height='270' rx='28' fill='%23ffffffb3'/><rect x='170' y='170' width='120' height='80' rx='18' fill='%23ffd6ff'/><rect x='320' y='150' width='120' height='80' rx='18' fill='%23ffc8dd'/><rect x='470' y='175' width='120' height='80' rx='18' fill='%23ffafcc'/><rect x='245' y='265' width='120' height='80' rx='18' fill='%23bde0fe'/><rect x='395' y='255' width='120' height='80' rx='18' fill='%23caffbf'/><text x='400' y='455' text-anchor='middle' font-family='Arial' font-size='34' fill='%232d6a4f'>Vườn lời hứa lớp 5A</text></svg>",
    imageAlt: "Vườn lời hứa lớp 5A",
    tags: ["tâm lý học đường", "chia sẻ", "trước kỳ thi"],
    mood: "calm",
  },
];

export const preschoolGames: PreschoolGame[] = [
  {
    id: "letters",
    title: "Chọn chữ đúng",
    description: "Nhìn chữ in hoa và chọn chữ thường tương ứng để nhận sao.",
    accent: "from-[#ffd166] to-[#ff7b54]",
    category: "letters",
  },
  {
    id: "spelling",
    title: "Ghép tiếng đơn giản",
    description: "Bé chọn đúng vần hoặc âm còn thiếu để hoàn thành tiếng quen thuộc.",
    accent: "from-[#80ed99] to-[#38b000]",
    category: "spelling",
  },
  {
    id: "math",
    title: "Đếm và cộng trừ vui",
    description: "Quan sát hình minh họa rồi trả lời phép tính trong phạm vi 10.",
    accent: "from-[#72ddf7] to-[#00a6fb]",
    category: "math",
  },
];

export const localEditingGuides: LocalEditingGuide[] = [
  {
    id: "guide-content",
    title: "Sửa dữ liệu tài liệu, đề thi, bài lớp học",
    path: "src/app/_data/content.ts",
    summary:
      "Đây là file nội dung chính. Anh thêm hoặc sửa bài tập, liên kết tài liệu, đề thi và game tại đây.",
  },
  {
    id: "guide-home",
    title: "Sửa nội dung trang chủ",
    path: "src/app/page.tsx",
    summary:
      "Đổi tiêu đề, mô tả ngắn và các khối nổi bật nếu muốn thay đổi thông điệp landing page.",
  },
  {
    id: "guide-style",
    title: "Sửa giao diện và font",
    path: "src/app/globals.css",
    summary: "Tinh chỉnh màu nền, bo góc, font Arial và các hiệu ứng nhỏ ở đây.",
  },
];

export const materialTypeLabels = {
  worksheet: "Phiếu bài tập",
  "lesson-plan": "Kế hoạch dạy",
  reading: "Tài liệu đọc",
  activity: "Hoạt động",
} as const;

export const moodLabels = {
  sunny: "Rạng rỡ",
  playful: "Năng động",
  calm: "Nhẹ nhàng",
} as const;

export { examsSeed };
