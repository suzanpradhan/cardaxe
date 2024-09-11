'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import TitleText from '@/components/TitleText';

interface RootLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: RootLayoutProps) => {
  return (
    <div className="h-screen">
      <TitleText isSideBarComp />
      <div className="fixed bottom-0 left-0 z-50 h-max w-full border-t border-zinc-200 bg-white p-2 lg:top-0 lg:block lg:h-screen lg:w-60 lg:border-r lg:border-t-0 lg:px-4 lg:py-4">
        <Sidebar />
      </div>
      <div className="h-screen max-lg:relative max-lg:bottom-10 max-lg:top-10 max-lg:h-[90vh] lg:ml-60">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
