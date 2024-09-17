'use client';

import CardLayouts from '@/components/CardLayouts.server';
import UserProfileDescription from '@/components/myCards/UserProfileDescription';
import { Separator } from '@/components/ui/separator';
import { apiPaths } from '@/core/api/apiConstants';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { PaginatedResponseType } from '@/core/types/responseTypes';
import cardsApi from '@/module/cards/cardsApi';
import { CardResponseType, CardTemplatesType } from '@/module/cards/cardsType';
import userApi from '@/module/user/userApi';
import { UserType } from '@/module/user/userType';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function Page({ params }: { params: { slug: string } }) {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const scrollableDivRef = useRef<any>(null);

  const [hasMoreData, setHasMoreData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(userApi.endpoints.getPublicProfile.initiate(params.slug));
  }, [dispatch]);

  const userProfile = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getPublicProfile-${params.slug}`]?.data as UserType
  );

  const userCards = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries['getUsersCard']?.data as PaginatedResponseType<
        CardResponseType<CardTemplatesType>
      >
  );

  const handleScroll = useCallback(async () => {
    const scrollableDiv = scrollableDivRef.current;

    if (
      scrollableDiv.scrollTop + scrollableDiv.clientHeight >=
        scrollableDiv.scrollHeight - 50 &&
      !isLoading &&
      hasMoreData
    ) {
      setIsLoading(true);
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage]);

  useEffect(() => {
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

  useEffect(() => {
    const scrollableDiv = scrollableDivRef.current;
    scrollableDiv?.addEventListener('scroll', handleScroll);
    return () => {
      scrollableDiv?.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  console.log('userProfile', userProfile);

  return (
    <div className="mx-auto my-4 flex w-full flex-col gap-4 max-lg:w-96 max-sm:px-4">
      {userProfile ? (
        <div
          className="h-[calc(100vh)] overflow-y-scroll"
          ref={scrollableDivRef}
          onScroll={handleScroll}
        >
          <div className="mx-auto w-full min-w-min lg:w-110">
            <UserProfileDescription
              values={{
                address: userProfile.address!,
                designation: '',
                company: '',
                bio: userProfile.bio ?? '',
              }}
              user={userProfile}
            />
          </div>
          <Separator className="mx-auto my-4 min-w-min lg:w-110" />
          <div className="mx-auto mb-16 w-full min-w-min lg:w-110">
            <h3 className="text-base font-semibold leading-5 text-zinc-900">
              Business card
            </h3>
            {userCards?.results?.map((card, index) => (
              <div
                key={index}
                className="mx-auto flex w-full flex-col gap-4 border-b border-zinc-100 py-5 last-of-type:border-b-0"
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
                      backgroundUrl: `${apiPaths.serverUrl}${card.cardDesign.backgroundImage}`,
                    }}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
