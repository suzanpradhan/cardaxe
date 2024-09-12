'use client';
import UserProfileCard from '@/components/dashboard/UserProfileCard';
import { useRouter } from 'next/navigation';

import HomePageCard from '@/components/HomePageCard';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { PaginatedResponseType } from '@/core/types/responseTypes';
import { cn } from '@/lib/utils';
import cardsApi from '@/module/cards/cardsApi';
import { CardResponseType, CardTemplatesType } from '@/module/cards/cardsType';
import connectApi from '@/module/connect/connectApi';
import userApi from '@/module/user/userApi';
import { UserType } from '@/module/user/userType';
import { BoxAdd, PenAdd, ScanBarcode, Share } from 'iconsax-react';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import HomePageAside from '../(components)/HomePageAside';

const ICONS_COMMON_CLASS: string = 'p-3 rounded-full h-12 w-12 hover:shadow-lg';

const NAVIGATION_ICONS = [
  <PenAdd
    size="32"
    variant="Bulk"
    key={0}
    className={cn('bg-[#d3f4df] text-[#23c562]', ICONS_COMMON_CLASS)}
  />,
  <BoxAdd
    size="32"
    variant="Bulk"
    key={1}
    className={cn('bg-[#ffe9cc] text-[#fba530]', ICONS_COMMON_CLASS)}
  />,
  <ScanBarcode
    size="32"
    variant="Bulk"
    key={2}
    className={cn('bg-[#ffd5d6] text-[#ff1843]', ICONS_COMMON_CLASS)}
  />,
  <Share
    size="32"
    variant="Bulk"
    key={3}
    className={cn('bg-[#d5e3ff] text-[#2f73fe]', ICONS_COMMON_CLASS)}
  />,
];
const OPTIONS = ['About', 'Help', 'Privacy', 'Terms', 'Language'];

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector(
    (state: RootState) => state.baseApi.queries[`getUser`]?.data as UserType
  );
  const scrollableDivRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    dispatch(userApi.endpoints.getUser.initiate());
  }, [dispatch]);

  const handleScroll = useCallback(async () => {
    const scrollableDiv = scrollableDivRef.current;

    if (
      scrollableDiv.scrollTop + scrollableDiv.clientHeight >=
        scrollableDiv.scrollHeight - 100 &&
      !isLoading &&
      hasMoreData
    ) {
      setIsLoading(true);
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage]);

  useEffect(() => {
    // console.log('currentPage', currentPage, hasMoreData);
    const fetchData = async (currentPage: number) => {
      const response = await Promise.resolve(
        dispatch(cardsApi.endpoints.getAllCards.initiate(currentPage))
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

  const allCardsList = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries['getAllCards']?.data as PaginatedResponseType<
        CardResponseType<CardTemplatesType>
      >
  );

  const handleConnect = (user: UserType) => {
    dispatch(
      connectApi.endpoints.sendRequest.initiate({
        to_user: {
          fullname: user.fullname,
          email: user.email,
          username: user.username,
        },
        from_user: {
          fullname: userProfile.fullname,
          email: userProfile.email,
          username: userProfile.username,
        },
        accepted: false,
        id: user.id,
        timestamp: new Date().toISOString(),
      })
    );
  };

  const handleLike = (cardId: number) => {
    dispatch(
      cardsApi.endpoints.likeCard.initiate({
        card: cardId.toString(),
        user: userProfile.id.toString(),
      })
    );
  };
  const handleDislike = (cardSlug: string) => {
    dispatch(cardsApi.endpoints.dislikeCard.initiate(cardSlug));
  };

  return (
    <div className="grid h-full grid-cols-12">
      <div className="full col-span-12 grid grid-cols-12 xl:col-span-8 xl:col-start-3">
        <div
          className="full col-span-12 overflow-y-scroll border-zinc-100 max-lg:mb-20 lg:col-span-6 lg:border-r xl:col-span-7"
          ref={scrollableDivRef}
          onScroll={handleScroll}
        >
          <div className="flex grow flex-col">
            {allCardsList?.results?.map((card, index) => (
              <HomePageCard
                card={card}
                index={index}
                userProfile={userProfile}
                key={index}
              />
            ))}
          </div>
        </div>

        <div className="sticky top-0 hidden h-screen shrink-0 py-4 lg:col-span-6 lg:block xl:col-span-5">
          <div className="relative flex h-full min-w-[24rem] max-w-sm grow flex-col justify-between px-4">
            <div className="flex flex-col gap-4">
              <UserProfileCard
                fullName={userProfile?.fullname}
                avatar={userProfile?.avatar ?? undefined}
              />
              <HomePageAside userName={userProfile?.username} />
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
