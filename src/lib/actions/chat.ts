"use server";

import { serverMutation } from "../core/server";
import type { ChatMessage } from "../api/chat";

/**
 * Sends a message to the AI mentor for a given goal and returns the persisted
 * user message + the AI's reply. Context (goal, roadmap, weak topics, history)
 * is assembled server-side from the goal's id.
 */
export const sendChatMessageAction = async (
  goalId: string,
  message: string
): Promise<
  | { success: true; data: { userMessage: ChatMessage; assistantMessage: ChatMessage } }
  | { success: false; error: string }
> => {
  try {
    const res = await serverMutation<{
      success: boolean;
      data: { userMessage: ChatMessage; assistantMessage: ChatMessage };
    }>(`/api/chat/${goalId}`, { message }, "POST");
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send message.",
    };
  }
};
