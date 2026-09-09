import Hero from "./components/Hero";
import IntroCTA from "./components/IntroCTA";
import GiraArgentina from "./components/GiraArgentina";
import CoachGallery from "./components/CoachGallery";
import Programas from "./components/Programas";
import Sedes from "./components/Sedes";
import SpaldingSection from "./components/SpaldingSection";
import Footer from "./components/Footer";
import GrainOverlay from "./components/GrainOverlay";
import FloatingNav from "./components/FloatingNav";
import { useLenis } from "./lib/useLenis";

function App() {
  useLenis();

  return (
    <>
      <GrainOverlay />
      <main>
        <Hero />
        <IntroCTA />
        <GiraArgentina />
        <Programas />
        <CoachGallery />
        <Sedes />
        <SpaldingSection />
      </main>
      <Footer />
      <FloatingNav />
    </>
  );
}

export default App;
