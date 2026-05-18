"use client";

import { Check, ChevronDown, Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { locales, type Locale } from "../i18n";

const labels: Record<Locale, string> = {
  pt: "PT",
  en: "EN",
  es: "ES",
  it: "IT",
};

const fullNames: Record<Locale, string> = {
  pt: "Português",
  en: "English",
  es: "Español",
  it: "Italiano",
};

type Props = {
  className?: string;
  compact?: boolean;
};

export default function LanguageSwitcher({ className = "", compact = false }: Props) {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  function switchTo(next: Locale) {
    const segments = pathname.split("/").filter(Boolean);
    const first = segments[0];
    const isLocaleSegment = locales.includes(first as Locale);
    const rest = isLocaleSegment ? segments.slice(1) : segments;
    const path = rest.length ? `/${rest.join("/")}` : "";
    const target = next === "pt" ? path || "/" : `/${next}${path}`;
    router.push(target);
    router.refresh();
    setOpen(false);
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("languageSwitcher")}
        className="flex items-center gap-1.5 text-text-primary hover:text-secondary transition-colors text-label-md font-label-md uppercase tracking-[0.05em]"
      >
        <Globe size={16} strokeWidth={1.5} />
        <span>{labels[locale]}</span>
        <ChevronDown
          size={14}
          strokeWidth={1.5}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <ul
          role="listbox"
          className={`absolute ${compact ? "left-0" : "right-0"} mt-2 min-w-[160px] bg-surface-container border border-divider rounded-lg backdrop-blur-xl py-1 z-50 shadow-2xl`}
        >
          {locales.map((l) => (
            <li key={l} role="option" aria-selected={l === locale}>
              <button
                type="button"
                onClick={() => switchTo(l)}
                className="w-full flex items-center justify-between gap-3 px-4 py-2 text-body-sm text-text-primary hover:bg-surface-container-high transition-colors text-left"
              >
                <span>{fullNames[l]}</span>
                {l === locale && (
                  <Check size={14} strokeWidth={2} className="text-secondary" />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
