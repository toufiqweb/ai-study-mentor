"use client";

import { Users, FileText, Clock, Trophy } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionContainer from "@/components/shared/SectionContainer";
import SectionTitle from "@/components/shared/SectionTitle";
import { motion } from "framer-motion";

const stats = [
  { icon: Users, value: "12,000+", label: "Active learners" },
  { icon: FileText, value: "45,000+", label: "Study plans generated" },
  { icon: Clock, value: "1.2M+", label: "Study hours tracked" },
  { icon: Trophy, value: "94%", label: "Goal completion rate" },
];

export default function StudentStats() {
  return (
    <SectionContainer
      className="bg-(--background) py-24 border-y border-gray-100"
      containerClassName="relative max-w-6xl"
    >
      <AnimatedSection className="mx-auto max-w-2xl text-center">
        <SectionTitle
          eyebrow="Student Statistics"
          eyebrowClassName="text-(--secondary)"
          titleClassName="text-(--primary)"
        >
          Trusted by learners everywhere
        </SectionTitle>
        <p className="mt-4 text-center text-sm text-(--secondary)">
          Join thousands of students who are already using AI Study Mentor to
          achieve their learning goals faster and more efficiently.
        </p>
      </AnimatedSection>

      <div className="mt-16 grid grid-cols-2 gap-6 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <AnimatedSection key={stat.label} delay={i * 0.1}>
            <motion.div
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-xs transition-shadow hover:shadow-xl"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-(--ternary)/10 text-(--ternary) transition-colors group-hover:bg-(--ternary)/20 group-hover:scale-110 duration-300">
                <stat.icon className="h-6 w-6" />
              </div>
              <p className="mt-6 text-4xl font-extrabold tracking-tight text-(--primary)">
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-medium text-(--secondary)">
                {stat.label}
              </p>
            </motion.div>
          </AnimatedSection>
        ))}
      </div>
    </SectionContainer>
  );
}
