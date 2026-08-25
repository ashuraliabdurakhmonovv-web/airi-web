"use client";

import { useLocale } from "@/i18n";
import { getProjectCopy, type ProjectCopy } from "../../lib/project-locales";
import type { Project } from "../../lib/projects-data";

type Kind =
  | { type: "field"; field: "title" | "sector" | "shortDescription" | "description" | "leadDepartment" }
  | { type: "capability" | "outcome"; index: number }
  | { type: "stageTitle" | "stageDescription" | "metricValue" | "metricLabel"; index: number };

export function LocalizedProjectText({ project, fallback, ...kind }: { project: Project; fallback: string } & Kind) {
  const { locale } = useLocale();
  const copy = getProjectCopy(project.slug, locale) as ProjectCopy | undefined;

  if (!copy) return <>{fallback}</>;

  if (kind.type === "field") return <>{copy[kind.field] ?? fallback}</>;
  if (kind.type === "capability") return <>{copy.capabilities[kind.index] ?? fallback}</>;
  if (kind.type === "outcome") return <>{copy.outcomes[kind.index] ?? fallback}</>;
  if (kind.type === "stageTitle") return <>{copy.stages[kind.index]?.title ?? fallback}</>;
  if (kind.type === "stageDescription") return <>{copy.stages[kind.index]?.description ?? fallback}</>;
  if (kind.type === "metricValue") return <>{copy.metrics[kind.index]?.value ?? fallback}</>;
  return <>{copy.metrics[kind.index]?.label ?? fallback}</>;
}
