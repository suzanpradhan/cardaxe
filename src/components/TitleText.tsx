import Link from 'next/link';
import React from 'react';

const TitleText = () => {
  return (
    <Link href={'/'}>
      <h1 className="text-4xl font-extrabold">cardaxe.</h1>
    </Link>
  );
};

export default TitleText;
