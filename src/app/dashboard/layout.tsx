'use client';

import type { Metadata } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '@/components/Sidebar';

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
  const [activeTab, setActiveTab] = useState<number>(1);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === Status.unauthenticated) {
      router.push('/login');
      return;
    }
    //Runs only on the first render
  }, [status]);

  if (status === Status.loading) {
    return <p>loading...</p>;
  }

  if (status === Status.authenticated) {
    return (
      <section className="flex ">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        {children}
      </section>
    );
  }
};

export default DashboardLayout;
