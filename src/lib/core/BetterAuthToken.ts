import { headers } from "next/headers";
import { auth } from "../auth";

/**
 * Retrieves the BetterAuth token from the server-side headers.
 * This should ONLY be used in server components or server actions.
 */
export const getTokenServer = async (): Promise<string | null> => {
  try {
    const { token } = await auth.api.getToken({
      headers: await headers(),
    });

    return token || null;
  } catch (error) {
    console.error("Error retrieving auth token on server:", error);
    return null;
  }
};
