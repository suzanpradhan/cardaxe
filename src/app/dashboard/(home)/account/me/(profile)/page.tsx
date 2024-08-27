'use client';

import CardLayouts from '@/components/CardLayouts.server';
import ProfileDescription from '@/components/myCards/ProfileDescription';
import { apiPaths } from '@/core/api/apiConstants';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import cardsApi from '@/module/cards/cardsApi';
import { CardResponseType, CardTemplatesType } from '@/module/cards/cardsType';
import userApi from '@/module/user/userApi';
import { UserType } from '@/module/user/userType';
import { useEffect, useState } from 'react';

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
    <div className="my-4 flex w-full flex-col gap-4">
      {user ? (
        <>
          <div className="mx-auto w-140 min-w-min border-1 border-borderMain p-4">
            <ProfileDescription
              values={{
                address: user.address ?? '',
                designation: '',
                company: '',
                bio: user.bio ?? '',
              }}
              user={user}
            />
          </div>
          <div className="mx-auto w-140 min-w-min border-1 border-borderMain p-4">
            <h2></h2>
            <h3 className="text-base font-semibold leading-5 text-zinc-900">
              Business card
            </h3>
            {myCards?.map((card, index) => (
              <div
                key={index}
                className="mx-auto flex w-full flex-col gap-4 border-b border-zinc-100 px-2 py-5 xs:px-0"
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
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
