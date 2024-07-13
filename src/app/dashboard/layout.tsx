'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import TitleText from '@/components/TitleText';
import 'react-toastify/dist/ReactToastify.css';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen flex-col md:flex-row">
      <TitleText isSideBarComp />
      <div className="hidden h-max w-full border-t border-zinc-200 bg-white p-2 md:top-0 md:block md:h-auto md:w-60 md:border-r md:border-t-0 md:px-4 md:py-4">
        <Sidebar />
      </div>
      <div className="min-h-0 min-w-0 flex-1">{children}</div>
      <div className="border-t border-zinc-200 bg-white p-2 md:top-0 md:hidden md:h-auto md:w-60 md:border-r md:border-t-0 md:px-4 md:py-4">
        <Sidebar />
      </div>
    </div>
  );
};

export default DashboardLayout;
