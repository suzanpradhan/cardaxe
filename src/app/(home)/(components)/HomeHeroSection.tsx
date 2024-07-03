import ButtonRounded from '@/components/ButtonRounded';
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
        <div className="grid grid-cols-12 h-full">
          <div className="col-span-12 lg:col-span-5 h-full w-full">
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col items-center gap-5">
                <h1 className="text-2xl md:text-3xl lg:text-4xl text-zinc-900 font-extrabold capitalize">
                  <span className="bg-gradient-to-r from-blue-700 via-[#3366e8] to-blue-400 bg-clip-text text-transparent">
                    CardAxe:
                  </span>{' '}
                  The Future of Business Networking
                </h1>
                <p className="text-base text-zinc-900">
                  Ditch traditional paper business cards and embrace CardAxe—the
                  gateway to streamlined, impactful, and
                  environmentally-conscious networking solutions.
                </p>
                <ButtonRounded
                  isHeader={false}
                  label="Get Started"
                  href="/login"
                />
              </div>
            </div>
          </div>
          <div className="hidden lg:block lg:col-span-7 h-full w-full">
            <div className="flex items-center justify-center h-full">
              <div className="relative max-md:h-44 max-sm:hidden w-full h-full">
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
      </div>
    </div>
  );
};

export default HomeHeroSection;
