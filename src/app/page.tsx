import ButtonRounded from '@/components/ButtonRounded';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Caraousel from '@/components/landingPage/Caraousel';
import CardWithImage from '@/components/landingPage/CardWithImage';
import CardWithImageSmall from '@/components/landingPage/CardWithImageSmall';
import ContentHeading from '@/components/landingPage/ContentHeading';
import FaqCollection from '@/components/landingPage/FaqCollection';
import Features from '@/components/landingPage/Features';
import HeadingWithText from '@/components/landingPage/HeadingWithText';
import clsx from 'clsx';
import { Edit, Edit2, ElementPlus, UserEdit } from 'iconsax-react';
import Image from 'next/image';
import homepage_background from '../../public/homepage_background.png';
import square_image from '../../public/square_image.jpg';

export default function Home() {
  return (
    <>
      <Header />
      <main className="">
        <div className="w-full h-[calc(100vh+2rem)] relative min-h-fitall  top-0 left-0 ">
          <Image
            src={homepage_background}
            alt="image"
            fill
            sizes="(max-width: 768px) 100vw, 700px "
            className="-z-50"
            objectFit="cover"
          />
          <div className="max-w-7xl max-xl:px-8  h-full flex justify-between mx-auto items-center max-md:flex-col">
            <div className="  flex flex-col ">
              <HeadingWithText
                headingText="Cardaxe: Connecting Simplified"
                paragraphText="Say goodbye to outdated paper business cards and hello to Cardaxe, your key to efficient, effective, and eco-friendly professional connections"
                centerOnSmallerScreen={false}
              />
              <ButtonRounded
                isHeader={false}
                label="Get Started"
                href="/login"
              />
            </div>
            <div className="basis-110 h-110 max-md:basis-44 max-md:h-44 relative my-52 max-sm:hidden">
              <Image
                src={'/images/cardaxe_home_image.png'}
                alt="image"
                fill
                sizes="(max-width: 768px) 100vw, 700px "
                className="-z-50"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
        <div className=" mx-auto px-4 max-w-7xl">
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
        <div className="w-full h-auto top-0 left-0  relative ">
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
        <div className="max-w-7xl mx-auto px-4 ">
          <ContentHeading
            headingTitle="How do cardaxe's digital card work"
            center={true}
          />
          <div className="flex flex-col items-center lg:flex-row lg:items-start py-10 mb-12 gap-y-12 gap-x-4 justify-between">
            <CardWithImageSmall
              headingText="Sign Up"
              paragraphText="Register for a free acoount on our platform"
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
        <div className="pt-12">
          <div className="w-full relative top-0 left-0 ">
            <Image
              src={homepage_background}
              alt="image"
              fill
              sizes="(max-width: 768px) 100vw, 700px"
              objectFit="cover"
              className="-z-10"
            />
            <div className="flex flex-col items-center pt-4 text-center ">
              <ContentHeading
                headingTitle="Quod maxime placeat option facere possimus"
                contentName="video title"
              />
              <iframe
                src="https://www.youtube-nocookie.com/embed/y8Yv4pnO7qc?rel=0&amp;controls=0&amp;showinfo=0"
                // height="420"
                // width="700"
                className="mt-5 -mb-10 shadow-3xl w-full h-auto lg:h-[26.25rem] lg:w-[43.75rem] aspect-video"
              ></iframe>
            </div>
          </div>
          <div className="flex flex-col items-center max-w-7xl mx-auto px-4 mb-16 mt-24">
            <ContentHeading headingTitle="What our clients saying?" />
            <Caraousel />
          </div>
          <div
            className={clsx(
              'w-full h-110 text-center py-28 flex flex-col items-center gap-5',
              'circularGradientBg'
            )}
          >
            <ContentHeading headingTitle="Ready When you are" />
            <p className="max-w-xl mx-auto">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ut
              hic minima assumenda iusto praesentium culpa modi cupiditate
              ipsam! Eos.
            </p>
            <ButtonRounded label="Get Started" href="/register" />
          </div>
          <div className="text flex flex-col gap-16 lg:p-20 px-4 py-20 max-w-4xl lg:mx-auto">
            <ContentHeading
              headingTitle="Frequently Asked Questions"
              center={true}
            />
            <FaqCollection />
          </div>
          <Footer />
        </div>
      </main>
    </>
  );
}
