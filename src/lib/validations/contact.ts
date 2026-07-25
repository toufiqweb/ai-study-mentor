import { z } from "zod";

const DISPOSABLE_EMAIL_DOMAINS = new Set([
  "mailinator.com",
  "tempmail.com",
  "temp-mail.org",
  "guerrillamail.com",
  "10minutemail.com",
  "trashmail.com",
  "dispostable.com",
  "yopmail.com",
  "getnada.com",
  "throwawaymail.com",
  "maildrop.cc",
  "sharklasers.com",
  "guerrillamailblock.com",
]);

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(60, "Name cannot exceed 60 characters")
    .refine((val) => !/(https?:\/\/|www\.)/i.test(val), "Name cannot contain URLs or links"),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .refine((val) => {
      const domain = val.split("@")[1]?.toLowerCase();
      return domain ? !DISPOSABLE_EMAIL_DOMAINS.has(domain) : true;
    }, "Disposable or temporary email addresses are not allowed"),

  subject: z
    .string()
    .trim()
    .min(3, "Subject must be at least 3 characters")
    .max(100, "Subject cannot exceed 100 characters")
    .refine((val) => !/(https?:\/\/|www\.|\.ru|\.cn|\.xyz|\.top)/i.test(val), "Subject cannot contain website links or suspicious domains"),

  message: z
    .string()
    .trim()
    .min(15, "Message must be at least 15 characters long")
    .max(1000, "Message cannot exceed 1000 characters")
    .refine((val) => {
      const urls = val.match(/https?:\/\/[^\s]+/gi);
      return !urls || urls.length <= 1;
    }, "Message cannot contain more than 1 website link")
    .refine(
      (val) => !/(casino|poker|viagra|cialis|crypto investment|fast cash|t\.me\/|telegram\.me\/|whatsapp group)/i.test(val),
      "Message contains restricted spam content"
    )
    .refine((val) => !/(.)\1{8,}/i.test(val), "Message contains invalid repeated character sequences"),

  // Honeypot field (hidden from real users, populated by automated bots)
  hp_field: z.string().optional(),

  // Timestamp field to measure human interaction speed
  _timestamp: z.number().optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
