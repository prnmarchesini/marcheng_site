"use client";

import { motion } from "framer-motion";
import { Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import Container from "../ui/Container";

export default function About() {
  const t = useTranslations("about");

  return (
    <section
      id="sobre"
      className="py-24 md:py-32 bg-surface-container-low overflow-hidden scroll-mt-24"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-center">
          {/* TODO: trocar este placeholder por foto real da equipe ou de uma usina (next/image em /public/about.jpg) */}
          <motion.div
            className="relative lg:col-span-2"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6 }}
          >
            <div
              aria-hidden="true"
              className="absolute -inset-6 bg-secondary/15 blur-3xl rounded-full opacity-60"
            />
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-divider bg-bg-surface flex items-center justify-center">
              <div className="absolute inset-0 hero-pattern opacity-30" aria-hidden="true" />
              <Sun
                size={72}
                strokeWidth={1}
                className="text-secondary/40 relative z-10"
                aria-hidden="true"
              />
              <span className="absolute bottom-6 left-6 text-label-md font-label-md text-text-secondary uppercase tracking-[0.2em] z-10">
                {t("imagePlaceholder")}
              </span>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-secondary font-label-md text-label-md uppercase tracking-[0.2em] block mb-4">
              {t("eyebrow")}
            </span>
            <h2 className="font-headline-lg text-headline-lg md:text-[40px] leading-tight mb-8">
              {t("title")}
            </h2>
            <div className="space-y-6 text-text-secondary text-body-lg leading-relaxed">
              <p>{t("paragraph1")}</p>
              <p>{t("paragraph2")}</p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
