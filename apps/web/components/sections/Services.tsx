"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ClipboardCheck,
  ShieldCheck,
  Sun,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Card from "../ui/Card";
import Container from "../ui/Container";

type Service = {
  key: string;
  slug: string;
  icon: LucideIcon;
};

const SERVICES: Service[] = [
  { key: "solar", slug: "engenharia-solar", icon: Sun },
  { key: "electrical", slug: "engenharia-eletrica", icon: Zap },
  { key: "owner", slug: "engenharia-do-proprietario", icon: ClipboardCheck },
  { key: "commissioning", slug: "comissionamento", icon: Wrench },
  { key: "dueDiligence", slug: "due-diligence", icon: ShieldCheck },
];

export default function Services() {
  const t = useTranslations("services");
  const tItems = useTranslations("services.items");

  return (
    <section id="servicos" className="py-24 md:py-32 scroll-mt-24">
      <Container>
        <motion.div
          className="mb-16 md:mb-20 max-w-2xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-secondary font-label-md text-label-md uppercase tracking-[0.2em] block mb-4">
            {t("eyebrow")}
          </span>
          <h2 className="font-headline-lg text-headline-lg md:text-[40px] leading-tight">
            {t("title")}
          </h2>
          <p className="text-text-secondary text-body-lg mt-6 leading-relaxed">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Top row: 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {SERVICES.slice(0, 3).map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} t={tItems} />
          ))}
        </div>
        {/* Bottom row: 2 cards centralized */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:max-w-4xl md:mx-auto">
          {SERVICES.slice(3).map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i + 3} t={tItems} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ServiceCard({
  service,
  index,
  t,
}: {
  service: Service;
  index: number;
  t: (key: string) => string;
}) {
  const Icon = service.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      {/* TODO: rota /[locale]/servicos/[slug] ainda não criada — link cai em 404 até a próxima entrega */}
      <Link href={`/servicos/${service.slug}`} className="block h-full group">
        <Card hover className="p-8 h-full flex flex-col">
          <Icon
            size={32}
            strokeWidth={1.5}
            className="text-secondary mb-6 group-hover:scale-110 transition-transform"
            aria-hidden="true"
          />
          <h3 className="font-headline-md text-headline-md mb-3">
            {t(`${service.key}.title`)}
          </h3>
          <p className="text-text-secondary leading-relaxed text-body-md flex-1">
            {t(`${service.key}.description`)}
          </p>
          <span className="mt-6 inline-flex items-center gap-2 text-primary text-label-md font-label-md uppercase tracking-[0.05em] group-hover:gap-3 transition-all">
            {t("learnMore")}
            <ArrowRight size={16} strokeWidth={1.5} />
          </span>
        </Card>
      </Link>
    </motion.div>
  );
}
