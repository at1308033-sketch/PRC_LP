import Navigation from '@/components/Navigation';
import StickyCTA from '@/components/StickyCTA';
import ScrollMotion from '@/components/ScrollMotion';
import Hero from '@/sections/Hero';
import Manifesto from '@/sections/Manifesto';
import FactRibbon from '@/components/FactRibbon';
import Location from '@/sections/Location';
import Project from '@/sections/Project';
import Product from '@/sections/Product';
import ProductPoster from '@/sections/ProductPoster';
import SpacesChapters from '@/sections/SpacesChapters';
import SpatialGallery from '@/sections/SpatialGallery';
import UseCase from '@/sections/UseCase';
import Reality from '@/sections/Reality';
import Legal from '@/sections/Legal';
import Partners from '@/sections/Partners';
import Inauguration from '@/sections/Inauguration';
import Video from '@/sections/Video';
import DocumentDownload from '@/sections/DocumentDownload';
import FAQ from '@/sections/FAQ';
import FinalCTA from '@/sections/FinalCTA';
import Footer from '@/sections/Footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="pt-16">
        <Hero />
        <Manifesto />
        <Location />
        <Project />
        <Product />
        <ProductPoster />
        <SpacesChapters />
        <UseCase />
        <SpatialGallery />
        <Reality />
        <Legal />
        <Inauguration />
        <FactRibbon />
        <Partners />
        <Video />
        <DocumentDownload />
        <FAQ />
        <FinalCTA />
        <Footer />
      </main>
      <StickyCTA />
      {/* Last child: its effect must run after all sections have hydrated */}
      <ScrollMotion />
    </>
  );
}