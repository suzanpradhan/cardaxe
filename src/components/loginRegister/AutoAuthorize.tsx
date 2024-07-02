import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { AiFillTwitterCircle } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { SiFacebook } from 'react-icons/si';

const AutoAuthorize = () => {
  const handleSignIn = () => {
    signIn('google', {
      callbackUrl: '/dashboard',
    });
  };

  return (
    <div className="flex gap-4 justify-center my-4">
      <button className="text-2xl p-2 shadow-md" onClick={handleSignIn}>
        <FcGoogle />
      </button>
      <Link href="https://www.facebook.com/" className="text-2xl p-2 shadow-md">
        <SiFacebook className="text-blueTheme" />
      </Link>
      <Link href="https://www.twitter.com/" className="text-2xl p-2 shadow-md">
        <AiFillTwitterCircle className="text-blueTheme" />
      </Link>
    </div>
  );
};

export default AutoAuthorize;
