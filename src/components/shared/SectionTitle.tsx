import type { ReactNode } from "react";

export default function SectionTitle({
  eyebrow,
  eyebrowClassName = "text-(--primary)",
  as: Heading = "h2",
  titleClassName = "text-(--text-strong)",
  className = "",
  children,
}: {
  eyebrow?: ReactNode;
  eyebrowClassName?: string;
  as?: "h1" | "h2";
  titleClassName?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      {eyebrow && (
        <p className={`text-sm font-bold tracking-widest uppercase ${eyebrowClassName}`}>{eyebrow}</p>
      )}
      <Heading className={`mt-3 text-3xl font-extrabold tracking-tight leading-tight sm:text-4xl sm:leading-tight ${titleClassName}`}>
        {children}
      </Heading>
    </div>
  );
}
