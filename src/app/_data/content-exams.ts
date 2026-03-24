import type { ExamItem, ExamQuestion } from "@/app/_data/content";

const universalExamPassword = "LOPHOCCOKIM";

export const examsSeed: ExamItem[] = [
  createExam({
    id: "exam-g1-math",
    title: "Toán lớp 1: Số và phép cộng cơ bản",
    summary: "Ôn số đến 20, so sánh số và cộng trừ đơn giản.",
    grade: "grade-1",
    subject: "math",
    durationMinutes: 10,
    tone: "from-[#ffd166] to-[#ff7b54]",
    questions: [
      q("g1m1", "Số nào lớn hơn 9?", ["7", "8", "9", "10"], 3, "10 lớn hơn 9."),
      q("g1m2", "5 + 4 bằng bao nhiêu?", ["7", "8", "9", "10"], 2, "5 cộng 4 bằng 9."),
      q("g1m3", "12 - 2 bằng bao nhiêu?", ["8", "9", "10", "11"], 2),
      q("g1m4", "Dãy số nào tăng dần?", ["3, 2, 1", "1, 2, 3", "5, 4, 6", "2, 1, 4"], 1),
    ],
  }),
  createExam({
    id: "exam-g1-viet",
    title: "Tiếng Việt lớp 1: Nhận biết vần và tiếng",
    summary: "Làm quen âm đầu, vần đơn và tiếng quen thuộc.",
    grade: "grade-1",
    subject: "vietnamese",
    durationMinutes: 10,
    tone: "from-[#ffafcc] to-[#cdb4db]",
    questions: [
      q("g1v1", "Tiếng nào có vần 'an'?", ["bát", "bàn", "lan", "lớp"], 2),
      q("g1v2", "Âm đầu của tiếng 'bé' là gì?", ["b", "e", "é", "ê"], 0),
      q("g1v3", "Từ nào chỉ con vật?", ["bút", "gà", "bàn", "sách"], 1),
      q("g1v4", "Từ nào viết đúng?", ["caí", "cái", "cai", "cáii"], 1),
    ],
  }),
  createExam({
    id: "exam-g2-math",
    title: "Toán lớp 2: Cộng trừ trong phạm vi 100",
    summary: "Luyện tính nhanh và bài toán có lời văn ngắn.",
    grade: "grade-2",
    subject: "math",
    durationMinutes: 12,
    tone: "from-[#ffcb77] to-[#ff7d00]",
    questions: [
      q("g2m1", "46 + 23 bằng bao nhiêu?", ["59", "69", "79", "63"], 1),
      q("g2m2", "80 - 27 bằng bao nhiêu?", ["43", "53", "63", "57"], 1),
      q("g2m3", "Lan có 25 nhãn vở, mẹ mua thêm 15 cái. Lan có tất cả bao nhiêu nhãn vở?", ["35", "40", "45", "50"], 1),
      q("g2m4", "Số tròn chục nào gần 67 nhất?", ["50", "60", "70", "80"], 2),
    ],
  }),
  createExam({
    id: "exam-g2-viet",
    title: "Tiếng Việt lớp 2: Chính tả và từ ngữ",
    summary: "Ôn dấu hỏi ngã, điền từ và nhận biết câu đúng.",
    grade: "grade-2",
    subject: "vietnamese",
    durationMinutes: 12,
    tone: "from-[#8ecae6] to-[#219ebc]",
    questions: [
      q("g2v1", "Từ nào viết đúng?", ["nghỉ ngơi", "ngĩ ngơi", "nghỉ ngơii", "ngĩ ngoi"], 0),
      q("g2v2", "Điền từ thích hợp: Em ... sách mỗi tối.", ["đọc", "ngủ", "ăn", "vẽ"], 0),
      q("g2v3", "Câu nào là câu kể?", ["Bạn tên là gì?", "Ôi đẹp quá!", "Em đi học đúng giờ.", "Mẹ ơi!"], 2),
      q("g2v4", "Từ nào cùng nhóm với 'bút, vở'?", ["bàn", "sách", "cây", "mưa"], 1),
    ],
  }),
  createExam({
    id: "exam-g3-math",
    title: "Toán lớp 3: Bảng nhân và toán lời văn",
    summary: "Ôn bảng nhân, chia và các bài toán hai bước.",
    grade: "grade-3",
    subject: "math",
    durationMinutes: 15,
    tone: "from-[#b8f2e6] to-[#52b69a]",
    questions: [
      q("g3m1", "6 x 7 bằng bao nhiêu?", ["36", "42", "48", "56"], 1),
      q("g3m2", "56 : 8 bằng bao nhiêu?", ["6", "7", "8", "9"], 1),
      q("g3m3", "Một hộp có 9 bút, 4 hộp có bao nhiêu bút?", ["13", "18", "27", "36"], 3),
      q("g3m4", "Một cửa hàng bán 35 quả bóng, đã bán 12 quả. Cửa hàng còn lại bao nhiêu quả?", ["21", "22", "23", "24"], 2),
    ],
  }),
  createExam({
    id: "exam-g3-viet",
    title: "Tiếng Việt lớp 3: Đọc hiểu và từ loại",
    summary: "Luyện đọc câu, chọn nghĩa đúng và nhận biết từ chỉ hoạt động.",
    grade: "grade-3",
    subject: "vietnamese",
    durationMinutes: 15,
    tone: "from-[#fbc4ab] to-[#ff8fab]",
    questions: [
      q("g3v1", "Từ nào chỉ hoạt động?", ["xanh", "chạy", "đẹp", "cao"], 1),
      q("g3v2", "Từ nào là từ chỉ sự vật?", ["hát", "ngủ", "trường học", "vui"], 2),
      q("g3v3", "Câu nào dùng đúng dấu chấm hỏi?", ["Em đi học.", "Bạn tên gì?", "Ôi đẹp quá?", "Mẹ ơi."], 1),
      q("g3v4", "Trong câu 'Hoa đang tưới cây', từ 'tưới' là gì?", ["sự vật", "hoạt động", "đặc điểm", "cảm xúc"], 1),
    ],
  }),
  createExam({
    id: "exam-g3-english",
    title: "Tiếng Anh lớp 3: My school day",
    summary: "Từ vựng lớp học, câu chào hỏi và đồ dùng học tập.",
    grade: "grade-3",
    subject: "english",
    durationMinutes: 12,
    tone: "from-[#cdb4db] to-[#ffafcc]",
    questions: [
      q("g3e1", "Choose the correct word: I have two ...", ["book", "books", "bookses", "a books"], 1),
      q("g3e2", "What color is the ruler?", ["It is ruler.", "It is blue.", "It blue.", "Blue is it."], 1),
      q("g3e3", "Which word is a school thing?", ["eraser", "banana", "tiger", "sister"], 0),
      q("g3e4", "How are you? - ...", ["I am nine.", "I am fine, thank you.", "My name is Mai.", "See you."], 1),
    ],
  }),
  createExam({
    id: "exam-g4-math",
    title: "Toán lớp 4: Phân số cơ bản",
    summary: "Ôn nhận biết phân số, cộng trừ phân số cùng mẫu và giải toán đơn giản.",
    grade: "grade-4",
    subject: "math",
    durationMinutes: 15,
    tone: "from-[#a2d2ff] to-[#3a86ff]",
    questions: [
      q("g4m1", "Phân số nào bằng một nửa?", ["1/3", "1/2", "2/3", "3/4"], 1),
      q("g4m2", "1/5 + 2/5 bằng bao nhiêu?", ["2/5", "3/5", "3/10", "4/5"], 1),
      q("g4m3", "5/8 - 2/8 bằng bao nhiêu?", ["2/8", "3/8", "4/8", "7/8"], 1),
      q("g4m4", "Phân số nào lớn hơn 3/6?", ["1/6", "2/6", "4/6", "3/7"], 2),
    ],
  }),
  createExam({
    id: "exam-g4-viet",
    title: "Tiếng Việt lớp 4: Đọc hiểu ngắn",
    summary: "Nhận biết ý chính, từ đồng nghĩa và thông điệp bài đọc.",
    grade: "grade-4",
    subject: "vietnamese",
    durationMinutes: 15,
    tone: "from-[#8ecae6] to-[#219ebc]",
    questions: [
      q("g4v1", "Từ nào gần nghĩa với 'chăm chỉ'?", ["lười biếng", "siêng năng", "buồn bã", "nhỏ bé"], 1),
      q("g4v2", "Ý chính của bài đọc thường cho biết điều gì?", ["Màu sắc tranh", "Nội dung nổi bật", "Tên tác giả", "Số câu"], 1),
      q("g4v3", "Câu nào thể hiện lời khuyên?", ["Hôm nay trời nắng.", "Bạn Nam rất cao.", "Em nên đọc kỹ đề.", "Con mèo ngủ ngon."], 2),
      q("g4v4", "Dấu hai chấm thường dùng để làm gì?", ["Ngăn câu hỏi", "Mở đầu lời nói trực tiếp hoặc giải thích", "Kết thúc câu", "Nối hai từ"], 1),
    ],
  }),
  createExam({
    id: "exam-g4-science",
    title: "Khoa học lớp 4: Nước và không khí",
    summary: "Ôn kiến thức khoa học cơ bản, quan sát hiện tượng gần gũi.",
    grade: "grade-4",
    subject: "science",
    durationMinutes: 12,
    tone: "from-[#95d5b2] to-[#40916c]",
    questions: [
      q("g4s1", "Nước sôi ở khoảng bao nhiêu độ C?", ["0 độ C", "50 độ C", "100 độ C", "150 độ C"], 2),
      q("g4s2", "Không khí có ở đâu?", ["Chỉ trong lớp học", "Chỉ ngoài sân", "Xung quanh chúng ta", "Chỉ trong chai"], 2),
      q("g4s3", "Khi đun nước lâu, nước sẽ như thế nào?", ["Đông lại", "Bay hơi", "Nặng hơn", "Không đổi"], 1),
      q("g4s4", "Việc nào giúp tiết kiệm nước?", ["Mở vòi nước liên tục", "Dùng xong không khóa", "Khóa vòi sau khi rửa tay", "Đổ nước sạch đi"], 2),
    ],
  }),
  createExam({
    id: "exam-g5-math",
    title: "Toán lớp 5: Phân số và số thập phân",
    summary: "Ôn tính toán với phân số, số thập phân và bài toán thực tế ngắn.",
    grade: "grade-5",
    subject: "math",
    durationMinutes: 15,
    tone: "from-[#ffcb77] to-[#fb5607]",
    questions: [
      q("g5m1", "0,5 viết dưới dạng phân số là gì?", ["1/5", "1/2", "5/10", "2/5"], 1),
      q("g5m2", "2,4 + 1,5 bằng bao nhiêu?", ["3,8", "3,9", "4,0", "4,1"], 1),
      q("g5m3", "3/4 của 20 là bao nhiêu?", ["12", "15", "16", "18"], 1),
      q("g5m4", "Số nào lớn nhất?", ["0,65", "0,56", "0,605", "0,506"], 0),
    ],
  }),
  createExam({
    id: "exam-g5-viet",
    title: "Tiếng Việt lớp 5: Luyện từ và câu",
    summary: "Ôn từ ghép, từ láy, kết từ và câu ghép trong chương trình lớp 5.",
    grade: "grade-5",
    subject: "vietnamese",
    durationMinutes: 15,
    tone: "from-[#ffafcc] to-[#a2d2ff]",
    questions: [
      q("g5v1", "Từ nào là từ láy?", ["xanh xao", "học tập", "đất nước", "bạn bè"], 0),
      q("g5v2", "Từ nào là kết từ?", ["và", "sách", "đẹp", "chạy"], 0),
      q("g5v3", "Câu ghép là câu như thế nào?", ["Chỉ có một cụm chủ vị", "Có từ cảm thán", "Có nhiều cụm chủ vị", "Câu rất ngắn"], 2),
      q("g5v4", "Từ nào đồng nghĩa với 'dũng cảm'?", ["nhút nhát", "can đảm", "lười biếng", "vội vàng"], 1),
    ],
  }),
  createExam({
    id: "exam-g5-english",
    title: "Tiếng Anh lớp 5: Daily routines",
    summary: "Ôn thói quen hằng ngày, thì hiện tại đơn và mẫu câu giao tiếp cơ bản.",
    grade: "grade-5",
    subject: "english",
    durationMinutes: 12,
    tone: "from-[#cdb4db] to-[#ffafcc]",
    questions: [
      q("g5e1", "She ... to school at 7 a.m.", ["go", "goes", "going", "gone"], 1),
      q("g5e2", "What do you do in the morning?", ["I am at school.", "I brush my teeth.", "It is Monday.", "I have two books."], 1),
      q("g5e3", "Choose the correct question for the answer: 'I go swimming on Sunday.'", ["When do you go swimming?", "What do you do on Sunday?", "Where are you from?", "How old are you?"], 1),
      q("g5e4", "Which word is a daily routine?", ["homework", "breakfast", "get up", "library"], 2),
    ],
  }),
];

function createExam(
  input: Omit<ExamItem, "accessCode" | "questionCount" | "createdAt"> & {
    createdAt?: string;
  },
): ExamItem {
  return {
    ...input,
    accessCode: universalExamPassword,
    createdAt: input.createdAt ?? "2026-03-24",
    questionCount: input.questions.length,
  };
}

function q(
  id: string,
  prompt: string,
  choices: string[],
  correctIndex: number,
  explanation?: string,
): ExamQuestion {
  return { id, prompt, choices, correctIndex, explanation };
}
