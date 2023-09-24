import { ArrowRight2 } from 'iconsax-react';
import React from 'react';
import Image, { StaticImageData } from 'next/image';

type Props = {
  list: {
    name: string;
    icon: StaticImageData;
  }[];
};
const GappedTableList = ({ list }: Props) => {
  return (
    <div className="grid gap-3">
      {list.map((item, index) => (
        <div
          key={index}
          className="hover:shadow-md flex bg-componentBgGrey p-2 rounded-lg gap-3 items-center"
        >
          <div className="w-10 h-10 relative shadow-md rounded-md">
            <Image
              src={item.icon}
              alt="Icon"
              fill
              sizes="(max-width: 768px) 100vw, 300px"
              objectFit="contain"
              className="rounded-md"
            />
          </div>
          <p className="grow font-bold shrink">{item.name}</p>
          <ArrowRight2 size="28" variant="Outline" className="text-grayfont" />
        </div>
      ))}
    </div>
  );
};

export default GappedTableList;
