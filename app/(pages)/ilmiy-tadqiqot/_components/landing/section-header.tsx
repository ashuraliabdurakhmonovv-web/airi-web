/** @format */

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
}) {
  const centered = align === "center";

  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="text-sm font-black uppercase tracking-[0.18em] text-[#604eff]">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-black leading-tight text-slate-950 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-5 text-base font-medium leading-8 text-slate-600">
        {description}
      </p>
    </div>
  );
}
