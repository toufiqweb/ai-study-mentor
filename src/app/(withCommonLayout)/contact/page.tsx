"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2, Globe, Rss, MessageCircle } from "lucide-react";
import SectionContainer from "@/components/shared/SectionContainer";
import SectionTitle from "@/components/shared/SectionTitle";
import SectionDescription from "@/components/shared/SectionDescription";

const contactSchema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.email("Enter a valid email"),
  subject: z.string().min(3, "Add a short subject"),
  message: z.string().min(10, "Message should be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const inputStyles =
  "w-full rounded-xl border border-gray-200 bg-(--background) px-4 py-2.5 text-sm text-(--primary) placeholder-gray-400 transition-colors focus:border-(--primary) focus:bg-white focus:outline-none focus:ring-1 focus:ring-(--primary)";
const labelStyles = "text-sm font-medium text-(--primary)";

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@aistudymentor.com" },
  { icon: Phone, label: "Phone", value: "+1 (555) 010-2024" },
  { icon: MapPin, label: "Location", value: "Remote-first, worldwide" },
];

const socialLinks = [
  { icon: Globe, href: "/", label: "Website" },
  { icon: Rss, href: "/blog", label: "Blog" },
  { icon: MessageCircle, href: "/explore-roadmaps", label: "Community" },
];

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

  const onSubmit = handleSubmit(async () => {
    // No backend contact endpoint yet — this simulates the send.
    await new Promise((resolve) => setTimeout(resolve, 900));
    reset();
  });

  return (
    <SectionContainer className="bg-(--background) py-20" containerClassName="max-w-5xl">
      <div className="text-center">
        <SectionTitle as="h1" eyebrow="Contact">
          Get in touch
        </SectionTitle>
        <SectionDescription className="mx-auto mt-4 max-w-2xl text-lg text-(--secondary)">
          Questions, feedback, or partnership ideas — we&apos;d love to hear from you.
        </SectionDescription>
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-3">
        <form
          onSubmit={onSubmit}
          className="space-y-5 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:p-8 lg:col-span-2"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className={labelStyles} htmlFor="name">
                Name <span className="text-red-500">*</span>
              </label>
              <input id="name" type="text" className={inputStyles} {...register("name")} />
              {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
            </div>
            <div className="space-y-1.5">
              <label className={labelStyles} htmlFor="email">
                Email <span className="text-red-500">*</span>
              </label>
              <input id="email" type="email" className={inputStyles} {...register("email")} />
              {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className={labelStyles} htmlFor="subject">
              Subject <span className="text-red-500">*</span>
            </label>
            <input id="subject" type="text" className={inputStyles} {...register("subject")} />
            {errors.subject && <p className="text-xs text-red-500">{errors.subject.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className={labelStyles} htmlFor="message">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              rows={5}
              className={inputStyles}
              placeholder="How can we help?"
              {...register("message")}
            />
            {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
          </div>

          {isSubmitSuccessful && (
            <p className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-600">
              <CheckCircle2 className="h-4 w-4" />
              Thanks — your message has been sent. We&apos;ll get back to you soon.
            </p>
          )}

          <div className="flex justify-end border-t border-gray-100 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-xl bg-(--ternary) px-6 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:opacity-90 disabled:opacity-60"
            >
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              Send Message
            </button>
          </div>
        </form>

        <div className="space-y-6">
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-base font-bold text-(--primary)">Contact Information</h2>
            <div className="mt-5 space-y-4">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="rounded-xl bg-(--ternary)/10 p-2.5">
                    <item.icon className="h-4 w-4 text-(--ternary)" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-(--secondary)">{item.label}</p>
                    <p className="text-sm font-semibold text-(--primary)">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-base font-bold text-(--primary)">Follow Along</h2>
            <div className="mt-4 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-(--secondary)/10 text-(--secondary) transition-colors hover:bg-(--ternary)/10 hover:text-(--ternary)"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
