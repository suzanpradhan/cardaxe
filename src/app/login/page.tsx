'use client';

import AutoAuthorize from '@/components/AutoAuthorize';
import LoginForm from '@/components/LoginForm';
import Link from 'next/link';
import React from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import axios from 'axios';

const page = () => {
  return (
    <main className="flex h-screen">
      <div className="hidden h-full bg-banner  w-140 relative lg:block">
        <h2 className=" text-white  px-20 text-4xl font-extrabold absolute top-64 right-10">
          "Its so impactful it might just change your life..."
        </h2>
      </div>
      <div className="flex flex-col flex-grow items-center p-4">
        <Link href="/" className="w-full">
          <AiOutlineArrowLeft className="inline mb-1 mr-1" />
          Go back to Home
        </Link>
        <div className="flex-grow flex-shrink-0 w-80  md:w-96 flex flex-col justify-center">
          <LoginForm />
          <div className="flex items-center gap-10 mt-10 mb-5">
            <div className="h-0 grow border-1 border-inputBorder "></div>
            <p className="inline">or</p>
            <div className="h-0 grow border-1 border-inputBorder "></div>
          </div>
          <AutoAuthorize />
        </div>
        <footer className="flex w-full justify-between text-xs ">
          <p>Terms, Privacy, Trust & Safety</p>
          <p>© 2022 Cardaxe LLC.</p>
        </footer>
      </div>
    </main>
  );
};

export default page;
