'use client';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import userApi from '@/module/user/userApi';
import { UserType } from '@/module/user/userType';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import FollowItems from './(common)/FollowItems';

const MyProfileCard = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(
    (state: RootState) => state.baseApi.queries[`getUser`]?.data as UserType
  );

  useEffect(() => {
    dispatch(userApi.endpoints.getUser.initiate());
  }, [dispatch]);

  return (
    <div className="bg-white px-5 py-5">
      <div className="grid grid-cols-12 grid-rows-2 sm:grid-rows-1 place-content-center gap-y-4 mb-5">
        <div className="col-span-3 row-span-1">
          <div className="relative overflow-hidden w-16 sm:w-24 h-16 sm:h-24 rounded-full">
            <Image
              src={`/profile/profile.png`}
              alt="profile-image"
              objectFit="cover"
              layout="fill"
              sizes="(max-width: 2000px) 75vw, 33vw"
            />
          </div>
        </div>
        <div className="col-span-9 row-span-1 flex sm:flex-none flex-col justify-center">
          <div className="grid grid-cols-12 sm:grid-rows-2 gap-y-2 gap-x-2">
            <div className="col-span-12 row-span-1 sm:grid grid-cols-12 gap-x-2 hidden">
              <FollowItems label="Connection" value="634" />
              <FollowItems label="Followers" value="1.5k" />
              <FollowItems label="Following" value="256" />
            </div>
            <div className="col-span-12 sm:row-span-2">
              <div className="flex items-center justify-evenly h-full">
                <button
                  className="bg-slate-100 text-sm font-medium text-blueTheme/75 mx-auto w-5/12 h-10 rounded-full hover:shadow"
                  onClick={() => router.push('/dashboard/profile/update')}
                >
                  Edit
                </button>
                <button className="bg-slate-100 text-sm font-medium text-blueTheme/75 mx-auto w-5/12 h-10 rounded-full hover:shadow">
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 row-span-1 grid grid-cols-12 gap-x-2 sm:hidden place-content-center place-items-stretch">
          <FollowItems label="Connection" value="634" />
          <FollowItems label="Followers" value="1.5k" />
          <FollowItems label="Following" value="256" />
        </div>
      </div>
      <div className="flex flex-col items-start gap-1 w-full">
        <h3 className="text-xl font-bold">{user?.fullname}</h3>
        <p className="font-normal text-sm text-grayfont">
          Kathmandu, Nepal | Creative Director - Kurma Tech
        </p>
        <p className="font-normal text-sm text-grayfont">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
          minus debitis dicta dolorem magni fuga vel sint? Minus, quibusdam
          repellat.
        </p>
      </div>
    </div>
  );
};

export default MyProfileCard;
