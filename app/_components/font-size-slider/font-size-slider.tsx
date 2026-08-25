/** @format */
"use client";
import { useEffect, useState } from "react";
import { useLocale } from "@/i18n";
import {
  Contrast,
  ImageOff,
  Minus,
  Moon,
  Plus,
  Sun,
  type LucideIcon,
} from "lucide-react";

const FONT_LEVELS = [
  { label: "A−", value: 0.9 },
  { label: "A", value: 1 },
  { label: "A+", value: 1.15 },
  { label: "A++", value: 1.3 },
];

const DEFAULT_INDEX = 1;

type ThemeMode = "light" | "dark" | "highContrast" | "grayscale";

const THEME_OPTIONS: {
  mode: ThemeMode;
  labelKey: "lightMode" | "darkMode" | "highContrast" | "grayscale";
  icon: LucideIcon;
}[] = [
  { mode: "light", labelKey: "lightMode", icon: Sun },
  { mode: "dark", labelKey: "darkMode", icon: Moon },
  { mode: "highContrast", labelKey: "highContrast", icon: Contrast },
  { mode: "grayscale", labelKey: "grayscale", icon: ImageOff },
];

const findClosestIndex = (value: number): number => {
  const index = FONT_LEVELS.findIndex((level) => level.value === value);
  return index !== -1 ? index : DEFAULT_INDEX;
};

const applyTextScale = (value: number) => {
  if (value === 1) {
    document.documentElement.style.removeProperty("--text-scale");
    document.documentElement.style.removeProperty("font-size");
  } else {
    document.documentElement.style.setProperty("--text-scale", value.toString());
    document.documentElement.style.setProperty("font-size", `${value * 100}%`);
  }
};

const applyTheme = (mode: ThemeMode) => {
  document.documentElement.classList.remove(
    "theme-light",
    "theme-dark",
    "theme-high-contrast",
    "theme-grayscale"
  );

  switch (mode) {
    case "light":
      document.documentElement.classList.add("theme-light");
      break;
    case "dark":
      document.documentElement.classList.add("theme-dark");
      break;
    case "highContrast":
      document.documentElement.classList.add("theme-high-contrast");
      break;
    case "grayscale":
      document.documentElement.classList.add("theme-grayscale");
      break;
  }
};

export default function FontSizeController() {
  const { t } = useLocale();
  const [sliderValue, setSliderValue] = useState(DEFAULT_INDEX);
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const savedScale = localStorage.getItem("textScale");
      if (savedScale) {
        const scaleValue = Number(savedScale);
        const index = findClosestIndex(scaleValue);
        setSliderValue(index);
        if (scaleValue !== 1) {
          applyTextScale(scaleValue);
        }
      }

      const savedTheme = localStorage.getItem("themeMode") as ThemeMode;
      const theme = savedTheme || "light";
      setThemeMode(theme);
      applyTheme(theme);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const changeFontSize = (index: number) => {
    const value = FONT_LEVELS[index].value;
    setSliderValue(index);

    if (value === 1) {
      applyTextScale(1);
      localStorage.removeItem("textScale");
    } else {
      applyTextScale(value);
      localStorage.setItem("textScale", value.toString());
    }
  };

  const resetToDefault = () => {
    setSliderValue(DEFAULT_INDEX);
    applyTextScale(1);
    localStorage.removeItem("textScale");
  };

  const changeTheme = (mode: ThemeMode) => {
    setThemeMode(mode);
    applyTheme(mode);
    localStorage.setItem("themeMode", mode);
  };

  return (
    <div className="flex w-full flex-col gap-4 text-slate-800">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-sm font-semibold text-slate-800">
            {t.fontSizeController.fontSize}
          </span>
          <div className="flex shrink-0 items-center gap-2">
            <span className="border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700">
              {FONT_LEVELS[sliderValue].label}
            </span>
            <button
              type="button"
              onClick={resetToDefault}
              className="whitespace-nowrap text-xs font-medium text-slate-500 underline decoration-dotted underline-offset-2 transition-colors hover:text-[#604eff] disabled:cursor-not-allowed disabled:opacity-40"
              disabled={sliderValue === DEFAULT_INDEX}
              aria-label="Reset to default font size"
            >
              {t.fontSizeController.reset}
            </button>
          </div>
        </div>

        <div className="relative flex items-center gap-3">
          <button
            type="button"
            onClick={() => sliderValue > 0 && changeFontSize(sliderValue - 1)}
            className="flex size-8 shrink-0 items-center justify-center border border-slate-200 bg-white text-slate-700 transition-colors hover:border-[#604eff]/40 hover:text-[#604eff] disabled:cursor-not-allowed disabled:opacity-40"
            disabled={sliderValue === 0}
            aria-label="Decrease font size"
          >
            <Minus className="size-4" aria-hidden="true" />
          </button>

          <div className="relative flex h-10 flex-1 items-center">
            <input
              type="range"
              min="0"
              max={FONT_LEVELS.length - 1}
              step="1"
              value={sliderValue}
              onChange={(e) => changeFontSize(Number(e.target.value))}
              className="slider h-2 w-full cursor-pointer appearance-none bg-slate-200"
              aria-label="Font size slider"
            />

            <div className="pointer-events-none absolute top-1/2 flex w-full -translate-y-1/2 justify-between px-1">
              {FONT_LEVELS.map((_, index) => (
                <div
                  key={index}
                  className={`size-1.5 ${
                    index <= sliderValue
                      ? "bg-[#604eff]"
                      : "bg-slate-400/40"
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              sliderValue < FONT_LEVELS.length - 1 &&
              changeFontSize(sliderValue + 1)
            }
            className="flex size-8 shrink-0 items-center justify-center border border-slate-200 bg-white text-slate-700 transition-colors hover:border-[#604eff]/40 hover:text-[#604eff] disabled:cursor-not-allowed disabled:opacity-40"
            disabled={sliderValue === FONT_LEVELS.length - 1}
            aria-label="Increase font size"
          >
            <Plus className="size-4" aria-hidden="true" />
          </button>
        </div>

        <div className="flex justify-between px-8 text-xs text-slate-500">
          {FONT_LEVELS.map((level, index) => (
            <span
              key={index}
              className={`transition-colors ${
                index === sliderValue ? "font-semibold text-[#604eff]" : ""
              }`}
            >
              {level.label}
            </span>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-200" />

      <div className="flex flex-col gap-3">
        <span className="text-sm font-semibold text-slate-800">
          {t.fontSizeController.displayMode}
        </span>
        <div className="grid grid-cols-2 gap-2">
          {THEME_OPTIONS.map(({ mode, labelKey, icon: Icon }) => {
            const isActive = themeMode === mode;

            return (
              <button
                key={mode}
                type="button"
                onClick={() => changeTheme(mode)}
                className={`flex min-h-10 items-center gap-2 border px-3 py-2 text-left text-xs font-semibold transition-colors ${
                  isActive
                    ? "border-[#604eff] bg-[#604eff] text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-[#604eff]/40 hover:bg-[#604eff]/5 hover:text-[#604eff]"
                }`}
                aria-label={t.fontSizeController[labelKey]}
                aria-pressed={isActive}
                title={t.fontSizeController[labelKey]}
              >
                <Icon className="size-4 shrink-0" aria-hidden="true" />
                <span className="min-w-0 truncate">
                  {t.fontSizeController[labelKey]}
                </span>
              </button>
            );
          })}
        </div>

        <div className="border-l-2 border-[#604eff] bg-white px-3 py-2 text-xs font-medium text-slate-600">
          {themeMode === "light" && t.fontSizeController.lightMode}
          {themeMode === "dark" && t.fontSizeController.darkMode}
          {themeMode === "highContrast" && t.fontSizeController.highContrast}
          {themeMode === "grayscale" && t.fontSizeController.grayscale}
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          border: 2px solid white;
          border-radius: 4px;
          background: #604eff;
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(15, 23, 42, 0.22);
          transition: all 0.15s ease;
        }

        .slider::-webkit-slider-thumb:hover {
          transform: translateY(-1px);
          box-shadow: 0 3px 8px rgba(96, 78, 255, 0.28);
        }

        .slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border: 2px solid white;
          border-radius: 4px;
          background: #604eff;
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(15, 23, 42, 0.22);
          transition: all 0.15s ease;
        }

        .slider::-moz-range-thumb:hover {
          transform: translateY(-1px);
          box-shadow: 0 3px 8px rgba(96, 78, 255, 0.28);
        }

        .slider::-webkit-slider-runnable-track {
          background: transparent;
        }

        .slider::-moz-range-track {
          background: transparent;
        }
      `}</style>
    </div>
  );
}
