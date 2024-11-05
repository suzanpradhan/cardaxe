'use client';

import CardLayouts from '@/components/CardLayouts';
import { Separator } from '@/components/ui/separator';
import { apiPaths } from '@/core/api/apiConstants';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import cardsApi from '@/module/cards/cardsApi';
import { CardResponseType, CardTemplatesType } from '@/module/cards/cardsType';
import userApi from '@/module/user/userApi';
import { UserType } from '@/module/user/userType';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import MyProfileCard from '../../(components)/MyProfileCard';

export default function Page() {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const user = useAppSelector(
    (state: RootState) => state.baseApi.queries[`getUser`]?.data as UserType
  );

  useEffect(() => {
    dispatch(userApi.endpoints.getUser.initiate());
  }, [dispatch]);

  useEffect(() => {
    dispatch(cardsApi.endpoints.getMyCards.initiate());
  }, [dispatch]);

  const myCards = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries['getMyCards']?.data as Array<
        CardResponseType<CardTemplatesType>
      >
  );

  return (
    <div className="my-4 flex w-full max-w-sm flex-col gap-4 max-sm:px-4 lg:px-5">
      {user ? (
        <>
          <div className="mx-auto w-full min-w-min lg:w-110">
            <MyProfileCard
              values={{
                address: user.address ?? '',
                designation: '',
                company: '',
                bio: user.bio ?? '',
              }}
              user={user}
            />
            {/* <ProfileDescription
              values={{
                address: user.address ?? '',
                designation: '',
                company: '',
                bio: user.bio ?? '',
              }}
              user={user}
            /> */}
          </div>
          <Separator className="mx-auto my-4 min-w-min lg:w-110" />
          <div className="mx-auto mb-16 w-full min-w-min lg:w-110">
            <h3 className="text-base font-semibold leading-5 text-zinc-900">
              Business card
            </h3>
            {myCards?.map((card, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 border-b border-zinc-100 py-5 last-of-type:border-b-0 lg:max-w-lg"
              >
                <Link
                  href={`/${card.isDefault ? card.user!.username! : card.slug!}`}
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
                      backgroundUrl: card.cardDesign.backgroundImage
                        ? `${apiPaths.serverUrl}${card.cardDesign.backgroundImage}`
                        : undefined,
                    }}
                  />
                </Link>
              </div>
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
