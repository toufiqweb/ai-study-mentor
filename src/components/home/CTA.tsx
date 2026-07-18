import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionContainer from "@/components/shared/SectionContainer";

const trustPoints = ["Free to start", "No credit card required", "Cancel anytime"];

export default function CTA() {
  return (
    <SectionContainer className="bg-white py-24">
      <AnimatedSection>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gray-900 px-8 py-20 text-center ring-1 ring-white/10 sm:px-16">
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "44px 44px",
              maskImage: "radial-gradient(ellipse at center, black 0%, transparent 75%)",
            }}
            aria-hidden
          />
          <div
            className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-(--ternary) opacity-40 blur-[100px]"
            aria-hidden
          />
          <div
            className="absolute -right-24 -bottom-24 h-80 w-80 rounded-full bg-(--secondary) opacity-40 blur-[100px]"
            aria-hidden
          />

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold tracking-wide text-white/80 uppercase">
              <Sparkles className="h-3.5 w-3.5 text-(--ternary)" />
              Start your journey today
            </span>

            <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Ready to study smarter?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-7 text-gray-400">
              Create your first learning goal and get a personalized AI study plan in minutes.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/register"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-sm font-bold text-gray-900 shadow-xl transition-all hover:bg-gray-100 sm:w-auto"
              >
                Start Learning Free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/explore-roadmaps"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-white/10 sm:w-auto"
              >
                Explore Roadmaps
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {trustPoints.map((point) => (
                <span key={point} className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                  <CheckCircle2 className="h-3.5 w-3.5 text-(--ternary)" />
                  {point}
                </span>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>
    </SectionContainer>
  );
}
