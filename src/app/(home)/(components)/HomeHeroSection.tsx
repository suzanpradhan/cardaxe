import ButtonRounded from '@/components/ButtonRounded';
import HeadingWithText from '@/components/landingPage/HeadingWithText';
import Image, { StaticImageData } from 'next/image';
import HeroBanner from '../../../../public/images/cardaxe_home_image.png';

const HomeHeroSection = ({ bgCover }: { bgCover?: StaticImageData }) => {
  const bgImageStyle = bgCover
    ? {
        backgroundImage: `url(${bgCover.src})`,
      }
    : {};
  return (
    <div
      className="relative h-screen min-h-fitAll"
      style={bgCover && bgImageStyle}
    >
      <div className="container mx-auto h-full">
        <div className="flex justify-between items-center h-full max-md:flex-col">
          <div className="flex flex-col">
            <HeadingWithText
              headingText="Cardaxe: Connecting Simplified"
              paragraphText="Say goodbye to outdated paper business cards and hello to Cardaxe, your key to efficient, effective, and eco-friendly professional connections"
              centerOnSmallerScreen={false}
            />
            <ButtonRounded isHeader={false} label="Get Started" href="/login" />
          </div>
          <div className="relative basis-110 h-110 max-md:basis-44 max-md:h-44 max-sm:hidden">
            <Image
              src={HeroBanner.src}
              alt="hero-cover-image"
              fill
              sizes="(max-width: 768px) 100vw, 700px"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHeroSection;
