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
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionContainer from "@/components/shared/SectionContainer";
import SectionTitle from "@/components/shared/SectionTitle";
import SectionDescription from "@/components/shared/SectionDescription";

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
    <SectionContainer id="learning-categories" className="bg-(--background) py-24">
      <AnimatedSection className="mx-auto max-w-2xl text-center">
        <SectionTitle eyebrow="Learning Categories" eyebrowClassName="text-(--secondary)">
          Set a goal in any subject
        </SectionTitle>
        <SectionDescription>
          Your AI mentor builds a roadmap for whatever you&apos;re learning.
        </SectionDescription>
      </AnimatedSection>

      <div className="mt-16 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((category, i) => (
          <AnimatedSection key={category.name} delay={i * 0.05}>
            <div className="group flex h-full flex-col items-center gap-4 rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-(--ternary)/20 hover:shadow-xl">
              <div className="rounded-2xl bg-(--ternary)/10 p-3.5 transition-colors group-hover:bg-(--ternary)/15">
                <category.icon className="h-6 w-6 text-(--ternary)" />
              </div>
              <p className="text-sm font-bold text-(--primary)">{category.name}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </SectionContainer>
  );
}
