import Link from 'next/link';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { SiFacebook } from 'react-icons/si';
import { AiFillTwitterCircle } from 'react-icons/ai';

const AutoAuthorize = () => {
  return (
    <div className="flex gap-4 justify-center">
      <Link href="https://www.google.com/" className="text-2xl p-2 shadow-md">
        <FcGoogle />
      </Link>
      <Link href="https://www.facebook.com/" className="text-2xl p-2 shadow-md">
        <SiFacebook className="text-blue-700" />
      </Link>
      <Link href="https://www.twitter.com/" className="text-2xl p-2 shadow-md">
        <AiFillTwitterCircle className="text-blue-700" />
      </Link>
    </div>
  );
};

export default AutoAuthorize;
