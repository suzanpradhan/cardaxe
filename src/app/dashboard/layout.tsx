'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import TitleText from '@/components/TitleText';
import 'react-toastify/dist/ReactToastify.css';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen">
      <TitleText isSideBarComp />
      <div className="h-max w-full fixed bottom-0 left-0 border-t border-zinc-200 bg-white p-2 lg:top-0 lg:block lg:h-screen lg:w-60 lg:border-r lg:border-t-0 lg:px-4 lg:py-4 z-50">
        <Sidebar />
      </div>
      <div className="lg:ml-60">{children}</div>
    </div>
  );
};

export default DashboardLayout;
