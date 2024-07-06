'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import TitleText from '@/components/TitleText';
import 'react-toastify/dist/ReactToastify.css';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen overflow-hidden">
      {/* <section className="sm:text-base h-full text-base-mobile flex flex-col gap-2 sm:gap-0 sm:flex-row"> */}
      {/* <div className="md:h-screen md:top-0 md:shrink md:sticky md:border-r-1 md:border-b-0 lg:basis-72 border-borderMain bg-white border-b-8 pb-2 z-10"> */}
      {/* <TitleText isSideBarComp />
          <Sidebar /> */}
      {/* </div> */}
      {/* <div className="sm:grow h-full sm:mx-auto overflow-y-scroll">
          {children}
        </div> */}
      {/* </section> */}
      <TitleText isSideBarComp />
      <div className="fixed md:top-0 left-0 bottom-0 w-full md:w-60 h-max md:h-auto bg-white p-2 md:px-4 md:py-4 z-50 border-t md:border-t-0 border-zinc-200">
        <Sidebar />
      </div>
      <div className="md:ml-60 h-full pb-32 md:pb-0 overflow-y-scroll">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
