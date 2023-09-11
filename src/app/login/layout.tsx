'use client';

import { Metadata } from 'next';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Generated by create next app',
};

const LoginLayout = ({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  // useEffect(() => {
  //   if (status === 'authenticated') {
  //     toast.success('User already logged in');
  //     router.push('./dashboard');
  //     return;
  //   }
  // }, [status]);

  if (status === 'authenticated') {
    router.push('./dashboard');
    return;
  }

  return (
    <section>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'unauthenticated' && children}
    </section>
  );
};

export default LoginLayout;
