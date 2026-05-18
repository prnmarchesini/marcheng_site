"use client";

import { Menu, X, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "./ui/Button";
import LanguageSwitcher from "./LanguageSwitcher";

const SECTIONS = [
  { id: "servicos", key: "services" },
  { id: "sobre", key: "about" },
  { id: "clientes", key: "clients" },
  { id: "contato", key: "contact" },
] as const;

export default function Nav() {
  const t = useTranslations("nav");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-divider">
      <div className="flex justify-between items-center h-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <Link href="/" className="flex items-center gap-2" aria-label="MarchEng">
          <Zap
            size={28}
            strokeWidth={1.5}
            className="text-primary"
            aria-hidden="true"
          />
          <span className="text-headline-md font-headline-md tracking-tight">
            MarchEng
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label={t("primary")}>
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-text-primary text-label-md font-label-md uppercase tracking-[0.05em] hover:text-secondary transition-colors"
            >
              {t(s.key)}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-6">
          <LanguageSwitcher />
          <Button as="a" href="#contato" variant="primary">
            {t("cta")}
          </Button>
        </div>

        <button
          type="button"
          className="md:hidden text-text-primary"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-divider bg-surface/95 backdrop-blur-xl">
          <div className="px-margin-mobile py-6 flex flex-col gap-6">
            <nav className="flex flex-col gap-4" aria-label={t("primary")}>
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setMobileOpen(false)}
                  className="text-text-primary text-body-lg hover:text-secondary transition-colors"
                >
                  {t(s.key)}
                </a>
              ))}
            </nav>
            <div className="flex items-center justify-between pt-4 border-t border-divider">
              <LanguageSwitcher compact />
              <Button
                as="a"
                href="#contato"
                variant="primary"
                onClick={() => setMobileOpen(false)}
              >
                {t("cta")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
