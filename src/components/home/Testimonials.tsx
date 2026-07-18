import { Star } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

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

export default function Testimonials() {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-(--primary)">
            Testimonials
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Loved by students building real skills
          </h2>
        </AnimatedSection>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <AnimatedSection key={t.name} delay={i * 0.1}>
              <figure className="flex h-full flex-col rounded-3xl border border-gray-100 bg-gray-50 p-8 shadow-sm">
                <div className="flex gap-1 text-(--ternary)">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-6 text-gray-700">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-(--primary) to-(--secondary) text-sm font-bold text-white">
                    {t.initials}
                  </div>
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
    </section>
  );
}
