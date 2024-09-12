'use client';

import { apiPaths } from '@/core/api/apiConstants';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { PaginatedResponseType } from '@/core/types/responseTypes';
import connectApi from '@/module/connect/connectApi';
import { ConnectionType, ConnectUserType } from '@/module/connect/connectTypes';
import userApi from '@/module/user/userApi';
import { UserType } from '@/module/user/userType';
import { useMutation } from 'convex/react';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { api } from '../../../../../../convex/_generated/api';
import profileImage from '../../../../../../public/profile/profile.png';

export default function Page() {
  const [hasMoreData, setHasMoreData] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const scrollableDivRef = useRef<any>(null);
  const addMember = useMutation(api.rooms.addMembers);

  const createRoom = useMutation(api.rooms.createRoom);
  const dispatch = useAppDispatch();

  const userProfile = useAppSelector(
    (state: RootState) => state.baseApi.queries[`getUser`]?.data as UserType
  );

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

  const handleAcceptRequest = async (
    toUser: ConnectUserType,
    requestId: number
  ) => {
    await dispatch(
      connectApi.endpoints.acceptRequest.initiate({
        to_user: {
          fullname: toUser.fullname,
          email: toUser.email,
          username: toUser.username,
        },
        from_user: {
          fullname: userProfile?.fullname,
          email: userProfile?.email,
          username: userProfile?.username,
        },
        accepted: false,
        id: requestId,
        timestamp: new Date().toISOString(),
      })
    )
      .then((response: any) => {
        console.log('here');
        createRoom({ name: `${userProfile.id} - ${toUser.id}` });
        addMember({
          profileId: userProfile.id.toString(),
          roomName: `${userProfile.id} - ${toUser.id}`,
        });
        if (toUser.id) {
          addMember({
            profileId: toUser.id.toString(),
            roomName: `${userProfile.id} - ${toUser.id}`,
          });
        }
      })
      .catch(Error);
  };

  return (
    <div
      className="mt-8 flex-1 overflow-scroll rounded-md bg-inputBgGrey/50"
      ref={scrollableDivRef}
      onScroll={handleScroll}
    >
      <ul className="flex h-full flex-col gap-4 p-4">
        {allRequests?.results.map((request, i) => (
          <li className="flex items-center gap-4" key={i}>
            <div className="relative h-16 w-16 rounded-full">
              <Image
                className="rounded-full"
                src={
                  request.from_user.avatar
                    ? `${apiPaths.serverUrl}${request.from_user.avatar}`
                    : profileImage
                }
                alt="image"
                fill
                sizes="(max-width: 768px) 100vw, 700px"
                objectFit="contain"
              />
            </div>
            <div className="grow">
              <p>
                <span className="font-bold">{request.from_user.fullname}</span>{' '}
                sent you a reuest.
              </p>
              <p className="text-sm text-grayfont">5h ago</p>
            </div>
            {request.accepted === false ? (
              <div className="flex gap-4">
                <button
                  className="rounded-md bg-blueTheme px-3 py-2 text-white"
                  onClick={() =>
                    handleAcceptRequest(request.from_user, request.id)
                  }
                >
                  Accept
                </button>
                <button className="rounded-md bg-red-500 px-3 py-2 text-white">
                  Decline
                </button>
              </div>
            ) : (
              <></>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
