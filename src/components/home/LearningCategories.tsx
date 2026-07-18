import {
  Code2,
  BrainCog,
  Languages,
  Sigma,
  Palette,
  Briefcase,
  GraduationCap,
  FlaskConical,
} from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const categories = [
  { icon: Code2, name: "Programming & Web Dev" },
  { icon: BrainCog, name: "Data Science & AI" },
  { icon: Languages, name: "Languages" },
  { icon: Sigma, name: "Mathematics" },
  { icon: Palette, name: "Design" },
  { icon: Briefcase, name: "Business & Finance" },
  { icon: GraduationCap, name: "Test Prep" },
  { icon: FlaskConical, name: "Science" },
];

export default function LearningCategories() {
  return (
    <section id="learning-categories" className="bg-gray-50 py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-(--ternary)">
            Learning Categories
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Set a goal in any subject
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Your AI mentor builds a roadmap for whatever you&apos;re learning.
          </p>
        </AnimatedSection>

        <div className="mt-16 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((category, i) => (
            <AnimatedSection key={category.name} delay={i * 0.05}>
              <div className="group flex h-full flex-col items-center gap-4 rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-(--primary)/20 hover:shadow-xl">
                <div className="rounded-2xl bg-(--primary)/10 p-3.5 transition-colors group-hover:bg-(--primary)/15">
                  <category.icon className="h-6 w-6 text-(--primary)" />
                </div>
                <p className="text-sm font-bold text-gray-900">{category.name}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
