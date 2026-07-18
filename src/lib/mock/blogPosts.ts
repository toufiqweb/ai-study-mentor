import type { LucideIcon } from "lucide-react";
import { BookOpen, Brain, Timer, Languages, Code2, GraduationCap } from "lucide-react";

export type BlogPost = {
  id: string;
  title: string;
  category: string;
  readingTime: string;
  icon: LucideIcon;
  excerpt: string;
  body: string[];
};

export const blogPosts: BlogPost[] = [
  {
    id: "study-routine-that-sticks",
    title: "How to Build a Study Routine That Actually Sticks",
    category: "Study Tips",
    readingTime: "6 min read",
    icon: BookOpen,
    excerpt:
      "Most study routines fail in the first week. Here's why small, specific daily habits beat ambitious weekly plans.",
    body: [
      "Most study routines fail in the first week — not because the learner lacks motivation, but because the plan asks for too much decision-making every day. \"Study React for two hours\" is a goal, not a routine. A routine is something you can do on autopilot, even on a bad day.",
      "The fix is to shrink the routine until it's almost too easy to skip. Instead of \"study for two hours,\" try \"open the editor and rebuild yesterday's example from memory.\" Once you're in motion, momentum usually carries you past the original five-minute target.",
      "This is exactly why AI Study Mentor breaks every goal into a daily routine instead of a single big milestone — a specific 20-minute task is something you can actually start at 9pm when you're tired, and starting is the whole battle.",
    ],
  },
  {
    id: "context-aware-ai-tutors",
    title: "Why Context-Aware AI Makes Better Tutors",
    category: "AI & Learning",
    readingTime: "7 min read",
    icon: Brain,
    excerpt:
      "A generic chatbot answers your question. A context-aware mentor remembers what you're actually struggling with.",
    body: [
      "Ask a generic AI chatbot to explain recursion and you'll get a solid, textbook-quality answer. Ask it again tomorrow and it has no idea you already asked, no idea you're still confused about the base case, and no idea you're doing this to prepare for a specific coding interview in three weeks.",
      "Context is what turns an answer into tutoring. A mentor that knows your current goal, your skill level, and what you got stuck on last time can skip the parts you already understand and go straight to the part that's actually blocking you.",
      "That's the core idea behind AI Study Mentor's chat: every conversation carries your goal, your roadmap, and your weak topics into the context, so \"can you explain that more simply\" gets a genuinely simpler explanation, not a repeat of the same paragraph.",
    ],
  },
  {
    id: "pomodoro-for-deep-learning",
    title: "The Pomodoro Technique, Adapted for Deep Learning",
    category: "Productivity",
    readingTime: "5 min read",
    icon: Timer,
    excerpt:
      "25-minute sprints work great for admin tasks. Learning something hard needs a slightly different rhythm.",
    body: [
      "The classic Pomodoro technique — 25 minutes of focus, 5 minutes of rest — was designed for tasks you already know how to do. Learning something genuinely new is different: the first 10 minutes are often just your brain loading context back in.",
      "For deep learning sessions, a 40/10 split tends to work better: enough time to get past the warm-up phase and into real focus, with a longer break to actually let the information settle instead of just switching tabs.",
      "Whatever rhythm you use, the important part is protecting the block from interruptions entirely — no notifications, no \"quick\" messages. Your daily study routine only works if the daily block is actually uninterrupted.",
    ],
  },
  {
    id: "20-minutes-a-day-language",
    title: "Learning a Language With Just 20 Minutes a Day",
    category: "Language Learning",
    readingTime: "6 min read",
    icon: Languages,
    excerpt:
      "Consistency beats intensity. Twenty focused minutes a day will outpace a single three-hour weekend cram session.",
    body: [
      "Language learning is one of the clearest cases where consistency beats intensity. Your brain needs repeated, spaced exposure to actually move vocabulary and grammar into long-term memory — a single three-hour Saturday session mostly evaporates by Tuesday.",
      "Twenty minutes a day, split between active practice (speaking or writing) and passive exposure (listening), gives your brain the repeated touches it needs without requiring the kind of willpower that burns out after two weeks.",
      "If you're just starting out, resist the urge to front-load grammar rules. Learn enough vocabulary to describe your actual day, then let grammar patterns emerge from real sentences instead of memorizing conjugation tables in isolation.",
    ],
  },
  {
    id: "tutorial-hell-to-real-projects",
    title: "From Tutorial Hell to Building Real Projects",
    category: "Programming",
    readingTime: "8 min read",
    icon: Code2,
    excerpt:
      "You've finished a dozen tutorials but freeze in front of a blank file. Here's the actual way out.",
    body: [
      "Tutorial hell has a specific signature: you can follow along with any video, but freeze the moment you're facing a blank file with no instructions. That's because tutorials optimize for a smooth viewing experience, not for the decision-making that real building requires.",
      "The way out is to rebuild something you just watched — from memory, with the video closed. You'll get stuck almost immediately, and that specific stuck moment is worth more than another hour of watching, because it shows you exactly which decision you couldn't make on your own.",
      "Repeat that a few times on small projects before attempting anything original. The goal isn't to avoid tutorials entirely — it's to always follow one up with an unaided rebuild before moving to the next topic.",
    ],
  },
  {
    id: "exam-prep-without-burnout",
    title: "How to Prepare for Standardized Tests Without Burning Out",
    category: "Exam Prep",
    readingTime: "6 min read",
    icon: GraduationCap,
    excerpt:
      "Long study windows fail for the same reason crash diets do. A sustainable test-prep plan looks different.",
    body: [
      "Standardized test prep often turns into months of low-grade dread, punctuated by the occasional panic-driven all-day cram session. That pattern feels productive but usually leaves you exhausted right when you need to be sharpest — test day.",
      "A sustainable plan front-loads foundational review, moves into focused weak-topic drilling, and only introduces full-length timed practice tests in the final few weeks, when pacing under pressure is genuinely the skill you're missing.",
      "Just as important: build in real rest days. A brain that's been running on fumes for a month does not perform better than a rested one that studied a bit less overall — treat recovery as part of the plan, not a reward for finishing it.",
    ],
  },
];
