'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '@/components/dashboard/Sidebar';
import TitleText from '@/components/TitleText';
import { toast } from 'react-toastify';

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
        <section className="grid items-start relative sm:grid-flow-cols md:grid-cols-dashboard-layout">
          {/* for movile view */}
          <div className="h-20 md:hidden">
            <TitleText isSideBarComp />
          </div>
          <div className="z-10 md:hidden">
            <Sidebar />
          </div>
          {/* for web view */}
          <div className="sm:flex sm:flex-col sm:w-full sm:sticky sm:top-0 hidden sm:h-screen sm:border-r-1">
            <TitleText isSideBarComp />
            <Sidebar />
          </div>
          <div>{children}</div>
        </section>
      )}
    </div>
  );
};

export default DashboardLayout;
