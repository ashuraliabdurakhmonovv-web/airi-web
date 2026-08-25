# 06 — Ko'p tilli URL'lar (`/ru/`, `/en/`) va sahifa registri

## Muammo

Sayt uch tilni **bitta URL fazosida** ko'rsatardi. `<html lang="uz">` qattiq
yozilgan, til esa faqat `localStorage` orqali brauzerda almashardi. Statik
eksportda bu shuni anglatardiki: **`out/` dagi har bir HTML fayl o'zbekcha
edi**, qaysi tilni tanlamang.

Aniq sabab — `i18n/locale-provider.tsx` dagi pre-mount tarmoq: u
`defaultLocale` va `uzDict` ni qattiq berardi, RSC render esa aynan o'sha
tarmoqdan o'tardi.

Natijasi Search Console'da ko'rinardi: `нии искусственного интеллекта`,
`институт ии`, `AI research institute Tashkent` kabi so'rovlarda Google
`airi.uz` ni emas, eski `old.airi.uz/ru/institute/` ni ko'rsatardi — chunki
o'sha yerda haqiqiy ruscha HTML bor edi.

`alternateLocale` va JSON-LD `alternateName` bu muammoni **hal qilmaydi**:
Google sahifa tilini **berilgan HTML matni** bo'yicha aniqlaydi.

## Yechim: har bir til uchun alohida root layout

Faqat root layout `<html>` chiza oladi, `lang` esa til bo'yicha farq qilishi
kerak. Shuning uchun `app/layout.tsx` → `app/(pages)/layout.tsx` ga ko'chdi.
`(pages)` — route group, ya'ni **URL'ga ta'sir qilmaydi**: o'zbekcha manzillar
`/umumiy-malumot/...` ko'rinishida qoldi va ikkinchi migratsiya bo'lmadi.

```
app/
  _root/
    root-shell.tsx        umumiy <html>/<body>, `locale` propi bilan
    root-metadata.ts      til bo'yicha root Metadata
    locale-boundary.tsx   til bo'yicha provider tanlaydi
  (pages)/layout.tsx      <html lang="uz">   -> /umumiy-malumot/...
  ru/layout.tsx           <html lang="ru">   -> /ru/umumiy-malumot/...
  en/layout.tsx           <html lang="en">   -> /en/umumiy-malumot/...
```

`i18n/providers/{uz,ru,en}-provider.tsx` lug'atni **statik** import qiladi
(`loadDictionary()` ning dinamik `import()` yo'li emas) — shundagina RSC
render, ya'ni eksport qilingan HTML, o'sha tildagi matnni oladi. **Butun
ishning mohiyati shu.**

`/ru/` va `/en/` da `routeLocked` yoqiladi: URL tilni belgilaydi va
`localStorage` uni bekor qila olmaydi. Aks holda berilgan HTML bir tilda,
hidratsiyadan keyingi DOM boshqa tilda bo'lib qolardi — Googlebot JS render
qiladi va bunday hreflang klasterini rad etadi. Shu sababdan
`app/client-preferences.tsx` ham til qulflangan marshrutlarda `<html lang>` ga
tegmaydi.

## Marshrut fayllari

Har bir `/ru/**` va `/en/**` sahifasi — 20 qatorlik qobiq: o'zbekcha sahifa
komponentini qayta ishlatadi, JSX takrorlanmaydi.

```tsx
const PATH = "/umumiy-malumot/institute-abouttheinstitute";
const LOCALE = "ru";

export const metadata: Metadata = pageMetadataFor(PATH, LOCALE);

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd path={PATH} locale={LOCALE} />
      <UzInstituteAbouttheinstitutePage />
    </>
  );
}
```

Uch sahifa bundan mustasno — `faq`, `opendata-vacancies`, `news`. Ular
strukturali ma'lumotni (FAQPage, JobPosting) yoki server-render ro'yxatini
o'zbekcha lug'atdan quradi, shuning uchun har bir til uchun alohida variant
yozilgan.

## Sahifa registri

`config/pages.json` — marshrut haqidagi barcha SEO ma'lumoti bitta joyda.
Ma'lumot `.json` da, chunki `scripts/*.mjs` oddiy Node ESM va `.ts` import
qila olmaydi (xuddi `seo-excluded-paths.json` kabi).

Shundan oziqlanadi:

| Iste'molchi | Nima oladi |
|---|---|
| `pageMetadataFor()` | title, description, canonical, OG, Twitter |
| `hreflangFor()` | `<link rel="alternate" hreflang="...">` |
| `scripts/generate-sitemap.mjs` | `changefreq`, `noindex`, `xhtml:link` muqobillari |
| `<BreadcrumbJsonLd>` | `parent` zanjiri va `crumb` yorliqlari |

### `locales` — bayroq emas, ro'yxat

```json
"locales": ["uz", "ru", "en"]
```

Ataylab `translated: boolean` emas: RU daraxti EN dan oldin chiqqan va o'sha
oraliqda uz/ru sahifalar hali qurilmagan `/en/...` ni hreflang'da e'lon
qilmasligi kerak edi. **Mavjud bo'lmagan muqobilni ko'rsatish umuman
ko'rsatmaslikdan yomonroq** — Google bunday annotatsiyani tashlab yuboradi.

Shu sababdan tarjima qilinmagan ~200 sahifada hreflang **umuman yo'q**.

## Yangi sahifa qanday qo'shiladi

1. `config/pages.json` ga yozuv: `parent`, `locales`, uch tildagi `meta`, `crumb`.
2. Sahifaning `layout.tsx` yoki `page.tsx` ida:
   ```tsx
   export const metadata = pageMetadataFor(PATH, "uz");
   ```
3. Tarjima kerak bo'lsa — `app/ru/<yo'l>/page.tsx` va `app/en/<yo'l>/page.tsx`
   qobiqlarini yozib, `locales` ga tilni qo'shing.

Sitemap, breadcrumb va hreflang **avtomatik** to'g'rilanadi.

## Build to'siqlari

`npm run build` zanjiri ikkita tekshiruvchi bilan tugaydi:

- **`scripts/check-routes.mjs`** — har bir sahifa-til juftligi uchun `<html lang>`,
  self-canonical, hreflang soni va — eng muhimi — **matn haqiqatan shu tilda
  chiqqanmi** (ruschada kirill harflar soni, inglizchada o'zbekcha belgilarning
  yo'qligi).

  Bu to'siq zarur, chunki lug'at ulanishi buzilsa build baribir muvaffaqiyatli
  tugaydi va biz o'zbekcha matnli ruscha URL'larni — duplicate content'ni —
  chiqarib yuborardik. To'siq amalda sinovdan o'tkazilgan: `RuProvider` ni
  vaqtincha o'zbekcha lug'atga qaratilganda build to'xtadi.

- **`scripts/check-legacy-redirects.mjs`** — `out/.htaccess` dagi qoidalarni
  Apache'siz simulyatsiya qiladi va har bir eski manzil to'g'ri, **mavjud**
  sahifaga borishini tekshiradi.

## Diqqat qilinadigan joylar

- **`.htaccess` qoida tartibi.** Apache birinchi mos kelgan `[L]` qoidada
  to'xtaydi, shuning uchun `^ru/...` qoidalari umumiy `^(?:(?:uz|ru|en)/)?...`
  qoidalaridan **oldin** turishi shart.
- **Til catch-all bo'lingan.** Avval `^(?:uz|ru|en)(?:/.*)?$ → /` edi va har
  qanday `/ru/...` o'zbekcha bosh sahifaga ketardi. Endi har bir til o'z bosh
  sahifasiga boradi.
- **Yangilik sahifalari hali faqat o'zbekcha.** `/ru/umumiy-malumot/news/`
  ro'yxati bor, lekin 110 ta maqolaning o'zi tarjima qilinmagan — shuning
  uchun ro'yxatdagi havolalar prefikssiz qoladi. `/ru/umumiy-malumot/news/<slug>/`
  ga havola qilish 404 berardi.
- **Bosh sahifa `pageMetadataFor` ishlatmaydi.** U saytning eng ko'p klik
  oladigan sahifasi va `<title>` ida `| AIRI` qo'shimchasi yo'q; helper uni
  qo'shib yuborardi. Shuning uchun `app/(pages)/page.tsx` faqat canonical va
  `hreflangFor("/")` beradi.
