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
    <div className="sm:p-4 lg:flex">
      {/* story section to be made */}
      <div className="w-full sm:mx-auto flex flex-col gap-4 sm:px-6 max-w-xl shrink">
        {posts.map((post, index) => (
          <HomeFeed post={post} key={index} />
        ))}
      </div>
      <div className="flex-col gap-2 px-6 hidden lg:flex h-fit grow ">
        <UserProfileCard fullName={user?.fullname} />
        <h2 className="font-bold my-2">My Card</h2>
        <HomeCardTemplate userId={user?.id} />
        <div className="flex gap-2 my-3">{LINKS_ICONS.map((item) => item)}</div>
        <div className="flex flex-wrap gap-2 mt-4">
          {OPTIONS.map((item, index) => (
            <span
              key={index}
              className="text-grayfont after:content-['\00B7'] after:font-extrabold after:text-3xl after:ml-2 last:after:content-[''] flex items-center"
            >
              {item}
            </span>
          ))}
        </div>
        <p className="text-grayfont">Copyright © 2023 CARDAXE</p>
      </div>
      {/* <button onClick={() => handleClick()}>Change password</button>
      <button onClick={() => signOut()}>signout</button> */}
    </div>
  );
};

export default DashboardPage;
