import Link from "next/link";
import { GraduationCap, Globe, MessageCircle, Rss, Mail } from "lucide-react";

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
    <footer className="border-t border-gray-100 bg-white">
      <div className="container mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold text-gray-900">
              <GraduationCap className="h-6 w-6 text-(--ternary)" />
              AI Study Mentor
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-gray-600">
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
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-(--ternary)/10 hover:text-(--ternary)"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {linkGroups.map((group) => (
            <div key={group.title}>
              <p className="text-sm font-bold text-gray-900">{group.title}</p>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 transition-colors hover:text-(--primary)"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-gray-100 pt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} AI Study Mentor. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
