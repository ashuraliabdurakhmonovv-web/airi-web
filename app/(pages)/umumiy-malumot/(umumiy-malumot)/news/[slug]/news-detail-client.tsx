"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Sparkles, Tag } from "lucide-react";
import { useLocale } from "@/i18n";
import { NewsImage } from "@/components/news/news-image";
import type { StaticNewsArticle, StaticNewsIndexItem } from "@/lib/news/static-news-repository";
import {
  categoryToQuery,
  getAssetUrl,
  localizedText,
  newsHref,
  newsImage,
  rewriteArticleAssetUrls,
} from "@/lib/news";

function plainParagraphs(value: string) {
  return value
    .replace(/\r/g, "")
    .split(/\n{2,}|\n/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export default function NewsDetailClient({ article, related }: { article: StaticNewsArticle; related: StaticNewsIndexItem[] }) {
  const { locale, t } = useLocale();

  const content = localizedText(article?.content, locale);
  const safeHtml = useMemo(() => {
    const html = localizedText(article?.contentHtml, locale);
    return html ? rewriteArticleAssetUrls(html) : "";
  }, [article.contentHtml, locale]);

  const title = localizedText(article.title, locale);
  const excerpt = localizedText(article.description, locale);
  const image = newsImage(article);
  const displayDate = article.displayDate;
  const gallery = (article.images || [])
    .filter((item): item is string => typeof item === "string")
    .map(getAssetUrl)
    .filter((item) => item && item !== image);

  return (
    <main className="min-h-screen text-[#111827]">
      <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        <Link href="/umumiy-malumot/news" className="airi-link mb-8 inline-flex items-center gap-2 text-sm font-semibold">
          <ArrowLeft className="h-4 w-4" /> {t.newsPage.backToNews}
        </Link>

        <header className="mb-8">
          <Link
            href={`/umumiy-malumot/news?category=${categoryToQuery(article.category)}`}
            className="mb-4 inline-flex items-center gap-1.5 text-sm font-bold text-blue-600"
          >
            <Tag className="h-4 w-4" /> {article.category}
          </Link>
          <h1 className="text-3xl font-bold leading-tight text-gray-950 md:text-5xl">{title}</h1>
          <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-gray-500">
            {displayDate ? <time dateTime={article.publishedAt || undefined} className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4" />{displayDate}</time> : null}
          </div>
          {excerpt ? <p className="mt-6 text-lg leading-8 text-gray-600">{excerpt}</p> : null}
        </header>

        {safeHtml ? (
          <div
            className="news-article-content text-base leading-8 text-gray-700 [&_a]:font-semibold [&_a]:text-blue-600 [&_blockquote]:my-7 [&_blockquote]:border-l-4 [&_blockquote]:border-blue-500 [&_blockquote]:bg-blue-50 [&_blockquote]:px-5 [&_blockquote]:py-4 [&_h2]:mb-4 [&_h2]:mt-9 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-950 [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-bold [&_img]:my-8 [&_img]:h-auto [&_img]:max-w-full [&_li]:mb-2 [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-5 [&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6"
            dangerouslySetInnerHTML={{ __html: safeHtml }}
          />
        ) : (
          <div className="space-y-5 text-base leading-8 text-gray-700">
            {plainParagraphs(content || excerpt).map((paragraph, index) => <p key={`${index}-${paragraph.slice(0, 30)}`}>{paragraph}</p>)}
          </div>
        )}

        {!safeHtml && gallery.length > 0 ? (
          <section className="mt-10 grid gap-4 sm:grid-cols-2">
            {gallery.map((item, index) => (
              <div key={item} className="relative aspect-video overflow-hidden bg-slate-100">
                <NewsImage src={item} alt={`${title} — ${index + 2}`} sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" />
              </div>
            ))}
          </section>
        ) : null}

      </article>

      {related.length > 0 ? (
        <section className="border-t border-gray-200 bg-white py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="mb-7 flex items-center gap-2 text-2xl font-bold"><Sparkles className="h-5 w-5 text-blue-600" />{t.newsPage.recommendedNews}</h2>
            <div className="grid gap-7 md:grid-cols-3">
              {related.map((item) => {
                const itemTitle = localizedText(item.title, locale);
                const itemImage = newsImage(item);
                const itemDate = item.displayDate;
                return (
                  <article key={item.id} className="group">
                    <Link href={newsHref(item)} className="relative block aspect-[16/10] overflow-hidden bg-slate-100">
                      <NewsImage src={itemImage} alt={itemTitle} sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" />
                    </Link>
                    <p className="mt-4 text-xs font-semibold text-blue-600">{item.category}</p>
                    <h3 className="mt-2 line-clamp-3 text-lg font-bold leading-snug transition group-hover:text-blue-600"><Link href={newsHref(item)}>{itemTitle}</Link></h3>
                    {itemDate ? <time className="mt-2 block text-xs text-gray-500">{itemDate}</time> : null}
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
