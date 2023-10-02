import React from 'react';
import Image, { StaticImageData } from 'next/image';
import Imageoverlay from './Imageoverlay';

type MyTeamsCardPropsType = {
  organizationName: string;
  logo: StaticImageData;
  images: StaticImageData[];
  themeColor: string;
  handleCardClick: () => void;
};

const MyTeamsCard = ({
  organizationName,
  logo,
  images,
  themeColor,
  handleCardClick,
}: MyTeamsCardPropsType) => {
  return (
    <div
      role="button"
      onClick={handleCardClick}
      className="  grow max-w-3xl relative border-1 border-borderMain rounded-lg"
    >
      <div
        className="absolute top-0 h-10 w-full rounded-t-lg"
        style={{ backgroundColor: themeColor }}
      ></div>
      <div className="p-4 grid gap-2">
        <div className="relative w-20 h-20 shadow-lg rounded-lg">
          <Image
            src={logo}
            alt="Background Image"
            fill
            objectFit="cover"
            sizes="(max-width: 768px) 100vw, 300px"
            className="z-10 rounded-lg"
          />
        </div>
        <div className="flex justify-between">
          <strong>{organizationName}</strong>
          <span>Active</span>
        </div>
        <Imageoverlay images={images} />
      </div>
    </div>
  );
};

export default MyTeamsCard;
