import Image, { StaticImageData } from 'next/image';

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
      className={`flex flex-col md:flex-row justify-around gap-5 md:gap-20 md:items-start w-full text-zinc-900 dark:text-white ${imageIsLeft ? 'md:flex-row-reverse' : 'md:flex-row'}`}
    >
      <div className="basis-full md:basis-2/5 flex items-center justify-center">
        <div className="relative w-60 md:w-80 lg:w-96 h-60 md:h-80 lg:h-96">
          <Image
            src={image}
            alt="image"
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            className="object-contain"
          />
        </div>
      </div>
      <div className="grow shrink basis-full md:basis-3/5">
        <div className="flex flex-col gap-5">
          <h2 className="text-zinc-900 text-xl md:text-2xl lg:text-4xl font-extrabold capitalize text-center md:text-left">
            {headingText}
          </h2>
          <p className="text-sm md:text-base max-w-xs mx-auto sm:max-w-full text-center md:text-left">
            {paragraphText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardWithImage;
