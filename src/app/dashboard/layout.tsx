'use client';

import SearchInput from '@/components/SearchInput';
import TitleText from '@/components/TitleText';
import Sidebar from '@/components/dashboard/Sidebar';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Status = {
  authenticated: 'authenticated',
  unauthenticated: 'unauthenticated',
  loading: 'loading',
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === Status.unauthenticated) {
      router.push('/login');
      toast.info('Please login to continue');
      return;
    }
  }, [session, router, status]);
  return (
    <div>
      {status === Status.loading && <section>Loading...</section>}
      {status === Status.authenticated && (
        <section className="sm:text-base text-base-mobile flex flex-col gap-2 sm:flex-row">
          <div className="z-10 sm:h-screen sm:top-0 sm:shrink sm:sticky lg:basis-72 border-borderMain sm:border-r-1 bg-white border-b-8 pb-2 sm:border-b-0">
            <TitleText isSideBarComp />
            <div className="px-2 sm:hidden">
              <p className="sm:hidden font-bold text-3xl-mobile sm:text-3xl mb-2 ">
                Explore
              </p>
              <SearchInput greyBackground={false} requireFilter />
            </div>
            <Sidebar />
          </div>
          <div className="sm:grow max-w-6xl sm:mx-auto">{children}</div>
        </section>
      )}
    </div>
  );
};

export default DashboardLayout;
