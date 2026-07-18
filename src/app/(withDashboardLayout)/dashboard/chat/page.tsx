"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Send, Sparkles, GraduationCap, Loader2, PlusCircle } from "lucide-react";
import { getMyGoals } from "@/lib/api/goals";
import type { Goal } from "@/lib/actions/goals";
import { getChatHistory } from "@/lib/api/chat";
import type { ChatMessage } from "@/lib/api/chat";
import { sendChatMessageAction } from "@/lib/actions/chat";
import TypingIndicator from "@/components/dashboard/TypingIndicator";

export default function AIChatPage() {
  const searchParams = useSearchParams();
  const requestedGoalId = searchParams.get("goalId");

  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoadingGoals, setIsLoadingGoals] = useState(true);
  const [selectedGoalId, setSelectedGoalId] = useState("");

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    getMyGoals()
      .then((data) => {
        if (cancelled) return;
        setGoals(data);
        if (data.length > 0) {
          const preselected = requestedGoalId && data.some((g) => g._id === requestedGoalId);
          setSelectedGoalId(preselected ? (requestedGoalId as string) : data[0]._id);
          setIsLoadingHistory(true);
        }
      })
      .catch((err) => {
        if (!cancelled) setErrorMsg(err instanceof Error ? err.message : "Failed to load your goals.");
      })
      .finally(() => {
        if (!cancelled) setIsLoadingGoals(false);
      });

    return () => {
      cancelled = true;
    };
  }, [requestedGoalId]);

  useEffect(() => {
    if (!selectedGoalId) return;
    let cancelled = false;

    getChatHistory(selectedGoalId)
      .then((data) => {
        if (!cancelled) setMessages(data);
      })
      .catch((err) => {
        if (!cancelled) setErrorMsg(err instanceof Error ? err.message : "Failed to load chat history.");
      })
      .finally(() => {
        if (!cancelled) setIsLoadingHistory(false);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedGoalId]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const selectedGoal = goals.find((g) => g._id === selectedGoalId);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || !selectedGoalId || isTyping) return;

    const optimisticUserMessage: ChatMessage = {
      _id: `pending-${crypto.randomUUID()}`,
      goalId: selectedGoalId,
      userId: "",
      role: "user",
      content: trimmed,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, optimisticUserMessage]);
    setInput("");
    setIsTyping(true);
    setErrorMsg("");

    try {
      const { assistantMessage } = await sendChatMessageAction(selectedGoalId, trimmed);
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to get a response from your AI mentor.");
    } finally {
      setIsTyping(false);
    }
  };

  const suggestedQuestions = selectedGoal
    ? [
        "What should I study today?",
        `Can you quiz me on ${selectedGoal.weakTopics[0] ?? "a weak topic"}?`,
        "Can you explain it with an easier example?",
      ]
    : [];

  if (isLoadingGoals) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-(--primary)" />
      </div>
    );
  }

  if (goals.length === 0) {
    return (
      <div className="flex h-[calc(100vh-8rem)] flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-(--primary)/10 text-(--primary)">
          <GraduationCap className="h-7 w-7" />
        </div>
        <h3 className="mt-4 text-base font-bold text-gray-900">No goals to chat about yet</h3>
        <p className="mt-1 max-w-sm text-sm text-gray-500">
          Create a learning goal first — your AI mentor uses it to tailor every answer.
        </p>
        <Link
          href="/dashboard/goals/create"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-(--primary) px-5 py-2.5 text-sm font-bold text-white hover:bg-(--secondary)"
        >
          <PlusCircle className="h-4 w-4" />
          Create Goal
        </Link>
      </div>
    );
  }

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
          onChange={(e) => {
            setSelectedGoalId(e.target.value);
            setIsLoadingHistory(true);
          }}
          className="h-9 rounded-xl border border-gray-200 bg-gray-50 px-3 text-xs font-semibold text-gray-700 focus:border-(--primary) focus:outline-none"
        >
          {goals.map((g) => (
            <option key={g._id} value={g._id}>
              Chatting about: {g.title}
            </option>
          ))}
        </select>
      </div>

      {errorMsg && (
        <div className="mx-6 mt-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {errorMsg}
        </div>
      )}

      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
        {isLoadingHistory ? (
          <div className="flex h-full items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-(--primary)" />
          </div>
        ) : (
          <>
            {selectedGoal && messages.length === 0 && (
              <div className="max-w-lg rounded-2xl bg-gray-100 px-4 py-2.5 text-sm leading-6 text-gray-700">
                Hi! I&apos;m your AI mentor. I can see you&apos;re working on &ldquo;{selectedGoal.title}
                &rdquo; — ask me anything about your plan, or pick a suggested question below.
              </div>
            )}
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`max-w-lg rounded-2xl px-4 py-2.5 text-sm leading-6 ${
                  msg.role === "user" ? "ml-auto bg-(--primary) text-white" : "bg-gray-100 text-gray-700"
                }`}
              >
                {msg.content}
              </div>
            ))}
          </>
        )}
        {isTyping && <TypingIndicator />}
      </div>

      <div className="border-t border-gray-100 px-6 py-4">
        <div className="mb-3 flex flex-wrap gap-2">
          {suggestedQuestions.map((q) => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              disabled={isTyping}
              className="inline-flex items-center gap-1.5 rounded-full border border-(--primary)/20 bg-(--primary)/5 px-3 py-1.5 text-xs font-medium text-(--primary) hover:bg-(--primary)/10 disabled:opacity-50"
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
            disabled={isTyping}
            className="h-11 flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm focus:border-(--primary) focus:bg-white focus:outline-none focus:ring-1 focus:ring-(--primary) disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-(--primary) text-white transition-colors hover:bg-(--secondary) disabled:opacity-40"
            aria-label="Send message"
          >
            {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </button>
        </form>
      </div>
    </div>
  );
}
