"use server";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { protectedFetch } from "../core/server";

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  _id: string;
  goalId: string;
  userId: string;
  role: ChatRole;
  content: string;
  createdAt: string;
};

/**
 * Protected fetch to get the conversation history for a goal's AI mentor chat.
 */
export const getChatHistory = async (goalId: string): Promise<ChatMessage[]> => {
  try {
    const res = await protectedFetch<{ success: boolean; data: ChatMessage[] }>(
      `/api/chat/${goalId}`,
      {},
      { cache: "no-store" }
    );
    return res.data;
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return [];
  }
};
