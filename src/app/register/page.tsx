import RegisterationForm from '@/components/RegisterationForm';
import Link from 'next/link';
import React from 'react';
import { AiOutlineArrowLeft, AiFillTwitterCircle } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { SiFacebook } from 'react-icons/si';

const page = () => {
  return (
    <main className="flex h-screen">
      <div className="h-full bg-banner  w-140 relative">
        <h2 className=" text-white  px-20 text-4xl font-extrabold absolute top-64 right-10">
          "Its so impactful it might just change your life..."
        </h2>
      </div>
      <div className="flex flex-col flex-grow items-center p-4">
        <Link href="/" className="w-full">
          <AiOutlineArrowLeft className="inline mb-1 mr-1" />
          Go back to Home
        </Link>
        <div className="flex-grow flex-shrink-0 w-96 flex flex-col justify-center">
          <RegisterationForm />
          <div className="flex items-center gap-10">
            <div className="h-0 grow border-1 border-inputBorder "></div>
            <p className="inline">or</p>
            <div className="h-0 grow border-1 border-inputBorder "></div>
          </div>
          <div className="flex gap-4 justify-center">
            <Link
              href="https://www.google.com/"
              className="text-2xl p-2 shadow-md"
            >
              <FcGoogle />
            </Link>
            <Link
              href="https://www.facebook.com/"
              className="text-2xl p-2 shadow-md"
            >
              <SiFacebook className="text-blue-700" />
            </Link>
            <Link
              href="https://www.twitter.com/"
              className="text-2xl p-2 shadow-md"
            >
              <AiFillTwitterCircle className="text-blue-700" />
            </Link>
          </div>
        </div>
        <footer className="flex w-full justify-between">
          <p>Terms, Privacy, Trust & Safety</p>
          <p>© 2022 Cardaxe LLC.</p>
        </footer>
      </div>
    </main>
  );
};

export default page;
