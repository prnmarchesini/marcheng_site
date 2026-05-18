import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "accent" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-label-md text-label-md uppercase tracking-[0.05em] rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep disabled:opacity-50 disabled:cursor-not-allowed";

const sizes: Record<Size, string> = {
  md: "px-6 py-2.5",
  lg: "px-8 py-4",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-primary-container text-on-primary-container hover:opacity-90",
  secondary:
    "border border-primary text-primary hover:bg-primary/10",
  accent:
    "bg-secondary text-bg-deep hover:opacity-90 font-bold",
  ghost:
    "text-text-primary hover:text-secondary",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
};

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { as?: "button" };
type AnchorProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: "a"; href: string };

type Props = ButtonProps | AnchorProps;

export default function Button(props: Props) {
  const { variant = "primary", size = "md", className = "", ...rest } = props;
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if ((props as AnchorProps).as === "a") {
    const { as: _as, ...anchorRest } = rest as AnchorProps;
    return <a className={classes} {...anchorRest} />;
  }
  const { as: _as, ...buttonRest } = rest as ButtonProps;
  return <button className={classes} {...buttonRest} />;
}
