/** @format */

import { ResearchNewsArchive } from "../../_components/research-news-archive";
import { buildResearchNewsArchive } from "@/lib/news/research-news";

export default function DissertationDefenseAnnouncementsPage() {
  return (
    <ResearchNewsArchive
      items={buildResearchNewsArchive("defense")}
      variant="defenses"
    />
  );
}
