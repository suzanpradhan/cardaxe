'use client';
import UserProfileCard from '@/components/dashboard/UserProfileCard';
import { useRouter } from 'next/navigation';
import square_image from '../../../../public/square_image.jpg';

import CardLayouts from '@/components/CardLayouts.server';
import HomeCardTemplate from '@/components/dashboard/HomeCardTemplate';
import { apiPaths } from '@/core/api/apiConstants';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { PaginatedResponseType } from '@/core/types/responseTypes';
import cardsApi from '@/module/cards/cardsApi';
import { CardResponseType, CardTemplatesType } from '@/module/cards/cardsType';
import userApi from '@/module/user/userApi';
import { UserType } from '@/module/user/userType';
import clsx from 'clsx';
import {
  Bookmark,
  BoxAdd,
  Flash,
  Heart,
  MoreSquare,
  PenAdd,
  ScanBarcode,
  Share,
} from 'iconsax-react';
import Image from 'next/image';
import { useEffect } from 'react';

const ICONS_COMMON_CLASS: string = 'p-3 rounded-full h-12 w-12 hover:shadow-lg';

const NAVIGATION_ICONS = [
  <PenAdd
    size="32"
    variant="Bulk"
    key={0}
    className={clsx('bg-[#d3f4df] text-[#23c562]', ICONS_COMMON_CLASS)}
  />,
  <BoxAdd
    size="32"
    variant="Bulk"
    key={1}
    className={clsx('bg-[#ffe9cc] text-[#fba530]', ICONS_COMMON_CLASS)}
  />,
  <ScanBarcode
    size="32"
    variant="Bulk"
    key={2}
    className={clsx('bg-[#ffd5d6] text-[#ff1843]', ICONS_COMMON_CLASS)}
  />,
  <Share
    size="32"
    variant="Bulk"
    key={3}
    className={clsx('bg-[#d5e3ff] text-[#2f73fe]', ICONS_COMMON_CLASS)}
  />,
];
const OPTIONS = ['About', 'Help', 'Privacy', 'Terms', 'Language'];

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

  useEffect(() => {
    dispatch(cardsApi.endpoints.getAllCards.initiate());
  }, [dispatch]);

  const allCardsList = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries['getAllCards']?.data as PaginatedResponseType<
        CardResponseType<CardTemplatesType>
      >
  );

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 grid grid-cols-12 xl:col-span-8 xl:col-start-3">
        <div className="col-span-12 border-zinc-100 lg:col-span-6 lg:border-r xl:col-span-7">
          <div className="flex grow flex-col">
            {allCardsList?.results?.map((card, index) => (
              <div className="mx-auto flex w-full min-w-[20rem] max-w-xs flex-col gap-4 border-b border-zinc-100 px-2 py-5 xs:px-0 sm:min-w-[24rem] sm:max-w-sm">
                <section className="flex items-center gap-2">
                  <div className="relative z-auto h-8 w-8 rounded-full">
                    <Image
                      className="rounded-full"
                      src={square_image}
                      alt="image"
                      fill
                      sizes="(max-width: 768px) 100vw, 700px"
                      objectFit="contain"
                    />
                  </div>
                  <a className="grow font-semibold hover:text-blueTheme">
                    Eugene Cheng
                  </a>
                  <MoreSquare size="24" className="text-zinc-200" />
                </section>
                <CardLayouts
                  key={index}
                  enableShadow
                  htmlSource={card.cardTemplate?.htmlCode}
                  variableValues={{
                    ...card.cardFields,
                    ...card.cardDesign,
                    logoUrl: card.cardDesign.logo
                      ? `${apiPaths.serverUrl}${card.cardDesign.logo}`
                      : undefined,
                    backgroundUrl: `${apiPaths.serverUrl}${card.cardDesign.backgroundImage}`,
                  }}
                />
                <section className="flex gap-4">
                  <button className="flex items-center gap-2 rounded-xl p-1 text-zinc-400 hover:text-zinc-900 active:bg-blueBg active:text-zinc-900 active:ring-2">
                    <Heart size="24" variant="TwoTone" />
                    <p>11.1k</p>
                  </button>
                  <button className="flex items-center gap-2 rounded-xl p-1 text-zinc-400 hover:text-zinc-900 active:bg-blueBg active:text-zinc-900 active:ring-2">
                    <Flash size="24" variant="TwoTone" />
                    <p>11.1k</p>
                  </button>
                  <button className="flex items-center gap-2 rounded-xl p-1 text-zinc-400 hover:text-zinc-900 active:bg-blueBg active:text-zinc-900 active:ring-2">
                    <Share size="24" variant="TwoTone" />
                    <p>11.1k</p>
                  </button>
                  <div className="flex grow justify-end">
                    <Bookmark
                      variant="TwoTone"
                      size="24"
                      className="text-zinc-300 hover:text-zinc-900 active:bg-blueBg active:text-zinc-900 active:ring-2"
                    />
                  </div>
                </section>
              </div>
            ))}
          </div>
        </div>

        <div className="sticky top-0 hidden h-screen shrink-0 py-4 lg:col-span-6 lg:block xl:col-span-5">
          <div className="relative flex h-full min-w-[24rem] max-w-sm grow flex-col justify-between px-4">
            <div className="flex flex-col gap-4">
              <UserProfileCard fullName={user?.fullname} />
              <h2 className="font-bold">My Card</h2>
              <HomeCardTemplate userId={user?.id} />
              <div className="flex gap-2">
                {NAVIGATION_ICONS.map((item) => item)}
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 border-t border-zinc-100 px-4 pt-2">
              <div className="flex flex-wrap gap-2">
                {OPTIONS.map((item, index) => (
                  <span
                    key={index}
                    className="flex items-center text-sm text-zinc-500 after:ml-2 after:text-xl after:font-extrabold after:content-['\00B7'] last:after:content-['']"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-xs font-semibold text-zinc-500">
                Copyright © 2023 CARDAXE
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
