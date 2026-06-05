import Header from "./components/Header";
import Hero from "./components/Hero";
import TrustStrip from "./components/TrustStrip";
import Programs from "./components/Programs";
import Services from "./components/Services";
import WhyUs from "./components/WhyUs";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import ConsultationForm from "./components/ConsultationForm";
import Footer from "./components/Footer";
import LatestOpportunities from "./components/LatestOpportunities";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Home() {
  // Fetch latest scholarship alerts and universities for the LatestOpportunities section
  const [latestScholarships, latestUniversities] = await Promise.all([
    prisma.scholarshipAlert.findMany({
      take: 4,
      orderBy: { createdAt: "desc" },
    }),
    prisma.university.findMany({
      take: 2,
      include: { country: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const opportunities = [
    ...latestScholarships.map((s) => ({
      id: s.id,
      title: s.title,
      type: "scholarship" as const,
      region: s.region,
      amount: s.amount || undefined,
      link: s.link || undefined,
    })),
    ...latestUniversities.map((u) => ({
      id: u.id,
      title: u.name,
      type: "university" as const,
      region: u.country.name,
      amount: u.tuitionFees || undefined,
      link: `/universities/${u.id}`,
    })),
  ];

  return (
    <>
      <Header />
      <Hero />
      <TrustStrip />
      <LatestOpportunities opportunities={opportunities} />
      <Programs />
      <Services />
      <WhyUs />
      <Testimonials />
      <CTA />
      <ConsultationForm />
      <Footer />
    </>
  );
}
