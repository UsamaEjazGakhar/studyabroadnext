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

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <TrustStrip />
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
