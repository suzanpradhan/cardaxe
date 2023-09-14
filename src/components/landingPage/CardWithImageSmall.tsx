import { Props } from './CardWithImage';
import Image from 'next/image';

const CardWithImageSmall = ({ headingText, paragraphText, image }: Props) => {
  return (
    <div className="flex flex-col gap-4 w-72 text-black dark:text-white">
      <div className="flex gap-4 items-center">
        <div className="h-16 w-16 relative">
          <Image
            src={image}
            alt="image"
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            objectFit="cover"
          />
        </div>
        <h3 className="text-xl font-bold">{headingText}</h3>
      </div>
      <p className="text-base">{paragraphText}</p>
    </div>
  );
};

export default CardWithImageSmall;
