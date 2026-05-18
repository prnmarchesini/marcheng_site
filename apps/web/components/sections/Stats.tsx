"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import Container from "../ui/Container";

type Stat = {
  value: number;
  suffix: string;
  labelKey: string;
};

const STATS: Stat[] = [
  { value: 200, suffix: " MW", labelKey: "accessApproval" },
  { value: 50, suffix: "+ MW", labelKey: "detailedEngineering" },
  { value: 100, suffix: "+", labelKey: "gridApproved" },
  { value: 20, suffix: "+", labelKey: "commissioned" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => Math.round(v).toString());

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionValue, to, { duration: 1.5, ease: "easeOut" });
    return controls.stop;
  }, [inView, motionValue, to]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const unsubscribe = rounded.on("change", (v) => {
      node.textContent = `${v}${suffix}`;
    });
    node.textContent = `0${suffix}`;
    return unsubscribe;
  }, [rounded, suffix]);

  return (
    <span
      ref={ref}
      className="text-secondary text-[42px] md:text-[48px] font-extrabold leading-none mb-2"
    >
      0{suffix}
    </span>
  );
}

export default function Stats() {
  const t = useTranslations("stats");

  return (
    <section className="py-20 md:py-24 bg-surface-container-low border-y border-divider">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 text-center">
          {STATS.map((s, i) => (
            <motion.div
              key={s.labelKey}
              className="flex flex-col"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Counter to={s.value} suffix={s.suffix} />
              <span className="text-text-secondary font-label-md text-label-md uppercase tracking-wider">
                {t(s.labelKey)}
              </span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
