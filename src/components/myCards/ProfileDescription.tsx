import { apiPaths } from '@/core/api/apiConstants';
import { UserType } from '@/module/user/userType';
import { Flash, Heart, More, MoreCircle, Share } from 'iconsax-react';
import Image from 'next/image';
import Description from './Description';

const PROFILE_DETAILS_BUTTONS = [
  <Heart
    key={1}
    size="40"
    variant="Bulk"
    className="rounded-full text-blueTheme hover:shadow-md active:ring-2 active:ring-blueTheme"
  />,
  <Share
    key={2}
    size="40"
    className="rounded-full text-blueTheme hover:shadow-md active:ring-2 active:ring-blueTheme"
    variant="Bold"
  />,
  <MoreCircle
    key={3}
    size="40"
    className="rounded-full text-blueTheme hover:shadow-md active:ring-2 active:ring-blueTheme"
    variant="Bulk"
  />,
];

type ProfileValueType = {
  address: string;
  designation: string;
  company: string;
  bio: string;
};

const ProfileDescription = ({
  values,
  user,
}: {
  values: ProfileValueType;
  user?: UserType;
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-start gap-4">
        <div className="shrink-0 basis-16 sm:basis-20">
          <div className="relative aspect-square overflow-hidden rounded-full">
            <Image
              src={
                user?.avatar
                  ? user.avatar.startsWith('https')
                    ? user.avatar
                    : `${apiPaths.serverUrl}${user.avatar}`
                  : '/square_image.jpg'
              }
              alt="user_profile_image"
              fill
              sizes="(max-width: 768px) 100vw, 700px"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="flex grow flex-col items-stretch justify-between gap-2">
          <div className="flex flex-col items-start justify-start">
            <h3 className="text-lg font-semibold leading-5 text-zinc-900">
              {user?.fullname}
            </h3>
            <span className="text-normal text-sm text-zinc-400">
              {values?.address} {values?.designation && '|'}{' '}
              {values?.designation} {values?.company && '-'} {values?.company}
            </span>
          </div>
          <div className="flex gap-2">
            <button className="flex h-8 w-48 items-center justify-center gap-1 rounded-full bg-blueTheme text-sm font-medium text-white shadow-md shadow-blueTheme/60">
              <Flash size="21" variant="Bulk" />
              Connect
            </button>
            <div className="col-span-5 flex items-center justify-start gap-2">
              <div className="flex aspect-square w-8 items-center justify-center rounded-full bg-zinc-100 text-blueTheme">
                <Heart size="21" variant="Bulk" />
              </div>
              <div className="flex aspect-square w-8 items-center justify-center rounded-full bg-zinc-100 text-blueTheme">
                <Share size="21" variant="Bulk" />
              </div>
              <div className="flex aspect-square w-8 items-center justify-center rounded-full bg-zinc-100 text-blueTheme">
                <More size="21" variant="TwoTone" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 sm:hidden">
        <div className="basis-36">
          <button className="flex h-8 w-full items-center justify-center gap-1 rounded-full bg-blueTheme text-sm font-medium text-white shadow-md shadow-blueTheme/60">
            <Flash size="21" variant="Bulk" />
            Connect
          </button>
        </div>
        <div className="flex shrink-0 items-start justify-start gap-2">
          <div className="flex aspect-square w-8 items-center justify-center rounded-full bg-zinc-100 text-blueTheme">
            <Heart size="21" variant="Bulk" />
          </div>
          <div className="flex aspect-square w-8 items-center justify-center rounded-full bg-zinc-100 text-blueTheme">
            <Share size="21" variant="Bulk" />
          </div>
          <div className="flex aspect-square w-8 items-center justify-center rounded-full bg-zinc-100 text-blueTheme">
            <More size="21" variant="TwoTone" />
          </div>
        </div>
      </div>
      <div>
        <Description text={values?.bio} />
      </div>
    </div>
  );
};

export default ProfileDescription;
