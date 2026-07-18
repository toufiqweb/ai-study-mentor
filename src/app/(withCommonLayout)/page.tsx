import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import LearningCategories from "@/components/home/LearningCategories";
import StudentStats from "@/components/home/StudentStats";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import CTA from "@/components/home/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <LearningCategories />
      <StudentStats />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
