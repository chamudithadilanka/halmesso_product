import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, strokeWidth = 1.7, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const BagIcon = (p: IconProps) => (
  <Base {...p}><path d="M16.5 10.5V7.9a4.5 4.5 0 0 0-9 0v2.6M4.5 10.5h15l-1.1 9.6a2.3 2.3 0 0 1-2.3 1.9H7.9a2.3 2.3 0 0 1-2.3-1.9l-1.1-9.6Z" /></Base>
);
export const UserIcon = (p: IconProps) => (
  <Base {...p}><path d="M15.75 7.5a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a8.25 8.25 0 0 1 15 0" /></Base>
);
export const MenuIcon = (p: IconProps) => (
  <Base {...p}><path d="M4 7h16M4 12h16M4 17h10" /></Base>
);
export const CloseIcon = (p: IconProps) => (
  <Base {...p}><path d="M6 6l12 12M18 6 6 18" /></Base>
);
export const CheckIcon = (p: IconProps) => (
  <Base {...p}><path d="m4.5 12.75 6 6 9-13.5" /></Base>
);
export const TrashIcon = (p: IconProps) => (
  <Base {...p}><path d="m19 7-.87 12.14A2 2 0 0 1 16.14 21H7.86a2 2 0 0 1-2-1.86L5 7m5 4v6m4-6v6M9.5 7V5A1.5 1.5 0 0 1 11 3.5h2A1.5 1.5 0 0 1 14.5 5v2M4.5 7h15" /></Base>
);
export const ArrowRightIcon = (p: IconProps) => (
  <Base {...p}><path d="M5 12h14m-6-6 6 6-6 6" /></Base>
);
export const PlusIcon = (p: IconProps) => (
  <Base {...p}><path d="M12 5v14M5 12h14" /></Base>
);
export const MinusIcon = (p: IconProps) => (
  <Base {...p}><path d="M5 12h14" /></Base>
);
export const LeafIcon = (p: IconProps) => (
  <Base {...p}><path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14Zm0 0 7-7" /></Base>
);
export const BoneIcon = (p: IconProps) => (
  <Base {...p}><path d="M8.5 15.5 15.5 8.5M7 13a2.5 2.5 0 1 0-2.5 2.5A2.5 2.5 0 1 0 7 18l.5-.5M17 11a2.5 2.5 0 1 0 2.5-2.5A2.5 2.5 0 1 0 17 6l-.5.5" /></Base>
);
export const BrainIcon = (p: IconProps) => (
  <Base {...p}><path d="M9.5 3.5A3 3 0 0 0 6.5 6.4 3 3 0 0 0 4.5 12a3 3 0 0 0 2 5 3 3 0 0 0 5.5 1.5V5a2.5 2.5 0 0 0-2.5-1.5ZM14.5 3.5a3 3 0 0 1 3 2.9 3 3 0 0 1 2 5.6 3 3 0 0 1-2 5 3 3 0 0 1-5.5 1.5" /></Base>
);
export const ShieldIcon = (p: IconProps) => (
  <Base {...p}><path d="M12 3 19 5.8v5.4c0 4.3-3 8.3-7 9.8-4-1.5-7-5.5-7-9.8V5.8L12 3Zm0 6v6m-3-3h6" /></Base>
);
export const BanIcon = (p: IconProps) => (
  <Base {...p}><circle cx="12" cy="12" r="8.5" /><path d="m6 6 12 12" /></Base>
);
export const FishIcon = (p: IconProps) => (
  <Base {...p}><path d="M3 12c3-4.5 9-6 14-2l4-3v10l-4-3c-5 4-11 2.5-14-2Z" /><circle cx="8" cy="11" r=".6" fill="currentColor" /></Base>
);
export const SunIcon = (p: IconProps) => (
  <Base {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></Base>
);
export const WaveIcon = (p: IconProps) => (
  <Base {...p}><path d="M2 8c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 14c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 20c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2" /></Base>
);
export const SparkleIcon = (p: IconProps) => (
  <Base {...p}><path d="M12 3v4m0 10v4M3 12h4m10 0h4M6 6l2.5 2.5m7 7L18 18M18 6l-2.5 2.5m-7 7L6 18" /></Base>
);
export const TruckIcon = (p: IconProps) => (
  <Base {...p}><path d="M3 6h11v10H3zM14 9h4l3 3v4h-7M7.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm10 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" /></Base>
);
