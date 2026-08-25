# AIRI Web

Raqamli texnologiyalar va sun’iy intellektni rivojlantirish ilmiy-tadqiqot instituti uchun Next.js asosidagi web loyiha.

Ushbu README jamoa a’zolari uchun loyihani ishga tushirish, branch bilan ishlash, kodni tekshirish va `main` branchga xavfsiz merge qilish tartibini tushuntiradi.

## Texnologiyalar

- Next.js
- React
- TypeScript
- Tailwind CSS
- ESLint

## Loyihani ishga tushirish

### 1. Repository’ni yuklab olish

~~~bash
git clone <repository-url>
cd airi-web
~~~

### 2. Paketlarni o‘rnatish

Loyiha yangi kompyuterda yoki yangi jamoa a’zosida birinchi marta ishga tushirilganda:

~~~bash
npm install
~~~

`npm install` `package.json` va `package-lock.json` fayllaridagi barcha dependency’larni o‘rnatadi. `node_modules` papkasini qo‘lda Git’ga qo‘shish kerak emas.

### 3. Development server

~~~bash
npm run dev
~~~

Keyin brauzerda quyidagi manzilni oching:

~~~text
http://localhost:3000
~~~

## Asosiy buyruqlar

~~~bash
npm run dev      # Development serverni ishga tushiradi
npm run lint     # ESLint orqali kodni tekshiradi
npm run build    # Production build va route tekshiruvlarini bajaradi
npm run start    # Tayyor production buildni ishga tushiradi
~~~

## Branch bilan ishlash tartibi

### Branchlar vazifasi

- `main` — tekshirilgan va merge qilishga tayyor asosiy branch.
- `ashurali/...` — Ashurali ishlab chiqayotgan vazifalar.
- `hojiakbar/...` — Hojiakbar ishlab chiqayotgan vazifalar.

Har bir yangi vazifa uchun alohida branch ochiladi. Tayyor bo‘lmagan kodni to‘g‘ridan-to‘g‘ri `main` branchga push qilish tavsiya etilmaydi.

### Yangi branch ochish

~~~bash
git switch main
git pull origin main
git switch -c ashurali/feature-language-selector
~~~

Hojiakbar uchun:

~~~bash
git switch main
git pull origin main
git switch -c hojiakbar/fix-mobile-navigation
~~~

Branch nomi vazifani qisqa va tushunarli ifodalashi kerak:

~~~text
<ism>/<tur>-<qisqa-vazifa>
~~~

Misollar:

~~~text
ashurali/feature-language-selector
ashurali/fix-partner-logos
hojiakbar/feature-news-filter
hojiakbar/fix-mobile-menu
~~~

## Ish tugagandan keyingi tartib

1. Kodni yozing va lokalda tekshiring.
2. `npm run lint` bajaring.
3. `npm run build` bajaring.
4. O‘zgargan fayllarni ko‘rib chiqing:

~~~bash
git status
git diff
~~~

5. O‘zgarishlarni commit qiling.
6. Branch’ni GitHub’ga yuboring:

~~~bash
git push -u origin ashurali/feature-language-selector
~~~

7. GitHub’da o‘z branchingizdan `main` branchga Pull Request oching.
8. Code review’dan keyin loyiha egasi Pull Request’ni tekshiradi va merge qiladi.
9. Merge tugagach, lokal branchni yangilang:

~~~bash
git switch main
git pull origin main
git branch -d ashurali/feature-language-selector
~~~

Pull Request ochish — kodni tekshirtirish uchun asosiy jarayon. Shogirdlar o‘zgarishlarini `main`ga o‘zlari to‘g‘ridan-to‘g‘ri merge qilmaydi; avval review qilinadi.

## Commit message keywordlari

Commit message qisqa, aniq va quyidagi keywordlardan biri bilan boshlanishi kerak:

| Keyword | Qachon ishlatiladi | Misol |
| --- | --- | --- |
| `feat` | Yangi imkoniyat | `feat: add language selector` |
| `fix` | Xatoni tuzatish | `fix: repair partner logo paths` |
| `refactor` | Kod tuzilmasini yaxshilash | `refactor: simplify navigation data` |
| `style` | Faqat ko‘rinish yoki format | `style: improve mobile navbar spacing` |
| `docs` | README yoki hujjat | `docs: add branch workflow` |
| `test` | Test qo‘shish yoki yangilash | `test: add partner data checks` |
| `chore` | Texnik xizmat ishlari | `chore: update dependencies` |
| `build` | Build yoki konfiguratsiya | `build: update next config` |
| `perf` | Tezlik va optimizatsiya | `perf: optimize partner images` |

Yaxshi commit misollari:

~~~bash
git commit -m "feat: add international partner logos"
git commit -m "fix: correct mobile menu behavior"
git commit -m "docs: explain team git workflow"
~~~

Commit ichida bir-biriga aloqasi bo‘lmagan bir nechta vazifani aralashtirmang. Har bir commit bitta mantiqiy o‘zgarishni ifodalasin.

## Yangi paket qo‘shish

Oddiy dependency:

~~~bash
npm install package-name
~~~

Development uchun kerak bo‘ladigan paket:

~~~bash
npm install -D package-name
~~~

Paket o‘rnatilgandan keyin `package.json` va `package-lock.json` o‘zgarganini commit qiling. `node_modules` papkasini commit qilmang.

## Merge’dan oldingi checklist

- [ ] Vazifa alohida branchda bajarildi.
- [ ] `main` branchdagi so‘nggi o‘zgarishlar olindi.
- [ ] `npm run lint` xatosiz o‘tdi.
- [ ] `npm run build` xatosiz o‘tdi.
- [ ] Keraksiz `.next`, `out`, `node_modules` yoki log fayllari commit qilinmadi.
- [ ] Commit message to‘g‘ri keyword bilan boshlandi.
- [ ] Pull Request’da nima o‘zgargani tushuntirildi.
- [ ] Screenshot yoki test qilish yo‘riqnomasi kerak bo‘lsa qo‘shildi.

## `main` branch bo‘yicha qoida

Hozir loyiha egasi yolg‘iz ishlayotgan paytda `main` branchda ishlashi mumkin. Jamoa ishga qo‘shilgach, har bir yangi vazifa uchun `ashurali/...` yoki `hojiakbar/...` kabi alohida branch ochiladi.

`main` faqat ko‘rib chiqilgan, tekshirilgan va ishlaydigan kodni saqlashi kerak. Shuning uchun har bir yangi vazifa Pull Request va code review orqali `main`ga olib kiriladi.

## Git’da saqlanmaydigan fayllar

Quyidagi papkalar development yoki build vaqtida avtomatik yaratiladi va repository’ga qo‘shilmaydi:

~~~text
node_modules/
.next/
out/
*.tsbuildinfo
*.log
~~~

Bu qoidalar `.gitignore` faylida belgilangan.
