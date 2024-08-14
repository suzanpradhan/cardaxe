'use client';

import ButtonForm from '@/components/ButtonForm';
import SearchInput from '@/components/SearchInput';
import MyTeamsCard from '@/components/teams/MyTeamsCard';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { PaginatedResponseType } from '@/core/types/responseTypes';
import teamsApi from '@/module/teams/teamApi';
import { Team } from '@/module/teams/teamTypes';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

const Page = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const scrollableDivRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [hasMoreData, setHasMoreData] = useState(true);

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
        dispatch(teamsApi.endpoints.getMyTeams.initiate(currentPage))
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

  const teamsResponse = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries.getMyTeams?.data as PaginatedResponseType<Team>
  );
  const handleClick = () => router.push('/dashboard/teams/createNewTeam');

  return (
    <div className="mx-auto grid max-w-5xl gap-4 p-4">
      <h2 className="font-bold">My Teams</h2>
      <div className="flex gap-2">
        <div className="grow">
          <SearchInput greyBackground={false} />
        </div>
        <div className="rounded-lg shadow-md shadow-blueTheme">
          <ButtonForm
            label="Create Team"
            theme="blue"
            handleClick={handleClick}
          />
        </div>
      </div>
      <div
        className="flex flex-wrap justify-between gap-4"
        ref={scrollableDivRef}
        onScroll={handleScroll}
      >
        {teamsResponse?.results.map((item, index) => (
          <MyTeamsCard
            key={index}
            id={item.id!.toString()}
            logo={item.logo}
            organizationName={item.name}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
