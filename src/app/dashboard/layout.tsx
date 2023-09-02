'use client';

import type { Metadata } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '@/components/dashboard/Sidebar';
import TitleText from '@/components/TitleText';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Generated by create next app',
};

enum Status {
  authenticated = 'authenticated',
  unauthenticated = 'unauthenticated',
  loading = 'loading',
}

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === Status.unauthenticated) {
      router.push('/login');
      return;
    }
  }, [session]);

  if (status === Status.loading) {
    return <p>loading...</p>;
  }

  if (status === Status.authenticated) {
    return (
      <section className="grid md:grid-flow-cols lg:grid-cols-dashboard-layout">
        {/* for movile view */}
        <div className="h-20 md:hidden">
          <TitleText isSideBarComp />
        </div>
        <div className="md:hidden">
          <Sidebar />
        </div>
        {/* for web view */}
        <div className="hidden md:block md:max-w-sm">
          <TitleText isSideBarComp />
          <Sidebar />
        </div>
        <div>{children}</div>
      </section>
    );
  }
};

export default DashboardLayout;
