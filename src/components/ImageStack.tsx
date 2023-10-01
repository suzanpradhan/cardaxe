import React from 'react';
import Image from 'next/image';

type ImageStackPropsType = {
  images: string[];
};

const ImageStack = ({ images }: ImageStackPropsType) => {
  return (
    <div>
      {images.map((item, index) => (
        <div key={index} className="relative rounded-full">
          <Image
            src={item}
            alt="image"
            fill
            objectFit="cover"
            sizes="(max-width: 768px) 100vw, 300px"
            className="rounded-lg"
          />
        </div>
      ))}
    </div>
  );
};

export default ImageStack;
