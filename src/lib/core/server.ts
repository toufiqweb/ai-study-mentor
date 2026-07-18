import { redirect } from "next/navigation";
import { getTokenServer } from "./BetterAuthToken";

// Note: Do NOT use "use server" here. These are server-side utility functions, not Server Actions.
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

/**
 * Generates the Authorization header using the BetterAuth token.
 */
export const authHeader = async (): Promise<HeadersInit> => {
  const token = await getTokenServer();
  return token ? { authorization: `Bearer ${token}` } : {};
};

/**
 * Standardized status handler to intercept unauthorized requests
 * and normalize JSON parsing for the API layer.
 */
const handleStatus = async <T = unknown>(res: Response): Promise<T> => {
  if (res.status === 401) {
    redirect("/login");
  } else if (res.status === 403) {
    redirect("/404");
  }

  if (!res.ok) {
    let message = `Server error (${res.status})`;
    try {
      const body = await res.json();
      message = body?.message || body?.msg || message;
    } catch {
      // response body wasn't JSON — keep the default message
    }
    throw new Error(message);
  }

  // Return null for 204 No Content, otherwise parse JSON
  if (res.status === 204) return null as T;
  return res.json();
};

/**
 * Sends a mutation (POST, PUT, PATCH, DELETE) to the server.
 * Automatically attaches the Authorization header and handles standard JSON payloads.
 */
export const serverMutation = async <T = unknown>(
  path: string,
  data: unknown,
  method: "POST" | "PUT" | "PATCH" | "DELETE" = "POST",
  customHeaders: HeadersInit = {}
): Promise<T> => {
  const headers = await authHeader();

  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
      ...customHeaders,
    },
    body: JSON.stringify(data),
  });

  return handleStatus(res);
};

/**
 * Public GET request to the server. Does NOT attach Authorization headers.
 */
export const serverFetch = async <T = unknown>(
  path: string,
  customHeaders: HeadersInit = {},
  options: RequestInit = {}
): Promise<T> => {
  const res = await fetch(`${baseUrl}${path}`, {
    headers: {
      ...customHeaders,
    },
    ...options,
  });

  return handleStatus(res);
};

/**
 * Protected GET request to the server.
 * Automatically attaches the Authorization header.
 */
export const protectedFetch = async <T = unknown>(
  path: string,
  customHeaders: HeadersInit = {},
  options: RequestInit = {}
): Promise<T> => {
  const headers = await authHeader();

  const res = await fetch(`${baseUrl}${path}`, {
    headers: {
      ...headers,
      ...customHeaders,
    },
    ...options,
  });

  return handleStatus(res);
};
