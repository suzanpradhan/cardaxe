'use client';

import AutoAuthorize from '@/components/loginRegister/AutoAuthorize';
import RegisterationForm from '@/components/loginRegister/RegisterationForm';
import Link from 'next/link';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const page = () => {
  return (
    <main className="flex h-screen">
      <div className="hidden h-full bg-banner  w-140 relative lg:block">
        <h2 className=" text-white  px-20 text-4xl font-extrabold absolute top-64 right-10">
          &quot;Its so impactful it might just change your life...&quot;
        </h2>
      </div>
      <div className="flex flex-col flex-grow items-center p-4">
        <Link href="/" className="w-full">
          <AiOutlineArrowLeft className="inline mb-1 mr-1" />
          Go back to Home
        </Link>
        <div className="flex-grow flex-shrink-0 w-80  md:w-96 flex flex-col justify-center">
          <RegisterationForm />
          <div className="flex items-center gap-10 mt-10 mb-5">
            <div className="h-0 grow border-1 border-componentBgGrey "></div>
            <p className="inline">or</p>
            <div className="h-0 grow border-1 border-componentBgGrey "></div>
          </div>
          <AutoAuthorize />
          <div className="flex gap-2 justify-center  my-8">
            <span>{`Already have an account?`}</span>
            <Link
              href="/login"
              type="button"
              className="text-grayfont hover:underline hover:text-blueTheme"
            >
              Sign In!
            </Link>
          </div>
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
