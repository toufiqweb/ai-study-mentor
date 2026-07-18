import { Users, FileText, Clock, Trophy } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const stats = [
  { icon: Users, value: "12,000+", label: "Active learners" },
  { icon: FileText, value: "45,000+", label: "Study plans generated" },
  { icon: Clock, value: "1.2M+", label: "Study hours tracked" },
  { icon: Trophy, value: "94%", label: "Goal completion rate" },
];

export default function StudentStats() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-(--primary) to-(--secondary) py-24">
      <div className="container relative mx-auto max-w-6xl px-4">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-white/70">
            Student Statistics
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Trusted by learners everywhere
          </h2>
        </AnimatedSection>

        <div className="mt-16 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <AnimatedSection key={stat.label} delay={i * 0.08}>
              <div className="rounded-3xl border border-white/15 bg-white/10 p-8 text-center backdrop-blur-sm">
                <div className="mx-auto inline-flex rounded-2xl bg-white/15 p-3">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <p className="mt-4 text-3xl font-extrabold text-white">{stat.value}</p>
                <p className="mt-1 text-sm text-white/80">{stat.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
