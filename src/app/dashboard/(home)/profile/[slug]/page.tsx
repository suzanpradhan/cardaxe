'use client';

import CardLayouts from '@/components/CardLayouts.server';
import ProfileDescription from '@/components/myCards/ProfileDescription';
import { apiPaths } from '@/core/api/apiConstants';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { PaginatedResponseType } from '@/core/types/responseTypes';
import cardsApi from '@/module/cards/cardsApi';
import { CardResponseType, CardTemplatesType } from '@/module/cards/cardsType';
import userApi from '@/module/user/userApi';
import { UserType } from '@/module/user/userType';
import { useEffect, useState } from 'react';

export default function Page({ params }: { params: { slug: string } }) {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(userApi.endpoints.getPublicProfile.initiate(params.slug));
  }, [dispatch]);

  const userProfile = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getPublicProfile`]?.data as UserType
  );

  const userCards = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries['getUsersCard']?.data as PaginatedResponseType<
        CardResponseType<CardTemplatesType>
      >
  );

  useEffect(() => {
    // console.log('currentPage', currentPage, hasMoreData);
    const fetchData = async (currentPage: number) => {
      const response = await Promise.resolve(
        dispatch(
          cardsApi.endpoints.getUsersCard.initiate({
            pageNumber: currentPage,
            slug: params.slug,
          })
        )
      );
      if (response.data) {
        if (
          response.data!.pagination.currentPage >=
          response.data!.pagination.totalPage
        ) {
          setHasMoreData(false);
        }
      }
    };

    if (hasMoreData) {
      fetchData(currentPage);
    }
    setIsLoading(false);
  }, [dispatch, currentPage]);

  console.log(userCards);

  return (
    <div className="my-4 flex w-full flex-col gap-4">
      {userProfile ? (
        <>
          <div className="mx-auto w-140 min-w-min border-1 border-borderMain p-4">
            <ProfileDescription
              values={{
                address: userProfile.address!,
                designation: '',
                company: '',
                bio: userProfile.bio ?? '',
              }}
              user={userProfile}
            />
          </div>
          <div className="mx-auto w-140 min-w-min border-1 border-borderMain p-4">
            <h2></h2>
            <h3 className="text-base font-semibold leading-5 text-zinc-900">
              Business card
            </h3>
            {userCards?.results?.map((card, index) => (
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
