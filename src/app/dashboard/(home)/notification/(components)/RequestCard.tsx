import { apiPaths } from '@/core/api/apiConstants';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import connectApi from '@/module/connect/connectApi';
import { ConnectionType, ConnectUserType } from '@/module/connect/connectTypes';
import { UserType } from '@/module/user/userType';
import { useMutation } from 'convex/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '../../../../../../convex/_generated/api';
import profileImage from '../../../../../../public/profile/profile.png';

export default function RequestCard({ request }: { request: ConnectionType }) {
  const [accepted, toggleAccepted] = useState(false);
  const dispatch = useAppDispatch();
  const addMember = useMutation(api.rooms.addMembers);

  const createRoom = useMutation(api.rooms.createRoom);

  useEffect(() => {
    if (request.accepted) {
      toggleAccepted(true);
    } else {
      toggleAccepted(false);
    }
  }, [request.accepted]);

  const userProfile = useAppSelector(
    (state: RootState) => state.baseApi.queries[`getUser`]?.data as UserType
  );

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
    <li className="flex items-center gap-4">
      <Link
        className="relative h-16 w-16 rounded-full"
        href={'/dashboard/account/' + request.from_user.username}
      >
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
      </Link>
      <div className="grow">
        <p>
          <Link
            href={'/dashboard/account/' + request.from_user.username}
            className="font-bold"
          >
            {request.from_user.fullname}
          </Link>{' '}
          sent you a reuest.
        </p>
        <p className="text-sm text-grayfont">5h ago</p>
      </div>
      {accepted === false ? (
        <div className="flex gap-4">
          <button
            className="rounded-md bg-blueTheme px-3 py-2 text-white"
            onClick={() => handleAcceptRequest(request.from_user, request.id)}
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
  );
}
