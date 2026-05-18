import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

export default function Container(props: Props) {
  return <div {...props} />;
}
