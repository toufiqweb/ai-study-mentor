"use client";

import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Send, Loader2, User, Mail, HelpCircle, MessageSquare, ShieldCheck, Sparkles } from "lucide-react";
import { contactSchema, ContactFormValues } from "@/lib/validations/contact";

export default function ContactForm() {
  const mountTime = useRef<number>(Date.now());

  const {
    register,
    handleSubmit,
    reset,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      hp_field: "",
    },
  });

  const watchMessage = watch("message", "");

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const payload = {
        ...data,
        _timestamp: mountTime.current,
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        if (result.details) {
          Object.keys(result.details).forEach((key) => {
            setError(key as keyof ContactFormValues, {
              type: "server",
              message: result.details[key]?.[0],
            });
          });
        }
        throw new Error(result.error || "Failed to send message. Please try again.");
      }

      toast.success("Message sent successfully!", {
        description: "Thank you for contacting AI Study Mentor. We will respond shortly.",
      });

      reset();
      mountTime.current = Date.now();
    } catch (err: any) {
      toast.error("Submission error", {
        description: err.message || "Something went wrong. Please check your inputs and try again.",
      });
    }
  };

  return (
    <div className="rounded-3xl border border-(--border-subtle) bg-(--surface) p-7 shadow-xl shadow-(--border-default)/40 md:p-9 lg:col-span-2">
      {/* Form Card Header */}
      <div className="mb-7 border-b border-(--border-subtle) pb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--accent-subtle) text-(--accent)">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-(--primary)">Send Us a Message</h2>
              <p className="text-xs text-(--secondary)">Fill out the details below and we&apos;ll get back to you shortly.</p>
            </div>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
        className="space-y-6"
      >
        {/* Invisible Honeypot Spam Trap */}
        <div className="absolute -left-[9999px] opacity-0 pointer-events-none" aria-hidden="true">
          <label htmlFor="hp_field">Do not fill this out</label>
          <input
            id="hp_field"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("hp_field")}
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {/* Name Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-(--text-body)" htmlFor="name">
              Your Name <span className="text-(--error)">*</span>
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-(--text-subtle)">
                <User className="h-4 w-4" />
              </div>
              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                disabled={isSubmitting}
                autoComplete="off"
                data-lpignore="true"
                data-form-type="other"
                className="w-full rounded-xl border border-(--border-default) bg-(--surface-muted)/50 py-3 pl-10 pr-4 text-sm text-(--primary) placeholder-(--placeholder) transition-all focus:border-(--accent-border) focus:bg-(--surface) focus:outline-none focus:ring-4 focus:ring-(--accent-border)/10 disabled:opacity-60"
                {...register("name")}
              />
            </div>
            {errors.name && <p className="text-xs font-semibold text-(--error) mt-1">{errors.name.message}</p>}
          </div>

          {/* Email Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-(--text-body)" htmlFor="email">
              Email Address <span className="text-(--error)">*</span>
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-(--text-subtle)">
                <Mail className="h-4 w-4" />
              </div>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                disabled={isSubmitting}
                autoComplete="new-password"
                data-lpignore="true"
                data-form-type="other"
                className="w-full rounded-xl border border-(--border-default) bg-(--surface-muted)/50 py-3 pl-10 pr-4 text-sm text-(--primary) placeholder-(--placeholder) transition-all focus:border-(--accent-border) focus:bg-(--surface) focus:outline-none focus:ring-4 focus:ring-(--accent-border)/10 disabled:opacity-60"
                {...register("email")}
              />
            </div>
            {errors.email && <p className="text-xs font-semibold text-(--error) mt-1">{errors.email.message}</p>}
          </div>
        </div>

        {/* Subject Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-(--text-body)" htmlFor="subject">
            Subject <span className="text-(--error)">*</span>
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-(--text-subtle)">
              <HelpCircle className="h-4 w-4" />
            </div>
            <input
              id="subject"
              type="text"
              placeholder="What is this inquiry regarding?"
              disabled={isSubmitting}
              autoComplete="off"
              data-lpignore="true"
              data-form-type="other"
              className="w-full rounded-xl border border-(--border-default) bg-(--surface-muted)/50 py-3 pl-10 pr-4 text-sm text-(--primary) placeholder-(--placeholder) transition-all focus:border-(--accent-border) focus:bg-(--surface) focus:outline-none focus:ring-4 focus:ring-(--accent-border)/10 disabled:opacity-60"
              {...register("subject")}
            />
          </div>
          {errors.subject && <p className="text-xs font-semibold text-(--error) mt-1">{errors.subject.message}</p>}
        </div>

        {/* Message Field */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-(--text-body)" htmlFor="message">
              Message <span className="text-(--error)">*</span>
            </label>
            <span className="text-[11px] font-medium text-(--text-subtle)">
              {watchMessage ? watchMessage.length : 0} / 1000 chars
            </span>
          </div>
          <div className="relative">
            <div className="pointer-events-none absolute top-3.5 left-0 flex items-start pl-3.5 text-(--text-subtle)">
              <MessageSquare className="h-4 w-4" />
            </div>
            <textarea
              id="message"
              rows={5}
              disabled={isSubmitting}
              autoComplete="off"
              data-lpignore="true"
              spellCheck={false}
              placeholder="Write your detailed message here (minimum 15 characters)..."
              className="w-full rounded-xl border border-(--border-default) bg-(--surface-muted)/50 py-3 pl-10 pr-4 text-sm text-(--primary) placeholder-(--placeholder) transition-all focus:border-(--accent-border) focus:bg-(--surface) focus:outline-none focus:ring-4 focus:ring-(--accent-border)/10 disabled:opacity-60 resize-y"
              {...register("message")}
            />
          </div>
          {errors.message && <p className="text-xs font-semibold text-(--error) mt-1">{errors.message.message}</p>}
        </div>

        {/* Form Footer */}
        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between border-t border-(--border-subtle) pt-5 gap-4">
          <div className="flex items-center gap-2 text-xs font-medium text-(--text-muted)">
            <ShieldCheck className="h-4 w-4 text-(--success-icon) shrink-0" />
            <span>Spam Protected &amp; 256-bit Encrypted</span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-linear-to-r from-(--accent) via-(--accent-hover) to-(--accent-active) px-7 py-3.5 text-sm font-bold text-(--white) shadow-lg shadow-(--accent)/25 transition-all hover:from-(--accent-hover) hover:to-(--accent-active-strong) active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Send Message</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
