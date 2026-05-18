"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Container from "../ui/Container";
import Button from "../ui/Button";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex items-center hero-pattern pt-32 pb-20 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <motion.div
            className="lg:col-span-8 flex flex-col justify-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="text-secondary font-label-md text-label-md uppercase tracking-[0.2em] mb-6">
              {t("eyebrow")}
            </span>
            <h1 className="text-headline-xl md:text-[64px] lg:text-[72px] font-extrabold tracking-tight leading-[1.05] mb-6">
              {t.rich("headline", {
                accent: (chunks) => <span className="text-primary">{chunks}</span>,
              })}
            </h1>
            <p className="text-text-secondary text-body-lg max-w-2xl mb-10 leading-relaxed">
              {t("subheadline")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button as="a" href="#contato" variant="primary" size="lg">
                {t("ctaPrimary")}
              </Button>
              <Button as="a" href="#sobre" variant="secondary" size="lg">
                {t("ctaSecondary")}
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
      <div
        aria-hidden="true"
        className="absolute right-0 bottom-0 w-1/2 h-1/2 bg-secondary/5 blur-[120px] -z-10 rounded-full"
      />
      <div
        aria-hidden="true"
        className="absolute -top-32 -right-32 w-96 h-96 bg-primary/5 blur-[100px] rounded-full -z-10"
      />
    </section>
  );
}
