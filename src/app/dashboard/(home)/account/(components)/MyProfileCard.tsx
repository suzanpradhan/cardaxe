'use client';
import Description from '@/components/myCards/Description';
import { apiPaths } from '@/core/api/apiConstants';
import { useAppDispatch } from '@/core/redux/clientStore';
import { getMinUserName } from '@/core/utils/generalFunctions';
import userApi from '@/module/user/userApi';
import { UserType } from '@/module/user/userType';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import FollowItems from './(common)/FollowItems';

type ProfileValueType = {
  address: string;
  designation: string;
  company: string;
  bio: string;
};

const MyProfileCard = ({
  values,
  user,
  userProfile,
  cardId,
  cardSlug,
}: {
  values: ProfileValueType;
  user?: UserType;
  userProfile?: UserType;
  cardId?: number;
  cardSlug?: string;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  // const user = useAppSelector(
  //   (state: RootState) => state.baseApi.queries[`getUser`]?.data as UserType
  // );

  useEffect(() => {
    dispatch(userApi.endpoints.getUser.initiate());
  }, [dispatch]);

  return (
    <div className="bg-white">
      <div className="mb-2 grid grid-cols-12 grid-rows-2 place-content-center gap-y-1 sm:grid-rows-1">
        <div className="col-span-3 row-span-1">
          <div className="relative h-16 w-16 overflow-hidden rounded-full sm:h-24 sm:w-24">
            {user?.avatar && user.avatar.startsWith('https') ? (
              <Image
                src={
                  user?.avatar
                    ? user.avatar.startsWith('https')
                      ? user.avatar
                      : `${apiPaths.serverUrl}${user.avatar}`
                    : '/square_image.jpg'
                }
                alt="profile-avatar"
                objectFit="cover"
                layout="fill"
                sizes="(max-width: 2000px) 75vw, 33vw"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-blue-700">
                {user?.fullname && (
                  <h5 className="text-base font-extrabold text-white">
                    {getMinUserName(user?.fullname)}
                  </h5>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="col-span-9 row-span-1 flex flex-col justify-center sm:flex-none">
          <div className="grid grid-cols-12 gap-x-2 gap-y-2 sm:grid-rows-2">
            <div className="/hidden /sm:grid col-span-12 row-span-1 grid grid-cols-12 gap-x-2">
              <FollowItems label="Cards" value="1.5k" />
              <FollowItems label="Teams" value="256" />
              <FollowItems label="Connection" value="634" />
            </div>
            <div className="col-span-12 hidden sm:row-span-2 sm:block">
              <div className="flex h-full items-center justify-evenly">
                <button
                  className="mx-auto h-10 w-5/12 rounded-full bg-slate-100 text-sm font-medium text-blueTheme/75 hover:shadow"
                  onClick={() => router.push('/dashboard/account/me/update')}
                >
                  Edit
                </button>
                <button className="mx-auto h-10 w-5/12 rounded-full bg-slate-100 text-sm font-medium text-blueTheme/75 hover:shadow">
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 block sm:row-span-2 sm:hidden">
          <div className="flex h-full items-center justify-stretch gap-2">
            <button
              className="h-8 grow rounded-md bg-slate-100 text-xs font-medium text-black hover:shadow"
              onClick={() => router.push('/dashboard/account/me/update')}
            >
              Edit profile
            </button>
            <button className="h-8 grow rounded-md bg-slate-100 text-xs font-medium text-black hover:shadow">
              Share profile
            </button>
            {/* <button className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 text-xs font-medium text-black hover:shadow">
              <UserPlus size={16} />
            </button> */}
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-start gap-1">
        <h3 className="font-bold sm:text-base lg:text-xl">{user?.fullname}</h3>
        <p className="text-sm font-normal text-gray-600">
          {values?.address} {values?.designation && '|'} {values?.designation}{' '}
          {values?.company && '-'} {values?.company}
        </p>
        <Description text={values?.bio} />
        {/* <p className="cursor-pointer text-sm font-normal text-grayfont">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
          minus debitis dicta dolorem magni fuga vel sint? Minus, quibusdam
          repellat.
        </p> */}
      </div>
    </div>
  );
};

export default MyProfileCard;
