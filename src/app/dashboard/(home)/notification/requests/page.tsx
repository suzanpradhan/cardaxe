'use client';

import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { PaginatedResponseType } from '@/core/types/responseTypes';
import connectApi from '@/module/connect/connectApi';
import { ConnectionType } from '@/module/connect/connectTypes';
import userApi from '@/module/user/userApi';
import { useCallback, useEffect, useRef, useState } from 'react';
import RequestCard from '../(components)/RequestCard';

export default function Page() {
  const [hasMoreData, setHasMoreData] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const scrollableDivRef = useRef<any>(null);

  const dispatch = useAppDispatch();

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

  const allRequests = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries['getConnectRequests']
        ?.data as PaginatedResponseType<ConnectionType>
  );

  useEffect(() => {
    dispatch(userApi.endpoints.getUser.initiate());
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async (currentPage: number) => {
      const response = await Promise.resolve(
        dispatch(connectApi.endpoints.getConnectRequests.initiate(currentPage))
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

  return (
    <div
      className="mt-8 flex-1 overflow-scroll rounded-md bg-inputBgGrey/50"
      ref={scrollableDivRef}
      onScroll={handleScroll}
    >
      <ul className="flex h-full flex-col gap-4 p-4">
        {allRequests?.results.map((request, i) => (
          <RequestCard request={request} key={i} />
        ))}
      </ul>
    </div>
  );
}
