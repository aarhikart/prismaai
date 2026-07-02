import { AboutSection } from "@/app/_components/landing/about-section";
import { ContactSection } from "@/app/_components/landing/contact-section";
import { CoreAlgorithmSection } from "@/app/_components/landing/core-algorithm-section";
import { FooterSection } from "@/app/_components/landing/footer-section";
import { Header } from "@/app/_components/landing/header";
import { HeroSection } from "@/app/_components/landing/hero-section";
import { ImportantNoticePopup } from "@/app/_components/landing/important-notice-popup";
import { IndustriesSection } from "@/app/_components/landing/industries-section";
import { PartnerStrip } from "@/app/_components/landing/partner-strip";
import { ProductsSection } from "@/app/_components/landing/products-section";
import { StatsSection } from "@/app/_components/landing/stats-section";
import { StoryMosaicSection } from "@/app/_components/landing/story-mosaic-section";

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-slate-950">
      <ImportantNoticePopup />
      <Header />
      <HeroSection />
      <PartnerStrip />
      <AboutSection />
      <StoryMosaicSection />
      <StatsSection />
      <CoreAlgorithmSection />
      <ProductsSection />
      <IndustriesSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
