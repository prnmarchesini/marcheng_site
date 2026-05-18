"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import Container from "../ui/Container";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP ?? "5517997377626";
const EMAIL = process.env.NEXT_PUBLIC_EMAIL ?? "renan@marcheng.com.br";

function formatWhatsApp(num: string): string {
  // 5517997377626 -> +55 17 99737-7626
  if (num.length !== 13) return `+${num}`;
  return `+${num.slice(0, 2)} ${num.slice(2, 4)} ${num.slice(4, 9)}-${num.slice(9)}`;
}

export default function Contact() {
  const t = useTranslations("contact");

  return (
    <section id="contato" className="py-24 md:py-32 scroll-mt-24">
      <Container>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-headline-lg text-headline-lg md:text-[40px] leading-tight mb-4">
            {t("title")}
          </h2>
          <p className="text-text-secondary text-body-lg">{t("subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <motion.a
            href={`https://wa.me/${WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-6 p-6 md:p-8 bg-bg-surface border border-divider rounded-lg hover:border-secondary hover:-translate-y-0.5 transition-all duration-200 group"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5% 0px" }}
            transition={{ duration: 0.4 }}
          >
            <div className="w-14 h-14 md:w-16 md:h-16 bg-accent-gold-muted flex items-center justify-center rounded-full group-hover:bg-secondary/25 transition-colors shrink-0">
              <MessageCircle size={28} strokeWidth={1.5} className="text-secondary" />
            </div>
            <div>
              <span className="text-label-md font-label-md uppercase tracking-[0.05em] text-text-secondary block mb-1">
                {t("whatsappLabel")}
              </span>
              <span className="text-body-lg font-bold">{formatWhatsApp(WHATSAPP)}</span>
            </div>
          </motion.a>

          <motion.a
            href={`mailto:${EMAIL}`}
            className="flex items-center gap-6 p-6 md:p-8 bg-bg-surface border border-divider rounded-lg hover:border-secondary hover:-translate-y-0.5 transition-all duration-200 group"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5% 0px" }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="w-14 h-14 md:w-16 md:h-16 bg-accent-gold-muted flex items-center justify-center rounded-full group-hover:bg-secondary/25 transition-colors shrink-0">
              <Mail size={28} strokeWidth={1.5} className="text-secondary" />
            </div>
            <div>
              <span className="text-label-md font-label-md uppercase tracking-[0.05em] text-text-secondary block mb-1">
                {t("emailLabel")}
              </span>
              <span className="text-body-lg font-bold break-all">{EMAIL}</span>
            </div>
          </motion.a>
        </div>
      </Container>
    </section>
  );
}
