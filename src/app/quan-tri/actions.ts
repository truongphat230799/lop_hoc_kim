"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import type { ClassPost, ExamItem, ExamResultItem, MaterialItem } from "@/app/_data/content";
import { deleteClassPost, deleteExam, deleteMaterial, getClassPosts, getExamResults, getExams, getMaterials, saveClassPost, saveExam, saveExamResult, saveMaterial } from "@/app/_data/storage";

const adminCookie = "lop-hoc-kim-admin";

export async function isAdminAuthenticated() {
  return (await cookies()).get(adminCookie)?.value === getAdminPassword();
}

export async function loginAdmin(formData: FormData) {
  const password = String(formData.get("password") ?? "").trim();

  if (password !== getAdminPassword()) {
    throw new Error("Mật khẩu quản trị chưa đúng.");
  }

  (await cookies()).set(adminCookie, password, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  revalidatePath("/quan-tri");
}

export async function logoutAdmin() {
  (await cookies()).delete(adminCookie);
  revalidatePath("/quan-tri");
}

export async function upsertMaterialAction(formData: FormData) {
  await requireAdmin();
  const uploadedFile = await uploadBlobFile(formData, "file", "materials");

  await saveMaterial({
    id: getId(formData, "id", "material"),
    title: text(formData, "title"),
    description: text(formData, "description"),
    grade: text(formData, "grade") as MaterialItem["grade"],
    subject: text(formData, "subject") as MaterialItem["subject"],
    type: text(formData, "type") as MaterialItem["type"],
    coverTone: text(formData, "coverTone") || "from-[#ffd166] to-[#ff7b54]",
    createdAt: text(formData, "createdAt") || today(),
    author: text(formData, "author") || "Lớp học cô Kim",
    downloadable: formData.get("downloadable") === "on",
    fileName: uploadedFile?.pathname ?? optionalText(formData, "fileName"),
    fileUrl: uploadedFile?.url ?? optionalText(formData, "fileUrl"),
    ctaLabel: optionalText(formData, "ctaLabel"),
  });
  refreshContentPages();
}

export async function deleteMaterialAction(formData: FormData) {
  await requireAdmin();
  await deleteMaterial(text(formData, "id"));
  refreshContentPages();
}

export async function upsertClassPostAction(formData: FormData) {
  await requireAdmin();
  const uploadedImage = await uploadBlobFile(formData, "image", "class-posts");

  await saveClassPost({
    id: getId(formData, "id", "post"),
    title: text(formData, "title"),
    body: text(formData, "body"),
    className: text(formData, "className"),
    createdAt: text(formData, "createdAt") || today(),
    imageUrl: uploadedImage?.url ?? optionalText(formData, "imageUrl"),
    imageAlt: optionalText(formData, "imageAlt"),
    tags: text(formData, "tags").split(",").map((tag) => tag.trim()).filter(Boolean),
    mood: text(formData, "mood") as ClassPost["mood"],
  });
  refreshContentPages();
}

export async function deleteClassPostAction(formData: FormData) {
  await requireAdmin();
  await deleteClassPost(text(formData, "id"));
  refreshContentPages();
}

export async function upsertExamAction(formData: FormData) {
  await requireAdmin();
  const questions = JSON.parse(text(formData, "questions")) as ExamItem["questions"];
  await saveExam({
    id: getId(formData, "id", "exam"),
    title: text(formData, "title"),
    summary: text(formData, "summary"),
    grade: text(formData, "grade") as ExamItem["grade"],
    subject: text(formData, "subject") as ExamItem["subject"],
    durationMinutes: Number(text(formData, "durationMinutes") || 10),
    accessCode: text(formData, "accessCode"),
    createdAt: text(formData, "createdAt") || today(),
    questionCount: questions.length,
    tone: text(formData, "tone") || "from-[#72ddf7] to-[#00a6fb]",
    questions,
  });
  refreshContentPages();
}

export async function deleteExamAction(formData: FormData) {
  await requireAdmin();
  await deleteExam(text(formData, "id"));
  refreshContentPages();
}

export async function getAdminData() {
  await requireAdmin();
  const [materials, exams, posts] = await Promise.all([getMaterials(), getExams(), getClassPosts()]);
  return { materials, exams, posts };
}

// Vercel Blob disabled — project uses external links (Google Drive, etc.) to stay on free tier.
// Remove this early return and uncomment the put() call if switching to Blob storage.
async function uploadBlobFile(_formData: FormData, _fieldName: string, _folder: string): Promise<{ url: string; pathname: string } | null> {
  return null;
}

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "LOPHOCCOKIM";
}

async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    throw new Error("Chưa đăng nhập quản trị.");
  }
}

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function optionalText(formData: FormData, key: string) {
  return text(formData, key) || undefined;
}

function getId(formData: FormData, key: string, prefix: string) {
  return text(formData, key) || `${prefix}-${Date.now()}`;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function refreshContentPages() {
  ["/", "/tai-lieu", "/kiem-tra", "/lop-hoc", "/quan-tri"].forEach((path) => revalidatePath(path));
}
