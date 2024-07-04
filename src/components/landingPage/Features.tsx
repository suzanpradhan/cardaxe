import { FeaturesDataType } from '@/constants/appConstants';
import Image from 'next/image';
import defaultImage from '../../../public/square_image.jpg';

const Features = ({ data }: { data: FeaturesDataType }) => {
  return (
    <div className="flex flex-col items-center justify-stretch gap-2 w-60 mx-auto md:w-full">
      <div className="relative w-24 h-24 rounded-full overflow-hidden">
        <Image
          src={data.coverImage ? data.coverImage : defaultImage}
          alt={data.title}
          fill
          sizes="(max-width: 768px) 100vw, 700px"
          className="rounded-full object-cover"
        />
      </div>
      <h3 className="text-base lg:text-xl font-bold text-zinc-900">
        {data.title}
      </h3>
      <p className="text-xs md:text-sm font-normal text-zinc-700 text-center">
        {data.detail}
      </p>
    </div>
  );
};

export default Features;
