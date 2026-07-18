import { Star, Quote } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionContainer from "@/components/shared/SectionContainer";
import SectionTitle from "@/components/shared/SectionTitle";

const testimonials = [
  {
    name: "Amara Okafor",
    role: "Learning JavaScript & React",
    quote:
      "My AI mentor broke React down into a plan I could actually follow. I finally understand hooks instead of just copying tutorials.",
    initials: "AO",
  },
  {
    name: "Daniel Kim",
    role: "Preparing for GRE",
    quote:
      "The daily routine kept me consistent for the first time. It noticed I was weak on quant and adjusted my schedule automatically.",
    initials: "DK",
  },
  {
    name: "Priya Nair",
    role: "Learning UI/UX Design",
    quote:
      "I like that I can ask the chat follow-up questions and it remembers what I already learned. It feels like a real tutor.",
    initials: "PN",
  },
];

function StarRow() {
  return (
    <div className="flex gap-1 text-(--ternary)">
      {Array.from({ length: 5 }).map((_, idx) => (
        <Star key={idx} className="h-4 w-4 fill-current" />
      ))}
    </div>
  );
}

function Avatar({ initials, size = "md" }: { initials: string; size?: "md" | "lg" }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-linear-to-br from-(--ternary) to-(--secondary) font-bold text-white ${
        size === "lg" ? "h-12 w-12 text-base" : "h-10 w-10 text-sm"
      }`}
    >
      {initials}
    </div>
  );
}

export default function Testimonials() {
  const [featured, ...rest] = testimonials;

  return (
    <SectionContainer className="bg-gray-50 py-24">
      <AnimatedSection className="mx-auto max-w-2xl text-center">
        <SectionTitle eyebrow="Testimonials">Loved by students building real skills</SectionTitle>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-sm text-gray-500">
          <StarRow />
          <span className="font-bold text-gray-900">4.9/5</span>
          <span>from students learning with AI Study Mentor</span>
        </div>
      </AnimatedSection>

      <div className="mt-14 grid gap-6 lg:grid-cols-5">
        <AnimatedSection className="lg:col-span-3">
          <figure className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-sm sm:p-10">
            <Quote className="absolute top-6 right-6 h-20 w-20 text-gray-50" strokeWidth={1} aria-hidden />
            <div className="relative flex h-full flex-col">
              <StarRow />
              <blockquote className="mt-5 flex-1 text-xl leading-8 font-medium text-gray-900 sm:text-2xl">
                &ldquo;{featured.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3">
                <Avatar initials={featured.initials} size="lg" />
                <div>
                  <p className="text-sm font-bold text-gray-900">{featured.name}</p>
                  <p className="text-xs text-gray-500">{featured.role}</p>
                </div>
              </figcaption>
            </div>
          </figure>
        </AnimatedSection>

        <div className="flex flex-col gap-6 lg:col-span-2">
          {rest.map((t, i) => (
            <AnimatedSection key={t.name} delay={(i + 1) * 0.1} className="flex flex-1">
              <figure className="flex h-full flex-1 flex-col rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                <StarRow />
                <blockquote className="mt-3 flex-1 text-sm leading-6 text-gray-700">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <Avatar initials={t.initials} />
                  <div>
                    <p className="text-sm font-bold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
