import * as React from "react";
import type { SimpleIcon as SimpleIconType } from "simple-icons";

type Props = React.SVGProps<SVGSVGElement> & {
  icon: SimpleIconType;
  /** Optional accessible label; if omitted, we use the icon's title. */
  label?: string;
};

export function SimpleIcon({ icon, label, ...svgProps }: Props) {
  const ariaLabel = label ?? icon.title;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      role="img"
      aria-label={ariaLabel}
      focusable="false"
      {...svgProps}
    >
      <title>{ariaLabel}</title>
      <path d={icon.path} />
    </svg>
  );
}


