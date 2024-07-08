'use client';

import CardLayouts from '@/components/CardLayouts.server';
import AppBar from '@/components/dashboard/AppBar';
import HomeCardTemplate from '@/components/dashboard/HomeCardTemplate';
import UserProfileCard from '@/components/dashboard/UserProfileCard';
import { apiPaths } from '@/core/api/apiConstants';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import CircleLoader from '@/core/ui/loaders/CircleLoader';
import cardsApi from '@/module/cards/cardsApi';
import { CardResponseType, CardTemplatesType } from '@/module/cards/cardsType';
import clsx from 'clsx';
import {
  BoxAdd,
  Eye,
  Magicpen,
  PenAdd,
  ScanBarcode,
  Share,
} from 'iconsax-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ICONS_COMMON_CLASS: string = 'p-3 rounded-full h-12 w-12 hover:shadow-lg';
const OPTIONS = ['About', 'Help', 'Privacy', 'Terms', 'Language'];

const NAVIGATION_ICONS = [
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

const MyCardsPage = () => {
  const router = useRouter();
  const [createLoading, toggleLoading] = useState(false);
  const { data } = useSession();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(cardsApi.endpoints.getMyCards.initiate());
  }, [dispatch]);

  const cardsList = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries['getMyCards']?.data as Array<
        CardResponseType<CardTemplatesType>
      >
  );

  const hanldeCreateCard = () => {
    toggleLoading(true);

    if (data?.user) {
      dispatch(cardsApi.endpoints.createCard.initiate(data?.user.id))
        .then((createCardResponse) => {
          Object.prototype.hasOwnProperty.call(createCardResponse, 'data') &&
            (createCardResponse as any).data.id &&
            router.push(
              `/dashboard/builder/?cardId=${
                (createCardResponse as any).data.id
              }&action=create`
            );
          toggleLoading(false);
        })
        .catch((error) => {
          toggleLoading(false);
          console.log(error);
          throw error;
        });
    }
  };

  const handleEditCard = (cardId: number) => {
    router.push(`/dashboard/builder/?cardId=${cardId}&action=update`);
  };

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 sm:col-start-2 sm:col-span-10 xl:col-start-3 xl:col-span-8 px-2 sm:px-0">
        <AppBar appBarLabel="My Cards">
          <button
            onClick={() => hanldeCreateCard()}
            className="w-10 lg:w-auto h-10 bg-teal-500 rounded-md shadow-md shadow-teal-200 text-white text-xs lg:px-3"
          >
            <p className="flex items-center justify-center gap-2">
              <Eye size="20" className="text-white" />
              <span className="hidden lg:block">Preview</span>
            </p>
          </button>
          <button
            onClick={() => hanldeCreateCard()}
            className="w-10 lg:w-auto h-10 bg-blueTheme rounded-md shadow-md shadow-blueTheme/60 text-white text-xs lg:px-3"
          >
            <p className="flex items-center justify-center gap-2">
              {createLoading ? (
                <CircleLoader />
              ) : (
                <Magicpen size="20" className="text-white" />
              )}
              <span className="hidden lg:block">Create New card</span>
            </p>
          </button>
        </AppBar>
      </div>
      <div className="col-span-12 sm:col-start-2 sm:col-span-10 xl:col-start-3 xl:col-span-8 grid grid-cols-12 px-2 sm:px-0">
        <div className="col-span-12 lg:col-span-7 lg:border-r border-zinc-100">
          <div className="grow max-w-sm sm:max-w-none w-full mx-auto flex flex-col gap-4 lg:pr-4 mb-4">
            {cardsList?.map((card, index) => {
              // console.log(card.cardTemplate.htmlCode);
              return (
                <div key={index} className="w-full">
                  {card.id && (
                    <div
                      onClick={() => handleEditCard(card.id!)}
                      className="w-full"
                    >
                      <CardLayouts
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
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="hidden lg:block shrink-0 sticky top-0 h-screen lg:col-span-5 py-4">
          <div className="relative grow h-full flex flex-col justify-between px-4">
            <div className="flex flex-col gap-4">
              <UserProfileCard fullName="Niwesh Shrestha" />
              <h2 className="font-bold">My Card</h2>
              <HomeCardTemplate userId={1} />
              <div className="flex gap-2">
                {NAVIGATION_ICONS.map((item) => item)}
              </div>
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
    </div>
  );
};

export default MyCardsPage;
