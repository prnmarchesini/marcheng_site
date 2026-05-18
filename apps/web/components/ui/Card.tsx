import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  hover?: boolean;
};

export default function Card({ hover = false, className = "", ...rest }: Props) {
  const hoverCls = hover
    ? "hover:border-secondary hover:-translate-y-0.5 transition-all duration-200"
    : "";
  return (
    <div
      className={`bg-bg-surface border border-divider rounded-lg ${hoverCls} ${className}`}
      {...rest}
    />
  );
}
