import { Target, Eye, Sparkles, Brain, Compass, ShieldCheck } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionContainer from "@/components/shared/SectionContainer";
import SectionTitle from "@/components/shared/SectionTitle";
import SectionDescription from "@/components/shared/SectionDescription";

const highlights = [
  {
    icon: Brain,
    title: "Personalization over generic content",
    description:
      "Your study plan is built from your actual goal, current level, and schedule — not a one-size-fits-all course.",
  },
  {
    icon: Sparkles,
    title: "Context that carries over",
    description:
      "Your AI mentor remembers your progress and weak topics across every session, so you never have to repeat yourself.",
  },
  {
    icon: Compass,
    title: "Structure, not just information",
    description:
      "Daily routines and clear milestones instead of another overwhelming pile of links and resources.",
  },
  {
    icon: ShieldCheck,
    title: "Built for real learners",
    description: "No gimmicks and no gamified streak pressure — just a clear, honest path forward.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <SectionContainer className="bg-gray-50 py-20" containerClassName="max-w-4xl text-center">
        <SectionTitle as="h1" eyebrow="About">
          Personalized mentorship, for every learner
        </SectionTitle>
        <SectionDescription className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
          AI Study Mentor exists because structure and guidance shouldn&apos;t be a luxury only
          available to students who can afford a private tutor.
        </SectionDescription>
      </SectionContainer>

      <section className="bg-white py-20">
        <div className="container mx-auto grid max-w-5xl gap-8 px-4 md:grid-cols-2">
          <AnimatedSection className="rounded-3xl border border-gray-100 bg-gray-50 p-8">
            <div className="inline-flex rounded-2xl bg-(--ternary)/10 p-3">
              <Target className="h-6 w-6 text-(--ternary)" />
            </div>
            <h2 className="mt-5 text-xl font-bold text-gray-900">Our Mission</h2>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              To make one-on-one, personalized mentorship available to every learner. We believe the
              biggest barrier to learning isn&apos;t access to information — the internet already has
              more of that than anyone could use — it&apos;s the lack of a structured, personalized
              plan to make sense of it.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1} className="rounded-3xl border border-gray-100 bg-gray-50 p-8">
            <div className="inline-flex rounded-2xl bg-(--secondary)/10 p-3">
              <Eye className="h-6 w-6 text-(--secondary)" />
            </div>
            <h2 className="mt-5 text-xl font-bold text-gray-900">Our Vision</h2>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              A world where anyone, anywhere, can learn any skill with a mentor that actually knows
              them — their goals, their pace, their weak spots — and adapts the plan every single day
              instead of handing them a static syllabus.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <SectionContainer className="bg-gray-50 py-20">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <SectionTitle eyebrow="Why AI Study Mentor" eyebrowClassName="text-(--ternary)">
            What makes it different
          </SectionTitle>
        </AnimatedSection>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {highlights.map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 0.08}>
              <div className="flex h-full gap-4 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="inline-flex h-fit rounded-2xl bg-linear-to-br from-(--ternary) to-(--secondary) p-3">
                  <item.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-gray-600">{item.description}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </SectionContainer>
    </div>
  );
}
