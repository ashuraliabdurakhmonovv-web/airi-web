"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Tahlil va aniqlash",
    subtitle: "Ehtiyoj -> texnik talab",
    description:
      "Tashkilotdagi real jarayonni o'rganib, muammo, ma'lumot manbalari va AI yechimdan kutiladigan natijani aniq belgilaymiz.",
  },
  {
    number: "02",
    title: "Model va prototip",
    subtitle: "Algoritm -> sinov",
    description:
      "Mos AI model, algoritm yoki platforma prototipini ishlab chiqib, uni test ma'lumotlari va real ssenariylarda tekshiramiz.",
  },
  {
    number: "03",
    title: "Integratsiya va kuzatuv",
    subtitle: "Joriy etish -> optimallashtirish",
    description:
      "Tayyor yechimni mavjud tizimlarga ulab, foydalanish jarayonida monitoring, sozlash va samaradorlikni oshirishni davom ettiramiz.",
  },
];

const codeLines = [
  ["var", "cont"],
  ["min var", "min fun"],
  ["min var"],
  ["var", "atr", "cont"],
  ["min atr", "lrg fun", "min fun", "lrg cont"],
  ["lrg atr", "min fun", "min cont"],
  ["atr", "min fun", "atr"],
  ["min atr", "min cont", "lrg atr", "fun"],
  ["min atr", "lrg fun", "lrg cont", "min fun"],
  ["min var"],
  ["min var"],
  ["min var"],
  ["min atr", "min fun"],
  ["min atr", "min fun", "lrg fun", "lrg cont"],
  ["min atr", "min fun", "lrg atr", "lrg cont"],
  ["min fun", "lrg atr"],
  ["atr", "var", "cont"],
  ["min var"],
  ["min atr", "min fun", "lrg atr", "lrg cont"],
  ["min var"],
];

const codeLineTabs = [
  "",
  "",
  "",
  "",
  "tab1",
  "tab1",
  "tab1",
  "tab1",
  "tab1",
  "tab1",
  "tab1",
  "tab2",
  "tab2",
  "tab3",
  "tab3",
  "tab4",
  "tab1",
  "tab3",
  "tab4",
  "",
];

function LaptopProcessVisual() {
  return (
    <div className="airi-laptop-wrap" aria-hidden="true">
      <div className="airi-laptop-comp">
        <div className="airi-laptop-monitor">
          <div className="airi-laptop-mid">
            <div className="airi-laptop-site">
              <div className="airi-laptop-topbar">
                <div className="airi-laptop-window-controls">
                  <div />
                  <div />
                  <div />
                </div>
              </div>
              <div className="airi-laptop-inhead">
                <div className="airi-laptop-mid">
                  <div className="airi-laptop-site-item" />
                </div>
                <div className="airi-laptop-mid airi-laptop-txr">
                  <div className="airi-laptop-site-item" />
                  <div className="airi-laptop-site-item" />
                  <div className="airi-laptop-site-item" />
                  <div className="airi-laptop-site-item" />
                </div>
              </div>
              <div className="airi-laptop-inslid" />
              <div className="airi-laptop-incont">
                <div className="airi-laptop-site-item" />
                <div className="airi-laptop-site-item" />
                <div className="airi-laptop-site-item" />
                <div className="airi-laptop-site-item" />
                <div className="airi-laptop-widgets">
                  {[0, 1, 2].map((item) => (
                    <div className="airi-laptop-widget" key={item}>
                      <div>
                        <div className="airi-laptop-widget-foot" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="airi-laptop-infoot" />
              </div>
            </div>
          </div>

          <div className="airi-laptop-mid airi-laptop-code">
            {codeLines.map((line, lineIndex) => (
              <div
                className={`airi-laptop-line ${codeLineTabs[lineIndex]}`}
                key={`${line.join("-")}-${lineIndex}`}>
                {line.map((item, itemIndex) => (
                  <div
                    className={`airi-laptop-code-item ${item}`}
                    key={`${item}-${itemIndex}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="airi-laptop-base" />
      </div>
    </div>
  );
}

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[oklch(0.09_0.01_260)] text-white overflow-hidden">
      <div className="absolute bottom-0 left-0 w-100 h-100 rounded-full bg-white/2 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-350 mx-auto px-6 lg:px-12">
        <div className="relative mb-8 grid items-end gap-8 lg:mb-10 lg:grid-cols-2 lg:gap-12">
          <div className="overflow-hidden">
            <div
              className={`transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"}`}>
              <span className="inline-flex items-center gap-3 text-sm font-mono text-white/40 mb-8">
                <span className="w-12 h-px bg-white/20" />
                Jarayon
              </span>
            </div>

            <h2
              className={`text-6xl md:text-7xl lg:text-[128px] font-display tracking-tight leading-[0.85] transition-all duration-1000 delay-100 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-16 opacity-0"
              }`}>
              <span className="block">Tadqiq qilamiz.</span>
              <span className="block text-white/30">Yaratamiz.</span>
              <span className="block text-white/10">Joriy etamiz.</span>
            </h2>
          </div>

          <div
            className={`relative flex min-h-80 items-end justify-center pb-2 transition-all duration-1000 delay-200 lg:min-h-10 lg:pb-4 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}>
            <LaptopProcessVisual />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          {steps.map((step, index) => (
            <button
              key={step.number}
              type="button"
              onClick={() => setActiveStep(index)}
              className={`relative text-left p-8 lg:p-12 border transition-all duration-500 ${
                activeStep === index
                  ? "bg-[#000000] border-white/60"
                  : "bg-[#000000] border-white/25 hover:border-white/50"
              }`}>
              <div className="flex items-center gap-4 mb-8">
                <span
                  className={`text-4xl font-display transition-colors duration-300 ${
                    activeStep === index ? "text-[#54a2ff]" : "text-white/20"
                  }`}>
                  {step.number}
                </span>
                <div className="flex-1 h-px bg-white/10 overflow-hidden">
                  {activeStep === index && (
                    <div className="h-full bg-[#54a2ff]/50 animate-progress" />
                  )}
                </div>
              </div>

              <h3 className="text-2xl lg:text-3xl xl:text-4xl font-display mb-3 leading-tight">
                {step.title}
              </h3>
              <span className="text-base lg:text-lg text-white/40 font-mono block mb-6">
                {step.subtitle}
              </span>

              <p
                className={`text-white/60 leading-relaxed transition-opacity duration-300 ${
                  activeStep === index ? "opacity-100" : "opacity-60"
                }`}>
                {step.description}
              </p>

              <div
                className={`absolute bottom-0 left-0 right-0 h-1 bg-[#54a2ff] transition-transform duration-500 origin-left ${
                  activeStep === index ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
