import Link from "next/link";
import Image from "next/image";
import { GraduationCap, Globe, MessageCircle, Rss, Mail } from "lucide-react";
import CookiePolicyLink from "@/components/shared/CookiePolicyLink";

const linkGroups = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "Features", href: "#features" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Learning Categories", href: "#learning-categories" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Explore Roadmaps", href: "/explore-roadmaps" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-(--card-border) bg-(--card-bg) transition-colors duration-300">
      <div className="container mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold text-(--primary)">
              <Image src="/logo.png" alt="AI Study Mentor" width={28} height={28} className="object-contain" />
              AI Study Mentor
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-(--secondary)">
              Your AI-powered personal study coach that plans, tracks, and improves your learning
              journey.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[
                { icon: Globe, href: "/", label: "Website" },
                { icon: Rss, href: "/blog", label: "Blog" },
                { icon: MessageCircle, href: "/contact", label: "Community" },
                { icon: Mail, href: "mailto:hello@aistudymentor.com", label: "Email" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-(--card-border)/40 text-(--secondary) transition-colors hover:bg-(--ternary)/10 hover:text-(--ternary)"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {linkGroups.map((group) => (
            <div key={group.title}>
              <p className="text-sm font-bold text-(--primary)">{group.title}</p>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-(--secondary) transition-colors hover:text-(--primary)"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-(--card-border) pt-8 text-center text-sm text-(--secondary) sm:flex-row">
          <div>© {new Date().getFullYear()} AI Study Mentor. All rights reserved.</div>
          <CookiePolicyLink className="text-sm text-(--secondary) transition-colors hover:text-(--primary)" />
        </div>
      </div>
    </footer>
  );
}
