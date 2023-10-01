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
          isSideBarComp && 'md:px-8 md:pt-6'
        )}
      >
        cardaxe.
      </h1>
    </Link>
  );
};

export default TitleText;
