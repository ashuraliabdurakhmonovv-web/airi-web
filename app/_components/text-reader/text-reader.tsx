/** @format */

"use client";

import { useEffect, useState, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useLocale } from "@/i18n";

type Position = { x: number; y: number };

export default function TextReader() {
  const [text, setText] = useState<string>("");
  const [pos, setPos] = useState<Position | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synth = useRef<SpeechSynthesis | null>(null);
  const { locale } = useLocale();

  useEffect(() => {
    if (typeof window !== "undefined") {
      synth.current = window.speechSynthesis;
    }
  }, []);

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();

      if (!selection || selection.rangeCount === 0) {
        setPos(null);
        return;
      }

      const selectedText = selection.toString().trim();

      if (selectedText.length < 2) {
        setPos(null);
        return;
      }

      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      if (rect.width > 0) {
        setText(selectedText);
        setPos({
          x: rect.left + rect.width / 2,
          y: rect.top - 45,
        });
      }
    };

    document.addEventListener("selectionchange", handleSelection);
    return () =>
      document.removeEventListener("selectionchange", handleSelection);
  }, []);

  const getBestFemaleVoice = () => {
    if (!synth.current) return null;
    const voices = synth.current.getVoices();

    return (
      voices.find(
        (v) => v.lang.includes(locale) && v.name.toLowerCase().includes("female"),
      ) ||
      voices.find(
        (v) =>
          v.name.toLowerCase().includes("google") &&
          v.name.toLowerCase().includes("female"),
      ) ||
      voices.find(
        (v) =>
          v.name.toLowerCase().includes("online") &&
          v.name.toLowerCase().includes("female"),
      ) ||
      voices.find((v) => v.name.toLowerCase().includes("female")) ||
      voices[0]
    );
  };

  const readText = () => {
    if (!synth.current || !text) return;

    if (isSpeaking) {
      synth.current.cancel();
      setIsSpeaking(false);
      return;
    }

    const humanizedText = text.replace(/,/g, ", ").replace(/\./g, ". ");

    const utterance = new SpeechSynthesisUtterance(humanizedText);
    const voice = getBestFemaleVoice();

    if (voice) utterance.voice = voice;

    utterance.rate = 0.85;
    utterance.pitch = 1.15;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synth.current.cancel();
    synth.current.speak(utterance);
  };

  if (!pos) return null;

  return (
    <button
      onMouseDown={(e) => e.preventDefault()}
      onClick={readText}
      style={{
        top: `${pos.y}px`,
        left: `${pos.x}px`,
        transform: "translateX(-50%)",
      }}
      className={`fixed z-9999 flex items-center gap-2 px-3 py-2 rounded-full shadow-2xl transition-all duration-300 animate-in fade-in zoom-in ${
        isSpeaking
          ? "bg-rose-600 scale-110"
          : "bg-indigo-600 hover:bg-indigo-700"
      } text-white`}>
      {isSpeaking ? (
        <>
          <VolumeX size={16} />
        </>
      ) : (
        <>
          <Volume2 size={16} />
        </>
      )}
    </button>
  );
}
