import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';

type ImageoverlayPropsType = {
  images: StaticImageData[];
};

const Imageoverlay = ({ images }: ImageoverlayPropsType) => {
  let imageCount: number = 0;
  return (
    <div className="flex h-10">
      {images.map((item, index) => {
        let position: number = imageCount * 25;
        let positionToString: string = position.toString() + 'px';
        imageCount += 1;
        return (
          <div key={index} className="w-10 h-10 rounded-full absolute">
            <Image
              fill
              objectFit="cover"
              src={item}
              sizes="(max-width: 768px) 100vw, 300px"
              alt="image"
              className="rounded-full "
              style={{ left: positionToString }}
            />
          </div>
        );
      })}
      <div
        className="pt-[0.6rem] pl-[0.35rem] text-sm w-10 h-10 bg-componentBgGrey absolute rounded-full text-grayfont"
        style={{ left: '140px' }}
      >
        +25
      </div>
    </div>
  );
};

export default Imageoverlay;
