'use client';
import UserProfileCard from '@/components/dashboard/UserProfileCard';
import clsx from 'clsx';
import { BoxAdd, PenAdd, ScanBarcode, Share } from 'iconsax-react';
import { useRouter } from 'next/navigation';

import { posts } from '@/app/module';
import HomeCardTemplate from '@/components/dashboard/HomeCardTemplate';
import HomeFeed from '@/components/dashboard/HomeFeed';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import userApi from '@/module/user/userApi';
import { UserType } from '@/module/user/userType';
import { useEffect } from 'react';

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(
    (state: RootState) => state.baseApi.queries[`getUser`]?.data as UserType
  );

  useEffect(() => {
    dispatch(userApi.endpoints.getUser.initiate());
  }, [dispatch]);

  const router = useRouter();
  const handleClick = () => {
    router.push('./changeCurrentPassword');
  };

  const ICONS_COMMON_CLASS: string =
    'p-3 rounded-full h-12 w-12 hover:shadow-lg';

  const LINKS_ICONS = [
    <PenAdd
      size="32"
      variant="Bulk"
      key={0}
      className={clsx('text-[#23c562] bg-[#d3f4df] ', ICONS_COMMON_CLASS)}
    />,
    <BoxAdd
      size="32"
      variant="Bulk"
      key={1}
      className={clsx('text-[#fba530] bg-[#ffe9cc]', ICONS_COMMON_CLASS)}
    />,
    <ScanBarcode
      size="32"
      variant="Bulk"
      key={2}
      className={clsx('text-[#ff1843] bg-[#ffd5d6]', ICONS_COMMON_CLASS)}
    />,
    <Share
      size="32"
      variant="Bulk"
      key={3}
      className={clsx('text-[#2f73fe] bg-[#d5e3ff]', ICONS_COMMON_CLASS)}
    />,
  ];
  const OPTIONS = ['About', 'Help', 'Privacy', 'Terms', 'Language'];

  return (
    <div className="grid grid-cols-12">
      {/* story section to be made */}
      <div className="col-span-12 lg:col-span-6 xl:col-span-7 border border-zinc-200 border-t-0 border-b-0">
        <div className="grow max-w-sm sm:max-w-md lg:max-w-xl w-full mx-auto flex flex-col md:px-4">
          {posts.map((post, index) => (
            <HomeFeed post={post} key={index} />
          ))}
        </div>
      </div>

      <div className="hidden lg:block shrink-0 sticky top-0 h-screen lg:col-span-6 xl:col-span-5 py-5">
        <div className="relative grow max-w-xl h-full flex flex-col justify-between px-4">
          <div className="flex flex-col gap-4">
            <UserProfileCard fullName={user?.fullname} />
            <h2 className="font-bold">My Card</h2>
            <HomeCardTemplate userId={user?.id} />
            <div className="flex gap-2">{LINKS_ICONS.map((item) => item)}</div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 border-t border-zinc-100 pt-2 px-4">
            <div className="flex flex-wrap gap-2">
              {OPTIONS.map((item, index) => (
                <span
                  key={index}
                  className="text-zinc-500 text-sm flex items-center after:content-['\00B7'] after:font-extrabold after:text-xl after:ml-2 last:after:content-['']"
                >
                  {item}
                </span>
              ))}
            </div>
            <p className="text-zinc-500 text-xs font-semibold mt-2">
              Copyright © 2023 CARDAXE
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
