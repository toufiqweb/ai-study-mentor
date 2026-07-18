"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Sparkles, Target, TrendingUp } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-20 pb-24 sm:pt-28 sm:pb-32">
      <div
        className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-(--primary) opacity-20 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute top-10 -right-24 h-96 w-96 rounded-full bg-(--secondary) opacity-20 blur-3xl"
        aria-hidden
      />

      <div className="container relative mx-auto grid max-w-6xl gap-16 px-4 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-(--primary)/20 bg-(--primary)/5 px-4 py-1.5 text-sm font-medium text-(--primary)">
            <Sparkles className="h-4 w-4" />
            AI-Powered Learning
          </span>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Become a Better Learner with Your{" "}
            <span className="bg-linear-to-r from-(--primary) to-(--secondary) bg-clip-text text-transparent">
              Personal AI Study Mentor
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
            Generate personalized study plans, track progress, and get AI guidance every day.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/register"
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-(--primary) px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-(--primary)/30 transition-all hover:bg-(--secondary) hover:shadow-xl"
            >
              Start Learning
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/explore-roadmaps"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-gray-200 bg-white px-7 py-3.5 text-sm font-bold text-gray-700 transition-all hover:border-(--primary)/30 hover:text-(--primary)"
            >
              <Compass className="h-4 w-4" />
              Explore Roadmaps
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-8 text-sm text-gray-500">
            <div>
              <p className="text-2xl font-extrabold text-gray-900">12k+</p>
              <p>Active learners</p>
            </div>
            <div className="h-8 w-px bg-gray-200" />
            <div>
              <p className="text-2xl font-extrabold text-gray-900">45k+</p>
              <p>Study plans generated</p>
            </div>
            <div className="h-8 w-px bg-gray-200" />
            <div>
              <p className="text-2xl font-extrabold text-gray-900">94%</p>
              <p>Goal completion rate</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="rounded-3xl border border-gray-100 bg-white/80 p-6 shadow-2xl shadow-gray-300/40 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-900">Your Study Plan</p>
              <span className="rounded-full bg-(--ternary)/10 px-3 py-1 text-xs font-bold text-(--ternary)">
                On Track
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {[
                { label: "React Hooks Deep Dive", pct: 100 },
                { label: "State Management Patterns", pct: 70 },
                { label: "Server Components", pct: 30 },
              ].map((task) => (
                <div key={task.label}>
                  <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-gray-600">
                    <span>{task.label}</span>
                    <span>{task.pct}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-linear-to-r from-(--primary) to-(--secondary)"
                      style={{ width: `${task.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -left-8 flex items-center gap-2 rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-xl"
          >
            <div className="rounded-xl bg-(--primary)/10 p-2">
              <Target className="h-4 w-4 text-(--primary)" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">Goal Deadline</p>
              <p className="text-[11px] text-gray-500">14 days left</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -right-6 flex items-center gap-2 rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-xl"
          >
            <div className="rounded-xl bg-(--ternary)/10 p-2">
              <TrendingUp className="h-4 w-4 text-(--ternary)" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">Weekly Progress</p>
              <p className="text-[11px] text-gray-500">+18% this week</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
