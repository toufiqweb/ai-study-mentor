import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contact";
import { sendContactEmail } from "@/lib/nodemailer";

// In-memory rate limiting map (IP -> timestamps[])
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];

  // Remove expired timestamps
  const validTimestamps = timestamps.filter((time) => now - time < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return false;
}

export async function POST(req: NextRequest) {
  try {
    // 1. IP Rate Limiting
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "Spam protection: Too many submission attempts. Please wait 15 minutes before trying again.",
        },
        { status: 429 }
      );
    }

    const body = await req.json();

    // 2. Honeypot Spam Protection (Invisible input trap)
    if (body.hp_field && body.hp_field.trim() !== "") {
      console.warn(`[Spam Blocked] Honeypot field filled by bot from IP ${ip}`);
      // Return silent success response to avoid bot retries
      return NextResponse.json(
        { success: true, message: "Your message has been queued successfully." },
        { status: 200 }
      );
    }

    // 3. Minimum Human Submission Speed Check (3.5 seconds)
    if (body._timestamp && typeof body._timestamp === "number") {
      const durationMs = Date.now() - body._timestamp;
      if (durationMs < 3500) {
        console.warn(`[Spam Blocked] Bot script submitted in ${durationMs}ms from IP ${ip}`);
        return NextResponse.json(
          { success: true, message: "Your message has been queued successfully." },
          { status: 200 }
        );
      }
    }

    // 4. Server-Side Zod Validation
    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      return NextResponse.json(
        { success: false, error: "Form validation failed", details: fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = validationResult.data;

    // 5. Send Email via Nodemailer
    await sendContactEmail({ name, email, subject, message });

    return NextResponse.json(
      { success: true, message: "Your message has been sent successfully!" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in contact API route:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process message request." },
      { status: 500 }
    );
  }
}
