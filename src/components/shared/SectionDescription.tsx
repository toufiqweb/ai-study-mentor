import type { ReactNode } from "react";

export default function SectionDescription({
  className = "mt-4 text-lg text-gray-600",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <p className={className}>{children}</p>;
}
