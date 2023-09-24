'use client';
import CardTempHome from '@/components/dashboard/CardTempHome';
import UserProfileCard from '@/components/dashboard/UserProfileCard';
import CardTemplate from '@/components/myCards/CardTemplate';
import clsx from 'clsx';
import { BoxAdd, PenAdd, ScanBarcode, Share } from 'iconsax-react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';

import { posts } from '@/app/module';
import HomeFeed from '@/components/dashboard/HomeFeed';

const DashboardPage = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push('./changeCurrentPassword');
  };

  const ICONS_COMMON_CLASS: string = 'p-3 rounded-full h-12 w-12';

  const LINKS_ICONS = [
    <PenAdd
      size="32"
      variant="Bulk"
      key={0}
      className={clsx('text-[#23c562] bg-[#d3f4df]', ICONS_COMMON_CLASS)}
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
    <div className="p-4 grid grid-cols-home-layout ">
      {/* story section to be made */}
      <div className="mx-auto grid gap-4">
        {/* map all the home feedds */}
        {posts.map((post, index) => (
          <HomeFeed post={post} key={index} />
        ))}
      </div>
      <div className="flex flex-col gap-2 ">
        <UserProfileCard />
        <h2 className="font-bold my-2">My Card</h2>
        <CardTempHome
          firstName="Sujan"
          lastName="Khadka"
          designation="Manager"
          email="sujan@khadka.com"
          logo="sadfj"
          phone="adfs"
          website="sdf"
        />
        <div className="flex gap-2 my-3">
          {LINKS_ICONS.map((item, index) => item)}
        </div>
        <></>
        <div className="flex gap-2 mt-6">
          {OPTIONS.map((item, index) => (
            <span className="text-grayfont after:content-['\00B7'] after:font-extrabold after:text-3xl after:ml-2 last:after:content-[''] flex items-center">
              {item}
            </span>
          ))}
        </div>
        <p className="text-grayfont">Copyright © 2023 CARDAXE</p>
      </div>
      {/* <CardTemplate /> */}
      {/* <button onClick={() => handleClick()}>Change password</button>
      <button onClick={() => signOut()}>signout</button> */}
    </div>
  );
};

export default DashboardPage;
