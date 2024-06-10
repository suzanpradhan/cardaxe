'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const LoginLayout = ({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const { status, data } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('./dashboard');
      return;
    }
  }, [status]);

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
