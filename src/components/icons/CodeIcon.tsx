import type { IconProps } from "./icon-props";
import { DEFAULT_ICON_PROPS } from "./icon-props";

export function CodeIcon({
  size = DEFAULT_ICON_PROPS.SIZE,
  strokeWidth = DEFAULT_ICON_PROPS.STROKE_WIDTH,
  className = "",
  ...props
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  );
}
