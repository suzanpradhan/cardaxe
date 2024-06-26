import Image, { StaticImageData } from 'next/image';
// import square_image from '../../public/square_image.jpg';
import clsx from 'clsx';
import ContentHeading from './ContentHeading';

export interface Props {
  imageIsLeft?: boolean;
  headingText: string;
  paragraphText: string;
  image: StaticImageData;
  children?: React.ReactNode;
}

const CardWithImage = ({
  imageIsLeft,
  headingText,
  paragraphText,
  image,
}: Props) => {
  return (
    <div
      className={clsx(
        'flex flex-col  max-w-7xl mx-auto gap-12 text-black py-8 dark:text-white items-center w-full my-14 px-10 justify-between',
        imageIsLeft ? 'md:flex-row-reverse' : 'md:flex-row'
      )}
    >
      <div className="w-80 h-80 relative shrink-0">
        <Image
          src={image}
          alt="image"
          fill
          sizes="(max-width: 768px) 100vw, 700px"
          objectFit="contain"
        />
      </div>
      <div className="flex flex-col gap-4 px-8 shrink md:basis-120 ">
        <ContentHeading headingTitle={headingText} />
        <p className="text-base">{paragraphText}</p>
      </div>
    </div>
  );
};

export default CardWithImage;
