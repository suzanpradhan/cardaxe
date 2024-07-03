import FaqCollection from '@/app/(home)/(components)/FaqCollection';
import CardWithImage from '@/components/landingPage/CardWithImage';
import CardWithImageSmall from '@/components/landingPage/CardWithImageSmall';
import ContentHeading from '@/components/landingPage/ContentHeading';
import Features from '@/components/landingPage/Features';
import { Edit, Edit2, ElementPlus, UserEdit } from 'iconsax-react';
import Image from 'next/image';
import homepage_background from '../../../public/homepage_background.png';
import square_image from '../../../public/square_image.jpg';
import HomeGetStarted from './(components)/HomeGetStarted';
import HomeHeroSection from './(components)/HomeHeroSection';
import HomeVideoSection from './(components)/HomeVideoSection';
import TestimonialSection from './(components)/TestimonialSection';

const HomePage = () => {
  return (
    <>
      {/*  Home Hero Section */}
      <HomeHeroSection bgCover={homepage_background} />
      <div className="mx-auto px-4 max-w-7xl">
        <div className=" flex md:flex-row md:flex-wrap md:items-start md:justify-around items-center flex-col justify-between pt-10 md:gap-4">
          <Features
            featurePic={square_image}
            headingText="Lorem ipsum dolor"
            paragraphText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit fuga expedita maxime autem reiciendis praesentium dolores magnam vero. Assumenda, minus!"
          />
          <Features
            featurePic={square_image}
            headingText="Lorem ipsum dolor"
            paragraphText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit fuga expedita maxime autem reiciendis praesentium dolores magnam vero. Assumenda, minus!"
          />
          <Features
            featurePic={square_image}
            headingText="Lorem ipsum dolor"
            paragraphText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit fuga expedita maxime autem reiciendis praesentium dolores magnam vero. Assumenda, minus!"
          />
        </div>
        <CardWithImage
          headingText="Create yout digital card in 2 minutes"
          paragraphText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit fuga expedita maxime autem reiciendis praesentium dolores magnam vero. Assumenda, minus!"
          image={square_image}
          imageIsLeft={false}
        />
      </div>
      <div className="relative w-full h-auto">
        <Image
          src={homepage_background}
          alt="image"
          fill
          sizes="(max-width: 768px) 100vw, 700px"
          objectFit="cover "
          className="-z-50"
        />

        <CardWithImage
          headingText="Create yout digital card in 2 minutes"
          paragraphText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit fuga expedita maxime autem reiciendis praesentium dolores magnam vero. Assumenda, minus!"
          image={square_image}
          imageIsLeft={true}
        />
      </div>
      <div className="max-w-7xl mx-auto px-4">
        <ContentHeading
          headingTitle="How do cardaxe's digital card work"
          center={true}
        />
        <div className="flex flex-col items-center lg:flex-row lg:items-start py-10 mb-12 gap-y-12 gap-x-4 justify-between">
          <CardWithImageSmall
            headingText="Sign Up"
            paragraphText="Register for a free account on our platform"
            image={square_image}
          >
            <div className="text-blueTheme">
              <UserEdit size="32" />
            </div>
          </CardWithImageSmall>
          <CardWithImageSmall
            headingText="Choose a Template"
            paragraphText="Select from our wide range of professionally designed templates."
            image={square_image}
          >
            {' '}
            <div className="text-blueTheme">
              <Edit size="32" />
            </div>
          </CardWithImageSmall>
          <CardWithImageSmall
            headingText="Customize"
            paragraphText="Add your contact information, upload your photo, and personalize your card that reflect your brand."
            image={square_image}
          >
            <div className="text-blueTheme">
              <Edit2 size="32" />
            </div>
          </CardWithImageSmall>
          <CardWithImageSmall
            headingText="Save & Share"
            paragraphText="Save your card and start sharing it with your professional network instantly."
            image={square_image}
          >
            <div className="text-blueTheme">
              <ElementPlus size="32" />
            </div>
          </CardWithImageSmall>
        </div>
      </div>
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
