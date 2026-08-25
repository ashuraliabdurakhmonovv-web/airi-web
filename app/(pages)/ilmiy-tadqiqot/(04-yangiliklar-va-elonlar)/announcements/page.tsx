/** @format */

import { ResearchAnnouncements } from "../../_components/research-announcements";
import { buildResearchNewsArchive } from "@/lib/news/research-news";

export default function AnnouncementsPage() {
  return (
    <ResearchAnnouncements
      items={buildResearchNewsArchive("announcement")}
      currentYear={new Date().getFullYear()}
    />
  );
}
