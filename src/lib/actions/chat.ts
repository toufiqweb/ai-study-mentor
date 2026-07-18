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
): Promise<{ userMessage: ChatMessage; assistantMessage: ChatMessage }> => {
  const res = await serverMutation<{
    success: boolean;
    data: { userMessage: ChatMessage; assistantMessage: ChatMessage };
  }>(`/api/chat/${goalId}`, { message }, "POST");
  return res.data;
};
