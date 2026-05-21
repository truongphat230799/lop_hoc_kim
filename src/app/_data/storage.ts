import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";

import {
  classPostsSeed,
  examsSeed,
  externalResources,
  localEditingGuides,
  materialsSeed,
  preschoolGames,
  type ClassPost,
  type ExamItem,
  type ExamResultItem,
  type ExternalResource,
  type LocalEditingGuide,
  type MaterialItem,
  type PreschoolGame,
} from "@/app/_data/content";

type AdminContentStore = {
  materials: MaterialItem[];
  exams: ExamItem[];
  classPosts: ClassPost[];
  examResults: ExamResultItem[];
};

const storagePath = path.join(process.cwd(), ".data", "admin-content.json");

export async function getMaterials(): Promise<MaterialItem[]> {
  const store = await readStore();
  return sortByNewest(store.materials);
}

export async function getExams(): Promise<ExamItem[]> {
  const store = await readStore();
  return sortByNewest(store.exams);
}

export async function getClassPosts(): Promise<ClassPost[]> {
  const store = await readStore();
  return sortByNewest(store.classPosts);
}

export async function getExternalResources(): Promise<ExternalResource[]> {
  return [...externalResources];
}

export async function getPreschoolGames(): Promise<PreschoolGame[]> {
  return [...preschoolGames];
}

export async function getLocalEditingGuides(): Promise<LocalEditingGuide[]> {
  return [...localEditingGuides];
}

export async function saveMaterial(item: MaterialItem): Promise<void> {
  const store = await readStore();
  store.materials = upsertById(store.materials, item);
  await writeStore(store);
}

export async function deleteMaterial(id: string): Promise<void> {
  const store = await readStore();
  store.materials = store.materials.filter((item) => item.id !== id);
  await writeStore(store);
}

export async function saveExam(item: ExamItem): Promise<void> {
  const store = await readStore();
  store.exams = upsertById(store.exams, { ...item, questionCount: item.questions.length });
  await writeStore(store);
}

export async function deleteExam(id: string): Promise<void> {
  const store = await readStore();
  store.exams = store.exams.filter((item) => item.id !== id);
  await writeStore(store);
}

export async function saveClassPost(item: ClassPost): Promise<void> {
  const store = await readStore();
  store.classPosts = upsertById(store.classPosts, item);
  await writeStore(store);
}

export async function deleteClassPost(id: string): Promise<void> {
  const store = await readStore();
  store.classPosts = store.classPosts.filter((item) => item.id !== id);
  await writeStore(store);
}

async function readStore(): Promise<AdminContentStore> {
  try {
    const raw = await fs.readFile(storagePath, "utf8");
    const parsed = JSON.parse(raw) as Partial<AdminContentStore>;
    return {
      materials: parsed.materials ?? [...materialsSeed],
      exams: parsed.exams ?? [...examsSeed],
      classPosts: parsed.classPosts ?? [...classPostsSeed],
      examResults: parsed.examResults ?? [],
    };
  } catch (error) {
    // Log error in development for debugging, but gracefully fallback to seed data
    if (process.env.NODE_ENV === "development") {
      console.error("Failed to read admin content store:", error);
    }
    return {
      materials: [...materialsSeed],
      exams: [...examsSeed],
      classPosts: [...classPostsSeed],
      examResults: [],
    };
  }
}

async function writeStore(store: AdminContentStore): Promise<void> {
  await fs.mkdir(path.dirname(storagePath), { recursive: true });
  await fs.writeFile(storagePath, JSON.stringify(store, null, 2), "utf8");
}

function sortByNewest<T extends { createdAt: string }>(items: T[]): T[] {
  return [...items].sort(
    (left, right) =>
      new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime(),
  );
}

export async function getExamResults(): Promise<ExamResultItem[]> {
  const store = await readStore();
  return [...store.examResults].sort(
    (left, right) =>
      new Date(right.submittedAt).getTime() - new Date(left.submittedAt).getTime(),
  );
}

export async function saveExamResult(item: ExamResultItem): Promise<void> {
  const store = await readStore();
  store.examResults.push(item);
  await writeStore(store);
}

function upsertById<T extends { id: string }>(items: T[], nextItem: T): T[] {
  const nextItems = items.filter((item) => item.id !== nextItem.id);
  nextItems.push(nextItem);
  return nextItems;
}
