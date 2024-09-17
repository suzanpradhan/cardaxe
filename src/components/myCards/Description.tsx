'use client';
import { useState } from 'react';

const Description = ({ text }: { text?: string | null }) => {
  const [seeMore, setSeeMore] = useState<boolean>(false);
  return (
    <p
      className={`cursor-pointer text-sm font-normal leading-5 tracking-tight text-grayfont ${seeMore ? '' : 'line-clamp-3'}`}
      onClick={() => {
        setSeeMore((prev) => !prev);
      }}
    >
      {text ? text : ''}
    </p>
  );
};

export default Description;
