import {
  BrainCircuit,
  LineChart,
  MessageCircleMore,
  Radar,
  CalendarClock,
  BookOpenCheck,
} from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";

const features = [
  {
    icon: BrainCircuit,
    title: "Personalized Study Roadmaps",
    description:
      "The AI analyzes your goal, current skill level, and deadline to build a day-by-day plan made for you.",
  },
  {
    icon: MessageCircleMore,
    title: "Context-Aware AI Mentor Chat",
    description:
      "Ask questions anytime. Your mentor remembers your goals, weak topics, and past conversations.",
  },
  {
    icon: LineChart,
    title: "Smart Progress Tracking",
    description:
      "Visualize study hours, completed tasks, and goal progress with clear, real-time charts.",
  },
  {
    icon: Radar,
    title: "Weak Topic Detection",
    description:
      "Struggling with something? The AI flags weak topics and adjusts your plan to reinforce them.",
  },
  {
    icon: CalendarClock,
    title: "Daily & Weekly Structure",
    description:
      "Get a daily routine, weekly roadmap, and monthly milestones so you always know what's next.",
  },
  {
    icon: BookOpenCheck,
    title: "Built for Any Subject",
    description:
      "From programming to languages to exam prep — set any goal and get a plan tailored to it.",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-gray-50 py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-(--primary)">
            Features
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to study smarter
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            AI Study Mentor combines planning, tracking, and guidance into one focused experience.
          </p>
        </AnimatedSection>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <AnimatedSection key={feature.title} delay={i * 0.08}>
              <div className="h-full rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="inline-flex rounded-2xl bg-linear-to-br from-(--primary) to-(--secondary) p-3">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">{feature.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
