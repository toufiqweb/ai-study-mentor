"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, MessageCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionContainer from "@/components/shared/SectionContainer";
import SectionTitle from "@/components/shared/SectionTitle";

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

function FAQItem({
  index,
  question,
  answer,
  isOpen,
  onClick,
}: {
  index: number;
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`group overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
        isOpen
          ? "border-(--ternary)/30 shadow-[0_8px_24px_-8px_rgba(37,99,235,0.15)]"
          : "border-gray-100 hover:border-gray-200 hover:shadow-sm"
      }`}
    >
      <button
        onClick={onClick}
        aria-expanded={isOpen}
        className="flex w-full items-center gap-4 p-5 text-left focus:outline-none sm:p-6"
      >
        <span
          className={`hidden shrink-0 font-mono text-xs font-bold tabular-nums transition-colors sm:block ${
            isOpen ? "text-(--ternary)" : "text-gray-300"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className={`flex-1 text-base font-bold transition-colors ${
            isOpen ? "text-(--ternary)" : "text-(--primary)"
          }`}
        >
          {question}
        </span>
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
            isOpen
              ? "bg-(--ternary)/10 text-(--ternary)"
              : "bg-gray-50 text-gray-400 group-hover:bg-gray-100 group-hover:text-gray-600"
          }`}
        >
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-5 pb-5 text-sm leading-relaxed text-(--secondary) sm:px-6 sm:pb-6 sm:pl-16">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <SectionContainer id="faq" className="bg-(--background) py-24" containerClassName="max-w-6xl">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-16">
        <AnimatedSection className="lg:sticky lg:top-28 lg:self-start">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-(--secondary)/10">
            <HelpCircle className="h-6 w-6 text-(--secondary)" />
          </div>
          <SectionTitle eyebrow="FAQ" eyebrowClassName="text-(--secondary)" className="mt-6">
            Got questions?
            <br />
            We&apos;ve got answers
          </SectionTitle>
          <p className="mt-4 text-base leading-7 text-(--secondary)">
            Everything you need to know about AI Study Mentor and how it accelerates your learning.
          </p>

          <div className="mt-8 flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
              <MessageCircle className="h-4.5 w-4.5 text-(--ternary)" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-(--primary)">Still have questions?</p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 text-sm font-semibold text-(--ternary) hover:underline"
              >
                Contact our team
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </AnimatedSection>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <AnimatedSection key={faq.question} delay={i * 0.05}>
              <FAQItem
                index={i}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === i}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
