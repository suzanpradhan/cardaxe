'use client';
import { useState } from 'react';

const Description = ({ text }: { text?: string | null }) => {
  const [seeMore, setSeeMore] = useState<boolean>(false);
  return (
    <p
      className={`text-normal cursor-pointer text-sm text-zinc-400 ${seeMore ? '' : 'line-clamp-3'}`}
      onClick={() => {
        setSeeMore((prev) => !prev);
      }}
    >
      {text
        ? text
        : `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat ab
      quaerat reprehenderit, voluptatem nulla dolor soluta sequi reiciendis
      laborum accusantium sapiente quam fugit aut, consectetur recusandae?
      Perferendis molestiae eveniet recusandae?`}
    </p>
  );
};

export default Description;
