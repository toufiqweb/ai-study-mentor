import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";

export default function CTA() {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <AnimatedSection>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gray-900 px-8 py-16 text-center sm:px-16">
            <div
              className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-(--primary) opacity-30 blur-3xl"
              aria-hidden
            />
            <div
              className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-(--secondary) opacity-30 blur-3xl"
              aria-hidden
            />
            <div className="relative">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Ready to study smarter?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-gray-300">
                Create your first learning goal and get a personalized AI study plan in minutes.
              </p>
              <Link
                href="/register"
                className="group mt-9 inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-sm font-bold text-gray-900 shadow-xl transition-all hover:bg-gray-100"
              >
                Start Learning Free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
