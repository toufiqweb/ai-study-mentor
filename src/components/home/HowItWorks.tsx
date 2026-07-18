import { Target, Sparkles, MessagesSquare, TrendingUp } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionContainer from "@/components/shared/SectionContainer";
import SectionTitle from "@/components/shared/SectionTitle";

const steps = [
  {
    icon: Target,
    title: "Set Your Learning Goal",
    description:
      "Tell us what you want to learn, your current skill level, daily study hours, and deadline.",
  },
  {
    icon: Sparkles,
    title: "Get Your AI Study Plan",
    description:
      "Receive a personalized roadmap with daily tasks, weekly milestones, and resources.",
  },
  {
    icon: MessagesSquare,
    title: "Study With Your AI Mentor",
    description:
      "Chat anytime for explanations tailored to your plan, your level, and your weak topics.",
  },
  {
    icon: TrendingUp,
    title: "Track & Improve",
    description:
      "Watch your progress on your dashboard and let the AI adjust your plan as you go.",
  },
];

export default function HowItWorks() {
  return (
    <SectionContainer id="how-it-works" className="bg-white py-24">
      <AnimatedSection className="mx-auto max-w-2xl text-center">
        <SectionTitle eyebrow="How It Works" eyebrowClassName="text-(--secondary)">
          From goal to mastery in four steps
        </SectionTitle>
      </AnimatedSection>

      <div className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="absolute top-8 right-0 left-0 hidden h-px bg-gray-200 lg:block" aria-hidden />
        {steps.map((step, i) => (
          <AnimatedSection key={step.title} delay={i * 0.1} className="relative text-center">
            <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-(--ternary) to-(--secondary) shadow-lg shadow-(--ternary)/20">
              <step.icon className="h-7 w-7 text-white" />
            </div>
            <span className="mx-auto mt-4 flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white">
              {i + 1}
            </span>
            <h3 className="mt-3 text-base font-bold text-gray-900">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">{step.description}</p>
          </AnimatedSection>
        ))}
      </div>
    </SectionContainer>
  );
}
