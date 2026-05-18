import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

export default function Container({ className = "", ...rest }: Props) {
  return (
    <div
      className={`px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full ${className}`}
      {...rest}
    />
  );
}
