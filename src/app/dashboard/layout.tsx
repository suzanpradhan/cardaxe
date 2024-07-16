'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import TitleText from '@/components/TitleText';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen">
      <TitleText isSideBarComp />
      <div className="fixed bottom-0 left-0 z-50 h-max w-full border-t border-zinc-200 bg-white p-2 lg:top-0 lg:block lg:h-screen lg:w-60 lg:border-r lg:border-t-0 lg:px-4 lg:py-4">
        <Sidebar />
      </div>
      <div className="lg:ml-60">{children}</div>
    </div>
  );
};

export default DashboardLayout;
