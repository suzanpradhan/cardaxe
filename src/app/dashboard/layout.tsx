'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import TitleText from '@/components/TitleText';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

interface RootLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: RootLayoutProps) => {
  const pathname = usePathname();

  return (
    <div className="">
      <TitleText isSideBarComp />
      <div className="fixed bottom-0 left-0 z-50 h-max w-full border-t border-zinc-200 bg-white p-2 lg:top-0 lg:block lg:h-screen lg:w-60 lg:border-r lg:border-t-0 lg:px-4 lg:py-4">
        <Sidebar />
      </div>
      <div
        className={cn(
          'h-screen max-lg:relative max-lg:bottom-14 max-lg:h-[90vh] lg:ml-60',
          pathname.includes('builder') ? 'max-lg:top-0' : 'max-lg:top-14',
          pathname.endsWith('dashboard') ? 'overflow-hidden' : ''
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
