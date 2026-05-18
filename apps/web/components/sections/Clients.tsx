"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Container from "../ui/Container";

const CLIENT_COUNT = 8;

export default function Clients() {
  const t = useTranslations("clients");

  return (
    <section id="clientes" className="py-24 md:py-32 scroll-mt-24">
      <Container className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="font-label-md text-label-md text-text-secondary uppercase tracking-[0.2em] mb-4">
            {t("title")}
          </h3>
          <p className="text-text-secondary text-body-md mb-12">{t("subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 items-center">
          {Array.from({ length: CLIENT_COUNT }, (_, i) => i + 1).map((n, idx) => (
            <motion.div
              key={n}
              className="flex justify-center p-6 md:p-8 bg-surface-container rounded-lg border border-divider opacity-60 hover:opacity-100 transition-opacity duration-200"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.6 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <Image
                src={`/clients/client-${String(n).padStart(2, "0")}.svg`}
                alt={`${t("logoAlt")} ${n}`}
                width={128}
                height={48}
                className="h-12 w-auto"
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
