'use client';

import TitleText from '@/components/TitleText';
import Sidebar from '@/components/dashboard/Sidebar';
import 'react-toastify/dist/ReactToastify.css';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  // const router = useRouter();
  // const { data: session, status } = useSession();

  // useEffect(() => {
  //   if (status === Status.unauthenticated) {
  //     router.push('/login');
  //     toast.info('Please login to continue');
  //     return;
  //   }
  // }, [session, router, status]);
  return (
    <div className="h-screen overflow-hidden max-lg:mr-2">
      {/* {status === Status.loading && <section>Loading...</section>}
      {status === Status.authenticated && ( */}
      <section className="sm:text-base h-full text-base-mobile flex flex-col gap-2 sm:gap-0 sm:flex-row">
        <div className="z-10 sm:h-screen sm:top-0 sm:shrink sm:sticky lg:basis-72  border-borderMain sm:border-r-1 bg-white border-b-8 pb-2 sm:border-b-0">
          <TitleText isSideBarComp />
          {/* <div className="px-6 sm:hidden">
            <p className="sm:hidden font-bold text-xl sm:text-3xl mb-2 ">
              Explore
            </p>
            <SearchInput greyBackground={false} requireFilter />
          </div> */}
          <Sidebar />
        </div>
        <div className="sm:grow h-full sm:mx-auto overflow-y-scroll overflow-x-hidden px-6 py-8">
          {children}
        </div>
      </section>
    </div>
  );
};

export default DashboardLayout;
