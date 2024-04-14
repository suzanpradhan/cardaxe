// import Image from 'next/image';
import { Props } from './CardWithImage';

const CardWithImageSmall = ({ headingText, paragraphText, image }: Props) => {
  return (
    <div className="flex items-center lg:items-start flex-col gap-4 lg:w-72 lg:gap-4 text-black dark:text-white">
      <div className="flex gap-4 items-center flex-col lg:flex-row">
        <div className="h-16 w-16 relative">
          {/* <Image
            src={image}
            alt="image"
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            objectFit="cover"
          /> */}
        </div>
        <h3 className="text-xl font-bold">{headingText}</h3>
      </div>
      <p className="text-base text-center lg:text-start">{paragraphText}</p>
    </div>
  );
};

export default CardWithImageSmall;
