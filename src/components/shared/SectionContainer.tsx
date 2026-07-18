import type { ReactNode } from "react";

export default function SectionContainer({
  id,
  className = "",
  containerClassName = "max-w-6xl",
  children,
}: {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={className}>
      <div className={`container mx-auto px-4 ${containerClassName}`}>{children}</div>
    </section>
  );
}
