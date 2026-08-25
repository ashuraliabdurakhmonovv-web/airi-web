"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, Search, Tag } from "lucide-react";
import { useLocale } from "@/i18n";
import { NewsImage } from "@/components/news/news-image";
import { useNews } from "@/hooks/use-news";
import {
  NEWS_CATEGORIES,
  categoryToQuery,
  localizedText,
  newsHref,
  newsImage,
  queryToCategory,
} from "@/lib/news";

import { PAGE_SIZE, POPULAR_CATEGORIES } from "./news-constants";

/**
 * Yangiliklar ro'yxatining interaktiv (client) varianti: kategoriya filtri,
 * qidiruv va sahifalash URL query'siga bog'langan.
 *
 * `useSearchParams()` ishlatilgani uchun bu daraxt statik eksportda
 * prerender QILINMAYDI — shu sabab `page.tsx` uni `<Suspense>` ichiga oladi
 * va fallback sifatida server'da chizilgan haqiqiy ro'yxatni beradi
 * (`news-static-list.tsx`). Qidiruv robotlari o'sha fallback'ni ko'radi.
 */
export default function NewsPageClient() {
  const { t, locale } = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedCategory = queryToCategory(searchParams.get("category"));
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const activeSearch = searchParams.get("search")?.trim() || "";
  const [searchValue, setSearchValue] = useState(activeSearch);

  const language = (["uz", "ru", "en"].includes(locale) ? locale : "uz") as "uz" | "ru" | "en";
  const { data, isLoading, isError } = useNews({
    page,
    limit: PAGE_SIZE,
    category: selectedCategory === "Barchasi" ? undefined : selectedCategory,
    search: activeSearch || undefined,
    language,
  });

  const newsItems = data?.data || [];
  const totalPages = Math.max(1, data?.totalPages || 1);
  const categoryLabel = (category: (typeof NEWS_CATEGORIES)[number]) => {
    switch (category) {
      case "Barchasi":
        return t.newsCategories.all;
      case "Forumlar":
        return t.newsCategories.forums;
      case "Hamkorlik":
        return t.newsCategories.cooperation;
      case "Sun’iy intellekt":
        return t.newsCategories.ai;
      case "Tadqiqotlar":
        return t.newsCategories.research;
      case "Innovatsiyalar":
        return t.newsCategories.innovations;
      case "Institut hayoti":
        return t.newsCategories.instituteLife;
      default:
        return category;
    }
  };

  const updateQuery = (updates: Record<string, string | number | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === "" || value === 1) params.delete(key);
      else params.set(key, String(value));
    });
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const pagination = useMemo(() => {
    const start = Math.max(1, Math.min(page - 2, totalPages - 4));
    const end = Math.min(totalPages, start + 4);
    return Array.from({ length: Math.max(0, end - start + 1) }, (_, index) => start + index);
  }, [page, totalPages]);

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateQuery({ search: searchValue.trim() || undefined, page: 1 });
  };

  return (
    <main className="min-h-screen py-8 text-[#111827] sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <header className="mb-7 space-y-2">
          <Link href="/umumiy-malumot" className="airi-link inline-flex items-center gap-2 text-sm font-semibold">
            <ArrowLeft className="h-4 w-4" />
            {t.news.mainPage}
          </Link>
          <h1 className="text-3xl font-bold leading-tight md:text-[2.75rem]">{t.news.allNews}</h1>
          <p className="max-w-2xl text-sm leading-6 text-gray-600 md:text-base">{t.news.allNewsSubtitle}</p>
        </header>

        <div className="mb-8 space-y-4 border-b border-gray-200 pb-6">
          <div className="flex flex-wrap gap-2">
            {NEWS_CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => updateQuery({ category: categoryToQuery(category), page: 1 })}
                  className={`shrink-0 rounded-md border px-4 py-2 text-sm font-semibold transition ${
                    active
                    ? "border-blue-600 bg-blue-600 text-white"
                      : "border-gray-200 bg-white text-gray-700 hover:border-blue-400 hover:text-blue-600"
                  }`}
                >
                  {categoryLabel(category)}
                </button>
              );
            })}
          </div>

          <form onSubmit={submitSearch} className="flex max-w-lg gap-2">
            <label className="relative flex-1">
              <span className="sr-only">{t.newsPage.searchLabel}</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder={t.newsPage.searchPlaceholder}
                className="h-10 w-full rounded-md border border-gray-200 bg-white pl-10 pr-3 text-sm outline-none transition focus:border-blue-500"
              />
            </label>
            <button type="submit" className="airi-button rounded-md px-4 text-sm font-semibold">{t.newsPage.searchButton}</button>
          </form>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(230px,1fr)] lg:gap-12">
          <section>
            <h2 className="mb-5 text-2xl font-bold text-gray-950 md:text-3xl">{t.generalLanding.latestNewsTitle}</h2>
            {isLoading ? (
              <div className="space-y-5" aria-label={t.common.loading}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="flex flex-col overflow-hidden rounded-md border border-gray-200 bg-white sm:flex-row">
                    <div className="h-48 animate-pulse bg-gray-200 sm:h-[150px] sm:w-[220px]" />
                    <div className="flex-1 space-y-3 p-5"><div className="h-4 w-1/3 animate-pulse bg-gray-200" /><div className="h-6 w-full animate-pulse bg-gray-200" /><div className="h-4 w-4/5 animate-pulse bg-gray-200" /></div>
                  </div>
                ))}
              </div>
            ) : isError ? (
              <div className="border border-red-100 bg-red-50 p-6 text-center text-red-700">{t.newsPage.error}</div>
            ) : newsItems.length === 0 ? (
              <div className="border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">{t.newsPage.empty}</div>
            ) : (
              <div className="space-y-5 lg:max-h-[calc(100vh-19rem)] lg:overflow-y-auto lg:pr-3">
                {newsItems.map((news, index) => {
              const title = localizedText(news.title, locale);
              const excerpt = localizedText(news.description, locale);
              const image = newsImage(news);
              const displayDate = news.displayDate;
              return (
                <article key={news.id} className="group flex flex-col overflow-hidden rounded-md border border-gray-200 bg-white transition hover:border-blue-200 sm:flex-row">
                  <Link href={newsHref(news)} className="relative block h-48 shrink-0 overflow-hidden bg-slate-100 sm:h-[150px] sm:w-[220px]">
                    {image ? (
                      <NewsImage
                        src={image}
                        alt={title}
                        priority={index < 2}
                        sizes="(max-width: 768px) 100vw, 220px"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-slate-100 text-xl font-bold tracking-widest text-slate-300">AIRI</div>
                    )}
                  </Link>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-2 flex flex-wrap items-center gap-3 text-xs font-semibold text-gray-500">
                      <span className="inline-flex items-center gap-1.5 text-blue-600"><Tag className="h-3.5 w-3.5" />{news.category}</span>
                      {displayDate ? <time dateTime={news.publishedAt || undefined}><CalendarDays className="mr-1 inline h-3.5 w-3.5" />{displayDate}</time> : null}
                    </div>
                    <h3 className="line-clamp-2 text-lg font-bold leading-snug text-gray-950 transition group-hover:text-blue-600 md:text-xl">
                      <Link href={newsHref(news)}>{title}</Link>
                    </h3>
                    {excerpt ? <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">{excerpt}</p> : null}
                    <Link href={newsHref(news)} className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-blue-600">
                      {t.news.readMore}<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
                );
              })}
              </div>
            )}

            {!isLoading && !isError && data && data.total > PAGE_SIZE ? (
              <nav className="mt-8 flex items-center justify-center gap-2" aria-label={t.newsPage.paginationLabel}>
            <button type="button" onClick={() => updateQuery({ page: Math.max(1, page - 1) })} disabled={page <= 1} className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 disabled:opacity-40"><ArrowLeft className="h-4 w-4" /></button>
            {pagination.map((itemPage) => (
              <button key={itemPage} type="button" aria-current={page === itemPage ? "page" : undefined} onClick={() => updateQuery({ page: itemPage })} className={`h-10 min-w-10 rounded-md px-3 text-sm font-bold ${page === itemPage ? "bg-blue-600 text-white" : "border border-gray-200 bg-white text-gray-600"}`}>{itemPage}</button>
            ))}
            <button type="button" onClick={() => updateQuery({ page: Math.min(totalPages, page + 1) })} disabled={page >= totalPages} className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 disabled:opacity-40"><ArrowRight className="h-4 w-4" /></button>
              </nav>
            ) : null}
          </section>

          <aside className="border-t border-gray-200 pt-8 lg:sticky lg:top-24 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <section>
              <h2 className="text-lg font-bold text-gray-950">{t.newsPage.popularCategories}</h2>
              <div className="mt-4 space-y-2">
                {POPULAR_CATEGORIES.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => updateQuery({ category: categoryToQuery(category), page: 1 })}
                    className="flex w-full items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2.5 text-left text-sm font-semibold text-gray-700 transition hover:border-blue-400 hover:text-blue-600"
                  >
                    <Tag className="h-4 w-4 text-blue-600" />
                    {categoryLabel(category)}
                  </button>
                ))}
              </div>
            </section>

            <section className="mt-9 border-t border-gray-200 pt-7">
              <h2 className="text-lg font-bold text-gray-950">{t.newsPage.popularArticles}</h2>
              <div className="mt-4 space-y-4">
                {newsItems.slice(0, 3).map((news) => {
                  const title = localizedText(news.title, locale);
                  return (
                    <Link key={news.id} href={newsHref(news)} className="group flex gap-3">
                      <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-md bg-slate-100">
                        <NewsImage src={newsImage(news)} alt={title} sizes="80px" className="object-cover transition duration-300 group-hover:scale-105" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-gray-900 group-hover:text-blue-600">{title}</h3>
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
