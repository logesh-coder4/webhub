import ChooseUsSection from "@/components/home/ChooseUsSection";
import HeroSection from "@/components/home/HeroSection";
import ServiceSection from "@/components/home/ServiceSection";
import TechWeProvided from "@/components/home/TechWeProvided";
import Testimonials from "@/components/home/Testimonials";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <ServiceSection/>
      <ChooseUsSection/>
      <TechWeProvided/>
      <Testimonials/>
    </div>
  );
};

export default Home;
