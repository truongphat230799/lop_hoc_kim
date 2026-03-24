import {
  gradeOptions,
  materialTypeLabels,
  moodLabels,
  subjectOptions,
  type GradeId,
  type MaterialType,
  type SubjectId,
} from "@/app/_data/content";

const dateFormatter = new Intl.DateTimeFormat("vi-VN", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export function formatDate(value: string): string {
  return dateFormatter.format(new Date(value));
}

export function getGradeLabel(gradeId: GradeId): string {
  return gradeOptions.find((grade) => grade.id === gradeId)?.label ?? gradeId;
}

export function getSubjectLabel(subjectId: SubjectId): string {
  return subjectOptions.find((subject) => subject.id === subjectId)?.label ?? subjectId;
}

export function getMaterialTypeLabel(type: MaterialType): string {
  return materialTypeLabels[type];
}

export function getMoodLabel(mood: keyof typeof moodLabels): string {
  return moodLabels[mood];
}
