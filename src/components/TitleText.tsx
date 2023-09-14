import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

type TitleTextProps = {
  isSideBarComp?: boolean;
};

const TitleText = ({ isSideBarComp }: TitleTextProps) => {
  return (
    <Link href={'/'} className="w-80 ">
      <h1
        className={clsx(
          'text-4xl font-extrabold ',
          isSideBarComp && 'md:border-r-2 md:px-8'
        )}
      >
        cardaxe.
      </h1>
    </Link>
  );
};

export default TitleText;
