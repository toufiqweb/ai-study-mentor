import { ChevronDown } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";

const faqs = [
  {
    question: "How does the AI create my study plan?",
    answer:
      "It looks at your goal, current skill level, daily study hours, deadline, and weak topics, then generates a daily routine, weekly roadmap, and monthly milestones tailored to you.",
  },
  {
    question: "Does the AI mentor remember my previous conversations?",
    answer:
      "Yes. Chat is context-aware — it knows your current goal, roadmap, weak topics, and everything you've discussed before, so you don't have to repeat yourself.",
  },
  {
    question: "Can I change my study plan after I create it?",
    answer:
      "Yes. You can update your goal, deadline, or study hours at any time and the AI will regenerate your roadmap to match.",
  },
  {
    question: "Which subjects are supported?",
    answer:
      "Any subject — programming, languages, mathematics, design, business, test prep, and more. You're not limited to a fixed category list.",
  },
  {
    question: "Do I need to pay to use AI Study Mentor?",
    answer:
      "You can create an account and start generating study plans for free. Pricing details will be announced as the platform grows.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="bg-gray-50 py-24">
      <div className="container mx-auto max-w-3xl px-4">
        <AnimatedSection className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-(--secondary)">FAQ</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Frequently asked questions
          </h2>
        </AnimatedSection>

        <div className="mt-12 space-y-4">
          {faqs.map((faq, i) => (
            <AnimatedSection key={faq.question} delay={i * 0.05}>
              <details className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm open:shadow-md">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-sm font-bold text-gray-900">
                  {faq.question}
                  <ChevronDown className="h-4 w-4 shrink-0 text-gray-400 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-6 text-gray-600">{faq.answer}</p>
              </details>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
