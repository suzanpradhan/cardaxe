'use client';

import AutoAuthorize from '@/components/loginRegister/AutoAuthorize';
import RegisterationForm from '@/components/loginRegister/RegisterationForm';
import { format } from 'date-fns';
import { ArrowLeft } from 'iconsax-react';
import Link from 'next/link';
import loginCoverImage from '../../../public/banner/login-banner.jpg';

const RegisterPage = () => {
  const currentDate = format(new Date(), 'yyyy');

  const bgImageStyle = {
    backgroundImage: `url(${loginCoverImage.src})`,
  };

  return (
    <main className="flex h-screen">
      <div className="relative h-full w-full max-w-2xl bg-slate-900 hidden lg:block">
        <div
          className="absolute inset-0 bg-no-repeat bg-cover bg-center"
          style={{
            ...bgImageStyle,
            backgroundImage: `linear-gradient(rgba(37, 99, 235, .6), rgba(37, 99, 235, .2)), ${bgImageStyle.backgroundImage}`,
            opacity: 1, // Adjust the opacity as needed
          }}
        ></div>
        <h2 className="absolute top-40 left-10 right-10 text-center text-white text-4xl font-extrabold">
          &quot;Its so impactful it might just change your life...&quot;
        </h2>
      </div>
      <div className="flex flex-col flex-grow items-center p-4">
        <Link href="/" className="w-full flex gap-2 items-center">
          <ArrowLeft size="21" variant="TwoTone" className="text-slate-800" />
          <span className="text-xs font-bold">Go Back to Home</span>
        </Link>
        <div className="flex-grow flex-shrink-0 w-full max-w-sm md:w-96 flex flex-col justify-center">
          <RegisterationForm />
          <div className="flex items-center gap-6">
            <div className="h-0 grow border-t-1 border-componentBgGrey"></div>
            <p className="inline-block text-base font-bold">or</p>
            <div className="h-0 grow border-t-1 border-componentBgGrey"></div>
          </div>
          <AutoAuthorize />
          <div className="flex gap-2 justify-center text-sm">
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
        <footer className="flex flex-col items-center sm:flex-row sm:justify-between gap-1 w-full text-xs text-grayfont">
          <p className="flex items-center gap-2 justify-center">
            <Link href={`#`} className="text-xs font-medium underline">
              Terms
            </Link>
            <Link href={`#`} className="text-xs font-medium underline">
              Privacy
            </Link>
            <Link href={`#`} className="text-xs font-medium underline">
              Trust & Safety
            </Link>
          </p>
          <Link href={`#`}>
            Cardaxe LLC. © Copyright {currentDate}. All Rights Reserved
          </Link>
        </footer>
      </div>
    </main>
  );
};

export default RegisterPage;
