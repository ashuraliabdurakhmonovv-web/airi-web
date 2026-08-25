import newsIndex from "@/src/data/news/news-index.json";

type NewsIndexItem = (typeof newsIndex)[number];

export type ResearchNewsKind = "defense" | "seminar" | "announcement";

export type ResearchNewsItem = NewsIndexItem & {
  researchKind: ResearchNewsKind;
};

function searchableText(value: unknown): string {
  if (typeof value === "string") return value;
  if (!value || typeof value !== "object") return "";
  return Object.values(value as Record<string, unknown>)
    .map(searchableText)
    .join(" ");
}

/**
 * Yangiliklar lentasidagi ilmiy himoya va seminar xabarlarini ajratadi.
 * Kategoriyaga tayanilmaydi: eski importlarda bu xabarlar bir necha xil
 * kategoriyaga tushgan. Aniq iboralar esa "Vatan himoyachilari kuni" kabi
 * mavzuga aloqasiz yangiliklarning ro'yxatga kirib qolishini oldini oladi.
 */
export function classifyResearchNews(item: NewsIndexItem): ResearchNewsKind | null {
  const text = `${searchableText(item.title)} ${searchableText(item.description)} ${item.slug}`
    .toLocaleLowerCase("uz");

  const isDefense =
    text.includes("#himoya") ||
    text.includes("dissertatsiya himoyasi") ||
    text.includes("dissertation defense") ||
    /защит\w*\s+диссертац/u.test(text);

  if (isDefense) return "defense";
  if (/\bseminar/u.test(text) || /семинар/u.test(text)) return "seminar";

  const isPastResult =
    /yakuniga yet|g['‘’`]olib|taqdirland|was held|has concluded|winner|победител|заверш/u.test(text);
  const isAnnouncement =
    /hujjatlar qabuli|arizalar qabuli|qabul\w* davom etmoqda|kirish imtihoni bo['‘’`]lib o['‘’`]tadi|ro['‘’`]yxatdan o['‘’`]tish|applications? (?:are|is) open|entrance examination will be held|registration (?:is )?open|при.м документов|вступительн\w* экзамен\w* состоится|регистрац\w* открыт/u.test(text);

  if (isAnnouncement && !isPastResult) return "announcement";
  return null;
}

export function buildResearchNewsArchive(kind?: ResearchNewsKind): ResearchNewsItem[] {
  return newsIndex.flatMap((item) => {
    const researchKind = classifyResearchNews(item);
    return researchKind && (!kind || researchKind === kind)
      ? [{ ...item, researchKind }]
      : [];
  });
}
