import "server-only";

import {
  classPostsSeed,
  examsSeed,
  externalResources,
  localEditingGuides,
  materialsSeed,
  preschoolGames,
  type ClassPost,
  type ExamItem,
  type ExternalResource,
  type LocalEditingGuide,
  type MaterialItem,
  type PreschoolGame,
} from "@/app/_data/content";

export async function getMaterials(): Promise<MaterialItem[]> {
  return sortByNewest(materialsSeed);
}

export async function getExams(): Promise<ExamItem[]> {
  return sortByNewest(examsSeed);
}

export async function getClassPosts(): Promise<ClassPost[]> {
  return sortByNewest(classPostsSeed);
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

function sortByNewest<T extends { createdAt: string }>(items: T[]): T[] {
  return [...items].sort(
    (left, right) =>
      new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime(),
  );
}
