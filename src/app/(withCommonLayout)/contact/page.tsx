import { Mail, Phone, MapPin, Globe, Rss, MessageCircle, Clock, ShieldCheck } from "lucide-react";
import SectionContainer from "@/components/shared/SectionContainer";
import SectionTitle from "@/components/shared/SectionTitle";
import SectionDescription from "@/components/shared/SectionDescription";
import ContactForm from "@/components/contact/ContactForm";

const contactInfo = [
  {
    icon: Mail,
    label: "Email Us",
    value: "toufiqalahe.dev@gmail.com",
    href: "mailto:toufiqalahe.dev@gmail.com",
    subtext: "Direct developer & support email",
  },
  {
    icon: Phone,
    label: "Call or WhatsApp",
    value: "+8801798800096",
    href: "tel:+8801798800096",
    subtext: "Mon-Fri, 9am - 6pm (BST)",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Dhaka, Bangladesh",
    href: undefined,
    subtext: "Remote-first engineering team",
  },
];

const socialLinks = [
  { icon: Globe, href: "/", label: "Official Website" },
  { icon: Rss, href: "/blog", label: "Read Blog" },
  { icon: MessageCircle, href: "/explore-roadmaps", label: "Explore Community" },
];

export default function ContactPage() {
  return (
    <SectionContainer className="bg-(--background) py-16 md:py-24" containerClassName="max-w-6xl">
      <div className="text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-(--accent-subtle-strong) bg-(--accent-subtle)/70 px-4 py-1.5 text-xs font-semibold text-(--accent) backdrop-blur-xs">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>We're Here to Help</span>
        </div>

        <SectionTitle as="h1" eyebrow="Contact Us" className="mt-3">
          Let&apos;s Start a Conversation
        </SectionTitle>
        <SectionDescription className="mx-auto mt-4 max-w-2xl text-lg text-(--secondary)">
          Have a question about AI Study Mentor, feedback, or custom partnership ideas? Send us a message and we will respond promptly.
        </SectionDescription>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        {/* Main Form Component */}
        <ContactForm />

        {/* Sidebar Information */}
        <div className="space-y-6">
          {/* Direct Contact Card */}
          <div className="relative overflow-hidden rounded-3xl border border-(--border-subtle) bg-(--surface) p-6 shadow-sm transition-all duration-300 hover:shadow-md md:p-7">
            <div className="absolute top-0 right-0 h-24 w-24 rounded-bl-full bg-linear-to-bl from-(--accent-subtle)/60 to-transparent pointer-events-none" />

            <h2 className="text-base font-bold text-(--primary) flex items-center justify-between">
              <span>Contact Details</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-(--success) bg-(--success-subtle) px-2.5 py-1 rounded-full">
                <span className="h-1.5 w-1.5 rounded-full bg-(--success-icon) animate-pulse" />
                Available
              </span>
            </h2>

            <div className="mt-6 space-y-5">
              {contactInfo.map((item) => (
                <div key={item.label} className="group flex items-start gap-4">
                  <div className="rounded-2xl bg-(--accent-subtle)/80 p-3 text-(--accent) transition-colors group-hover:bg-(--action-bg) group-hover:text-(--action-text)">
                    <item.icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-(--secondary)">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm font-bold text-(--primary) transition-colors hover:text-(--accent) block truncate"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-bold text-(--primary) truncate">{item.value}</p>
                    )}
                    <p className="text-[11px] text-(--text-subtle) mt-0.5">{item.subtext}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Response Promise Card */}
          <div className="rounded-3xl border border-(--accent-subtle-strong) bg-linear-to-br from-(--accent-subtle)/40 to-(--decorative-purple-subtle)/20 p-6 shadow-xs">
            <div className="flex items-center gap-3 text-(--accent)">
              <div className="rounded-xl bg-(--surface) p-2.5 shadow-xs">
                <Clock className="h-5 w-5 text-(--accent)" />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-(--accent-hover)">Quick Response</h3>
                <p className="text-sm font-semibold text-(--text-strong) mt-0.5">Under 24 Hours</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-(--text-secondary) leading-relaxed">
              Every message goes directly to our core engineering team for quick and accurate resolution.
            </p>
          </div>

          {/* Social Links Card */}
          <div className="rounded-3xl border border-(--border-subtle) bg-(--surface) p-6 shadow-sm md:p-7">
            <h2 className="text-base font-bold text-(--primary)">Connect & Follow</h2>
            <p className="text-xs text-(--secondary) mt-1">Explore our latest updates and community resources.</p>
            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  title={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl bg-(--surface-muted) text-(--secondary) transition-all hover:bg-(--action-bg) hover:text-(--action-text) hover:shadow-md hover:-translate-y-0.5"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
