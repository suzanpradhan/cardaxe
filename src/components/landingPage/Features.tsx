import Image, { StaticImageData } from 'next/image';

interface Props {
  headingText: string;
  paragraphText: string;
  featurePic: StaticImageData;
}

const Features = ({ headingText, paragraphText, featurePic }: Props) => {
  return (
    <div className="flex flex-col gap-1 items-center w-72 text-center text-black">
      <div className="w-24 h-24 rounded-full relative mb-4">
        <Image
          src={featurePic}
          alt="image"
          fill
          sizes="(max-width: 768px) 100vw, 700px"
          objectFit="cover"
          className="rounded-full"
        />
      </div>
      <h3 className="text-2xl font-bold">{headingText}</h3>
      <p className="">{paragraphText}</p>
    </div>
  );
};

export default Features;
