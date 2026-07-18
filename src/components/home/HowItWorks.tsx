import { Target, Sparkles, MessagesSquare, TrendingUp } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

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
    <section id="how-it-works" className="bg-white py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-(--secondary)">
            How It Works
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            From goal to mastery in four steps
          </h2>
        </AnimatedSection>

        <div className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute top-8 right-0 left-0 hidden h-px bg-gray-200 lg:block" aria-hidden />
          {steps.map((step, i) => (
            <AnimatedSection key={step.title} delay={i * 0.1} className="relative text-center">
              <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-(--primary) to-(--secondary) shadow-lg shadow-(--primary)/20">
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
      </div>
    </section>
  );
}
