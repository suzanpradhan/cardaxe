'use client';

import Image from 'next/image';
import homepage_background from '../../public/homepage_background.png';
import Header from '@/components/Header';
import HeadingWithText from '@/components/HeadingWithText';
import Button from '@/components/Button';
import Features from '@/components/Features';
import square_image from '../../public/square_image.jpg';
import CardWithImage from '@/components/CardWithImage';
import CardWithImageSmall from '@/components/CardWithImageSmall';
import Caraousel from '@/components/Caraousel';
import ContentHeading from '@/components/ContentHeading';
import Footer from '@/components/Footer';
import clsx from 'clsx';
import FaqCollection from '@/components/FaqCollection';

export default function Home() {
  return (
    <main className="relative bg-">
      <div className="w-full h-screen absolute top-0 left-0 -z-10">
        <Image
          src={homepage_background}
          alt="image"
          fill
          sizes="(max-width: 768px) 100vw, 700px"
          objectFit="cover"
        />
      </div>
      <div className="max-w-7xl mx-auto px-4">
        <div className="  h-screen">
          <Header />
          <HeadingWithText
            headingText="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            paragraphText="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam, neque explicabo a officia esse quisquam laudantium incidunt beatae enim odit. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam, neque explicabo a officia esse quisquam laudantium incidunt beatae enim odit."
          />
          <Button href="/dashboard" isHeader={false} label="Get Started" />
        </div>
        <div className="pt-40 flex justify-between">
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
      <div className="relative">
        <div className="w-full h-96 absolute top-0 left-0 -z-10">
          <Image
            src={homepage_background}
            alt="image"
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            objectFit="cover"
          />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4">
        <CardWithImage
          headingText="Create yout digital card in 2 minutes"
          paragraphText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit fuga expedita maxime autem reiciendis praesentium dolores magnam vero. Assumenda, minus!"
          image={square_image}
          imageIsLeft={true}
        />
        <div className="grid grid-cols-3 py-10 mb-12 gap-y-12">
          <ContentHeading headingTitle="How do cardaxe's digital card work" />
          <CardWithImageSmall
            headingText="Tolling of iron bell"
            paragraphText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit fuga expedita maxime autem"
            image={square_image}
          />
          <CardWithImageSmall
            headingText="Tolling of iron bell"
            paragraphText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit fuga expedita maxime autem"
            image={square_image}
          />
          <CardWithImageSmall
            headingText="Tolling of hippopotamus"
            paragraphText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit fuga expedita maxime autem"
            image={square_image}
          />
        </div>
      </div>
      <div className="relative pt-12">
        <div className="w-full h-125 absolute top-0 left-0 -z-10">
          <Image
            src={homepage_background}
            alt="image"
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            objectFit="cover"
          />
        </div>
        <div className="flex flex-col items-center max-w-7xl mx-auto px-4">
          <ContentHeading
            headingTitle="Quod maxime placeat option facere possimus"
            contentName="video title"
          />
          <iframe
            src="https://www.youtube-nocookie.com/embed/y8Yv4pnO7qc?rel=0&amp;controls=0&amp;showinfo=0"
            height="420"
            width="700"
            className="my-10 shadow-3xl"
          ></iframe>
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
            hic minima assumenda iusto praesentium culpa modi cupiditate ipsam!
            Eos.
          </p>
          <Button label="Get Started" href="/dashboard"/>
        </div>
        <div className="text flex flex-col gap-16 p-20 max-w-4xl mx-auto">
          <ContentHeading
            headingTitle="Frequently Asked Questions"
            center={true}
          />
          <FaqCollection />
        </div>
        <Footer />
      </div>
    </main>
  );
}
