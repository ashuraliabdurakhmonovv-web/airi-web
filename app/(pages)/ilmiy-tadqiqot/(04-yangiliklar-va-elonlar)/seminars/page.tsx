/** @format */

import { ResearchNewsArchive } from "../../_components/research-news-archive";
import { buildResearchNewsArchive } from "@/lib/news/research-news";

export default function SeminarsPage() {
  return (
    <ResearchNewsArchive
      items={buildResearchNewsArchive("seminar")}
      variant="seminars"
    />
  );
}
