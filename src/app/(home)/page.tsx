import FaqCollection from '@/app/(home)/(components)/FaqCollection';
import homepage_background from '../../../public/homepage_background.png';
import HomeAboutSection from './(components)/HomeAboutSection';
import HomeFeatureSection from './(components)/HomeFeatureSection';
import HomeGetStarted from './(components)/HomeGetStarted';
import HomeHeroSection from './(components)/HomeHeroSection';
import HomeInfoSection from './(components)/HomeInfoSection';
import HomeVideoSection from './(components)/HomeVideoSection';
import TestimonialSection from './(components)/TestimonialSection';

const HomePage = () => {
  return (
    <>
      {/*  Home Hero Section */}
      <HomeHeroSection bgCover={homepage_background} />
      {/*  Home Feature Section */}
      <HomeFeatureSection />
      {/*  Home Info Section */}
      <HomeInfoSection bgCover={homepage_background} />
      {/*  Home About Section */}
      <HomeAboutSection />
      {/* Home Video Section */}
      <HomeVideoSection bgCover={homepage_background} />
      {/* Home TestimonialSection Section */}
      <TestimonialSection />
      {/* Get Started Section */}
      <HomeGetStarted />
      {/* Faqs Section */}
      <FaqCollection />
    </>
  );
};

export default HomePage;
