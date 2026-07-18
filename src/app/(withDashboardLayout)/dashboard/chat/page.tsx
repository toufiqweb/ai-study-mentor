"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Sparkles, GraduationCap } from "lucide-react";
import { goals } from "@/lib/mock/goals";
import TypingIndicator from "@/components/dashboard/TypingIndicator";

type Message = { role: "user" | "assistant"; content: string };

const activeGoals = goals.filter((g) => g.status !== "completed");

function buildReply(question: string, goalTitle: string, weakTopics: string[]): string {
  const q = question.toLowerCase();
  if (q.includes("today") || q.includes("what should i study")) {
    return `For "${goalTitle}", I'd focus today's session on your weekly roadmap item and spend 15 minutes reviewing ${
      weakTopics[0] ?? "your last weak topic"
    }. Want me to break that into smaller steps?`;
  }
  if (q.includes("weak") || q.includes("quiz")) {
    return `Let's work on ${weakTopics[0] ?? "a weak topic"}. Quick check: can you explain it in your own words first? That tells me where to start.`;
  }
  if (q.includes("easier") || q.includes("simpler") || q.includes("example")) {
    return "Sure — let's use a simpler, more concrete example and build up from there. Tell me which part felt confusing and I'll re-explain just that piece.";
  }
  return `Good question about "${goalTitle}". Based on your roadmap and current level, here's how I'd approach it — want the short version or a deeper walkthrough?`;
}

export default function AIChatPage() {
  const [selectedGoalId, setSelectedGoalId] = useState(activeGoals[0]?.id ?? "");
  const selectedGoal = goals.find((g) => g.id === selectedGoalId) ?? goals[0];

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hi! I'm your AI mentor. I can see you're working on "${selectedGoal.title}" — ask me anything about your plan, or pick a suggested question below.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setIsTyping(true);
    // Simulated response — wire this up once POST /chat exists on the backend.
    await new Promise((resolve) => setTimeout(resolve, 1100));
    setIsTyping(false);
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: buildReply(text, selectedGoal.title, selectedGoal.weakTopics) },
    ]);
  };

  const suggestedQuestions = [
    "What should I study today?",
    `Can you quiz me on ${selectedGoal.weakTopics[0] ?? "a weak topic"}?`,
    "Can you explain it with an easier example?",
  ];

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="rounded-xl bg-(--primary)/10 p-2">
            <GraduationCap className="h-5 w-5 text-(--primary)" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">AI Mentor Chat</p>
            <p className="text-xs text-gray-400">Context-aware to your current goal</p>
          </div>
        </div>
        <select
          value={selectedGoalId}
          onChange={(e) => setSelectedGoalId(e.target.value)}
          className="h-9 rounded-xl border border-gray-200 bg-gray-50 px-3 text-xs font-semibold text-gray-700 focus:border-(--primary) focus:outline-none"
        >
          {goals.map((g) => (
            <option key={g.id} value={g.id}>
              Chatting about: {g.title}
            </option>
          ))}
        </select>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-lg rounded-2xl px-4 py-2.5 text-sm leading-6 ${
              msg.role === "user"
                ? "ml-auto bg-(--primary) text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {isTyping && <TypingIndicator />}
      </div>

      <div className="border-t border-gray-100 px-6 py-4">
        <div className="mb-3 flex flex-wrap gap-2">
          {suggestedQuestions.map((q) => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              className="inline-flex items-center gap-1.5 rounded-full border border-(--primary)/20 bg-(--primary)/5 px-3 py-1.5 text-xs font-medium text-(--primary) hover:bg-(--primary)/10"
            >
              <Sparkles className="h-3 w-3" />
              {q}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="flex items-center gap-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your AI mentor anything..."
            className="h-11 flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm focus:border-(--primary) focus:bg-white focus:outline-none focus:ring-1 focus:ring-(--primary)"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-(--primary) text-white transition-colors hover:bg-(--secondary) disabled:opacity-40"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
