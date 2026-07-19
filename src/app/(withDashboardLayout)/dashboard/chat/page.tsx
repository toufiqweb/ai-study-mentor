"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Send, Sparkles, GraduationCap, Loader2, PlusCircle } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMyGoals } from "@/lib/api/goals";
import type { Goal } from "@/lib/actions/goals";
import { getChatHistory } from "@/lib/api/chat";
import type { ChatMessage } from "@/lib/api/chat";
import { sendChatMessageAction } from "@/lib/actions/chat";
import TypingIndicator from "@/components/dashboard/TypingIndicator";

export default function AIChatPage() {
  const searchParams = useSearchParams();
  const requestedGoalId = searchParams.get("goalId");
  const queryClient = useQueryClient();

  const [selectedGoalId, setSelectedGoalId] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fetch Goals list
  const { data: goals = [], isLoading: isLoadingGoals, error: goalsError } = useQuery({
    queryKey: ["goals"],
    queryFn: getMyGoals,
    enabled: typeof window !== "undefined",
  });

  // Pre-select active goal
  useEffect(() => {
    if (goals.length > 0 && !selectedGoalId) {
      const preselected = requestedGoalId && goals.some((g) => g._id === requestedGoalId);
      setSelectedGoalId(preselected ? (requestedGoalId as string) : goals[0]._id);
    }
  }, [goals, requestedGoalId, selectedGoalId]);

  // Fetch Chat History
  const { data: serverMessages = [], isLoading: isLoadingHistory, error: historyError } = useQuery({
    queryKey: ["chatHistory", selectedGoalId],
    queryFn: () => getChatHistory(selectedGoalId),
    enabled: !!selectedGoalId && typeof window !== "undefined",
  });

  // Copy query history to state for optimistic updates
  useEffect(() => {
    if (serverMessages.length > 0) {
      setMessages(serverMessages);
    } else {
      setMessages([]);
    }
  }, [serverMessages]);

  // Display errors if querying fails
  useEffect(() => {
    const err = goalsError || historyError;
    if (err) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to load chat parameters.");
    }
  }, [goalsError, historyError]);

  // Send Message Mutation with optimistic update
  const sendMutation = useMutation({
    mutationFn: async (text: string) => {
      const res = await sendChatMessageAction(selectedGoalId, text);
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
    onMutate: async (text: string) => {
      const optimisticUserMessage: ChatMessage = {
        _id: `pending-${crypto.randomUUID()}`,
        goalId: selectedGoalId,
        userId: "",
        role: "user",
        content: text.trim(),
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, optimisticUserMessage]);
      setInput("");
      setErrorMsg("");
    },
    onSuccess: (data) => {
      if (data?.assistantMessage) {
        setMessages((prev) => {
          const cleanHistory = prev.filter(m => !m._id.startsWith("pending-"));
          const userMsg = {
            _id: data.userMessage._id,
            goalId: selectedGoalId,
            userId: "",
            role: "user" as const,
            content: data.userMessage.content,
            createdAt: data.userMessage.createdAt,
          };
          return [...cleanHistory, userMsg, data.assistantMessage];
        });
        queryClient.invalidateQueries({ queryKey: ["chatHistory", selectedGoalId] });
      }
    },
    onError: (err) => {
      setErrorMsg(err instanceof Error ? err.message : "Failed to get a response from your AI mentor.");
      setMessages((prev) => prev.filter(m => !m._id.startsWith("pending-")));
    }
  });

  const isTyping = sendMutation.isPending;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const selectedGoal = goals.find((g) => g._id === selectedGoalId);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || !selectedGoalId || isTyping) return;
    sendMutation.mutate(trimmed);
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
        <Loader2 className="h-8 w-8 animate-spin text-(--ternary)" />
      </div>
    );
  }

  if (goals.length === 0) {
    return (
      <div className="flex h-[calc(100vh-8rem)] flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-(--ternary)/10 text-(--ternary)">
          <GraduationCap className="h-7 w-7" />
        </div>
        <h3 className="mt-4 text-base font-bold text-gray-900">No goals to chat about yet</h3>
        <p className="mt-1 max-w-sm text-sm text-gray-500">
          Create a learning goal first — your AI mentor uses it to tailor every answer.
        </p>
        <Link
          href="/dashboard/goals/create"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-(--ternary) px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
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
          <div className="rounded-xl bg-(--ternary)/10 p-2">
            <GraduationCap className="h-5 w-5 text-(--ternary)" />
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
            <Loader2 className="h-6 w-6 animate-spin text-(--ternary)" />
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
              className="inline-flex items-center gap-1.5 rounded-full border border-(--ternary)/20 bg-(--ternary)/5 px-3 py-1.5 text-xs font-medium text-(--ternary) hover:bg-(--ternary)/10 disabled:opacity-50"
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
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-(--ternary) text-white transition-colors hover:bg-blue-700 disabled:opacity-40"
            aria-label="Send message"
          >
            {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </button>
        </form>
      </div>
    </div>
  );
}
