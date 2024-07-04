// import Image from 'next/image';
import { CardaxeFlowDataType } from '@/constants/appConstants';

const CardWithImageSmall = ({
  data,
  children,
}: {
  data: CardaxeFlowDataType;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex items-center lg:items-start flex-col gap-4 lg:w-72 lg:gap-4 text-black dark:text-white">
      <div className="flex gap-4 items-center flex-col lg:flex-row">
        {children}
        <h3 className="text-base md:text-xl font-bold text-zinc-900">
          {data.title}
        </h3>
      </div>
      <p className="text-sm md:text-base text-center lg:text-start w-60 mx-auto md:w-full">
        {data.detail}
      </p>
    </div>
  );
};

export default CardWithImageSmall;
