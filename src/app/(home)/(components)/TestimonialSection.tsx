import Carousel from '@/components/landingPage/Carousel';
import ContentHeading from '@/components/landingPage/ContentHeading';

const TestimonialSection = () => {
  return (
    <div className="container mx-auto py-20">
      <ContentHeading headingTitle="What our clients saying?" />
      <Carousel />
    </div>
    // <div className="flex flex-col items-center max-w-7xl mx-auto px-4 mb-16 mt-24">
    //   <ContentHeading headingTitle="What our clients saying?" />
    //   <Carousel />
    // </div>
  );
};

export default TestimonialSection;
