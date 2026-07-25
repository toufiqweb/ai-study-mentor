"use client";

import { useState } from "react";
import { Clock, X } from "lucide-react";
import { blogPosts, type BlogPost } from "@/lib/mock/blogPosts";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionContainer from "@/components/shared/SectionContainer";
import SectionTitle from "@/components/shared/SectionTitle";
import SectionDescription from "@/components/shared/SectionDescription";

export default function BlogPage() {
  const [selected, setSelected] = useState<BlogPost | null>(null);

  return (
    <div>
      <SectionContainer className="bg-(--surface-muted) py-20" containerClassName="max-w-6xl text-center">
        <SectionTitle as="h1" eyebrow="Blog">
          Learn how to learn
        </SectionTitle>
        <SectionDescription className="mx-auto mt-4 max-w-2xl text-lg text-(--text-secondary)">
          Practical, no-fluff articles on studying, focus, and building real skills.
        </SectionDescription>
      </SectionContainer>

      <section className="bg-(--surface) py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, i) => (
              <AnimatedSection key={post.id} delay={i * 0.06}>
                <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-(--border-subtle) bg-(--surface) shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                  <div className="flex h-36 items-center justify-center bg-linear-to-br from-(--ternary) to-(--secondary)">
                    <post.icon className="h-10 w-10 text-(--white)/90" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="w-fit rounded-full bg-(--surface-subtle) px-2.5 py-1 text-xs font-bold text-(--text-secondary)">
                      {post.category}
                    </span>
                    <h2 className="mt-4 text-base font-bold text-(--text-strong)">{post.title}</h2>
                    <p className="mt-2 flex-1 text-sm leading-6 text-(--text-secondary)">{post.excerpt}</p>
                    <div className="mt-5 flex items-center justify-between border-t border-(--border-subtle) pt-4">
                      <span className="flex items-center gap-1.5 text-xs text-(--text-muted)">
                        <Clock className="h-3.5 w-3.5" />
                        {post.readingTime}
                      </span>
                      <button
                        onClick={() => setSelected(post)}
                        className="text-xs font-bold text-(--ternary) hover:underline"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-(--black)/60 p-4 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-(--surface) p-6 shadow-2xl md:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="rounded-full bg-(--surface-subtle) px-2.5 py-1 text-xs font-bold text-(--text-secondary)">
                  {selected.category}
                </span>
                <h2 className="mt-3 text-xl font-bold text-(--text-strong)">{selected.title}</h2>
                <span className="mt-2 flex items-center gap-1.5 text-xs text-(--text-muted)">
                  <Clock className="h-3.5 w-3.5" />
                  {selected.readingTime}
                </span>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="rounded-full p-1.5 text-(--text-subtle) hover:bg-(--surface-subtle)"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {selected.body.map((paragraph, i) => (
                <p key={i} className="text-sm leading-7 text-(--text-body)">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
