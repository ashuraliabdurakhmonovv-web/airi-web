/** @format */

import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarDays, Tag } from "lucide-react";
import { NewsImage } from "@/components/news/news-image";
import uzDict from "@/i18n/dictionaries/uz";
import ruDict from "@/i18n/dictionaries/ru";
import enDict from "@/i18n/dictionaries/en";
import type { RouteLocale } from "@/config/pages";
import { localePath } from "@/config/pages";
import { getStaticNewsPage } from "@/lib/news/static-news-repository";
import { NEWS_CATEGORIES, categoryToQuery, localizedCategory, localizedText, newsHref, newsImage } from "@/lib/news";
import { PAGE_SIZE, POPULAR_CATEGORIES } from "./news-constants";

const DICTIONARIES = { uz: uzDict, ru: ruDict, en: enDict };

/**
 * Yangiliklar ro'yxatining SERVER'da chizilgan varianti.
 *
 * Nega kerak: interaktiv ro'yxat `useSearchParams()` ga bog'langan, shuning
 * uchun `output: "export"` da u umuman prerender qilinmaydi — sahifa HTML'i
 * bo'sh chiqardi va Google indekslaydigan hech narsa yo'q edi.
 * Bu komponent `<Suspense>` fallback'i sifatida ishlatiladi: hidratsiyagacha
 * (va robot uchun — butunlay) sahifada haqiqiy 9 ta yangilik turadi.
 *
 * Ikki ataylab qilingan farq interaktiv variantdan:
 *   1. Kategoriyalar `<button onClick>` emas, `<Link href="?category=...">` —
 *      shunda robot kategoriya sahifalarini ham topa oladi.
 *   2. Lug'at `locale` propi bo'yicha STATIK tanlanadi: serverda
 *      `localStorage` yo'q, shuning uchun tilni marshrut belgilaydi.
 *
 * Maqolaga havolalar ataylab prefikssiz (`/umumiy-malumot/news/...`):
 * yangilik sahifalarining o'zi hozircha faqat o'zbekchada mavjud, `/ru/...`
 * ga havola qilish 404 berardi.
 */
export default function NewsStaticList({ locale = "uz" }: { locale?: RouteLocale }) {
  const { data: items } = getStaticNewsPage({ page: 1, limit: PAGE_SIZE });
  const t = DICTIONARIES[locale];
  const newsRoot = localePath("/umumiy-malumot/news", locale);

  const categoryLabel = (category: (typeof NEWS_CATEGORIES)[number]) =>
    ({
      Barchasi: t.newsCategories.all,
      Forumlar: t.newsCategories.forums,
      Hamkorlik: t.newsCategories.cooperation,
      "Sun’iy intellekt": t.newsCategories.ai,
      Tadqiqotlar: t.newsCategories.research,
      Innovatsiyalar: t.newsCategories.innovations,
      "Institut hayoti": t.newsCategories.instituteLife,
    })[category] ?? category;

  const categoryHref = (category: (typeof NEWS_CATEGORIES)[number]) => {
    const query = categoryToQuery(category);
    return query ? `${newsRoot}/?category=${query}` : `${newsRoot}/`;
  };

  return (
    <main className="min-h-screen py-8 text-[#111827] sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <header className="mb-7 space-y-2">
          <Link href={localePath("/umumiy-malumot", locale)} className="airi-link inline-flex items-center gap-2 text-sm font-semibold">
            <ArrowLeft className="h-4 w-4" />
            {t.news.mainPage}
          </Link>
          <h1 className="text-3xl font-bold leading-tight md:text-[2.75rem]">{t.news.allNews}</h1>
          <p className="max-w-2xl text-sm leading-6 text-gray-600 md:text-base">{t.news.allNewsSubtitle}</p>
        </header>

        <div className="mb-8 space-y-4 border-b border-gray-200 pb-6">
          <div className="flex flex-wrap gap-2">
            {NEWS_CATEGORIES.map((category) => (
              <Link
                key={category}
                href={categoryHref(category)}
                className="shrink-0 rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-blue-400 hover:text-blue-600">
                {categoryLabel(category)}
              </Link>
            ))}
          </div>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(230px,1fr)] lg:gap-12">
          <section>
            <h2 className="mb-5 text-2xl font-bold text-gray-950 md:text-3xl">{t.generalLanding.latestNewsTitle}</h2>
            <div className="space-y-5">
              {items.map((news, index) => {
                const title = localizedText(news.title, locale);
                const excerpt = localizedText(news.description, locale);
                const image = newsImage(news);

                return (
                  <article
                    key={news.id}
                    className="group flex flex-col overflow-hidden rounded-md border border-gray-200 bg-white transition hover:border-blue-200 sm:flex-row">
                    <Link
                      href={newsHref(news)}
                      className="relative block h-48 shrink-0 overflow-hidden bg-slate-100 sm:h-[150px] sm:w-[220px]">
                      {image ? (
                        <NewsImage
                          src={image}
                          alt={title}
                          priority={index < 2}
                          sizes="(max-width: 768px) 100vw, 220px"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-slate-100 text-xl font-bold tracking-widest text-slate-300">
                          AIRI
                        </div>
                      )}
                    </Link>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="mb-2 flex flex-wrap items-center gap-3 text-xs font-semibold text-gray-500">
                        <span className="inline-flex items-center gap-1.5 text-blue-600">
                          <Tag className="h-3.5 w-3.5" />
                          {localizedCategory(news.category, locale)}
                        </span>
                        {news.displayDate ? (
                          <time dateTime={news.publishedAt || undefined}>
                            <CalendarDays className="mr-1 inline h-3.5 w-3.5" />
                            {news.displayDate}
                          </time>
                        ) : null}
                      </div>
                      <h3 className="line-clamp-2 text-lg font-bold leading-snug text-gray-950 md:text-xl">
                        <Link href={newsHref(news)}>{title}</Link>
                      </h3>
                      {excerpt ? <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">{excerpt}</p> : null}
                      <Link
                        href={newsHref(news)}
                        className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-blue-600">
                        {t.news.readMore}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <aside className="border-t border-gray-200 pt-8 lg:sticky lg:top-24 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <section>
              <h2 className="text-lg font-bold text-gray-950">{t.newsPage.popularCategories}</h2>
              <div className="mt-4 space-y-2">
                {POPULAR_CATEGORIES.map((category) => (
                  <Link
                    key={category}
                    href={categoryHref(category)}
                    className="flex w-full items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2.5 text-left text-sm font-semibold text-gray-700 transition hover:border-blue-400 hover:text-blue-600">
                    <Tag className="h-4 w-4 text-blue-600" />
                    {categoryLabel(category)}
                  </Link>
                ))}
              </div>
            </section>

            <section className="mt-9 border-t border-gray-200 pt-7">
              <h2 className="text-lg font-bold text-gray-950">{t.newsPage.popularArticles}</h2>
              <div className="mt-4 space-y-4">
                {items.slice(0, 3).map((news) => {
                  const title = localizedText(news.title, locale);
                  return (
                    <Link key={news.id} href={newsHref(news)} className="group flex gap-3">
                      <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-md bg-slate-100">
                        <NewsImage src={newsImage(news)} alt={title} sizes="80px" className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-gray-900">{title}</h3>
                        {news.displayDate ? <time className="mt-1 block text-xs text-gray-500">{news.displayDate}</time> : null}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
