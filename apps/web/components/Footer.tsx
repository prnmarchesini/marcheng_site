import { Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";

const SERVICES = [
  { slug: "engenharia-solar", key: "solar" },
  { slug: "engenharia-eletrica", key: "electrical" },
  { slug: "engenharia-do-proprietario", key: "owner" },
  { slug: "comissionamento", key: "commissioning" },
  { slug: "due-diligence", key: "dueDiligence" },
] as const;

export default function Footer() {
  const t = useTranslations("footer");
  const tServices = useTranslations("services.items");

  return (
    <footer className="bg-bg-deep border-t border-divider pt-20 pb-10">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2" aria-label="MarchEng">
              <Zap size={28} strokeWidth={1.5} className="text-primary" aria-hidden="true" />
              <span className="text-headline-md font-headline-md tracking-tight">
                MarchEng
              </span>
            </Link>
            <p className="text-text-secondary text-body-sm leading-relaxed max-w-xs">
              {t("tagline")}
            </p>
            <p className="text-text-secondary text-body-sm">{t("location")}</p>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-label-md font-label-md text-secondary uppercase tracking-widest mb-2">
              {t("contactTitle")}
            </h4>
            <a
              className="text-text-secondary text-body-md hover:text-primary transition-colors"
              href="https://wa.me/5517997377626"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("whatsapp")}
            </a>
            <a
              className="text-text-secondary text-body-md hover:text-primary transition-colors"
              href="mailto:renan@marcheng.com.br"
            >
              renan@marcheng.com.br
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-label-md font-label-md text-secondary uppercase tracking-widest mb-2">
              {t("servicesTitle")}
            </h4>
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                href={`/servicos/${s.slug}`}
                className="text-text-secondary text-body-md hover:text-primary transition-colors"
              >
                {tServices(`${s.key}.title`)}
              </Link>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-divider flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-secondary text-label-md font-label-md">
            {t("copyright")}
          </p>
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  );
}
