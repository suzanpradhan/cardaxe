import {
  ContentFormUpdateSchemaType,
  DesignFormUpdateSchemaType,
} from '@/module/cards/cardsType';
import { UserType } from '@/module/user/userType';
import { Flash, Heart, MoreCircle, Share } from 'iconsax-react';
import Image from 'next/image';
import ButtonRounded from '../ButtonRounded';
import { VariableValueType } from '../CardLayouts.server';

const buttonLabel = (
  <div className="flex flex-nowrap">
    <Flash size="20" variant="Bulk" className="inline" />{' '}
    <p className="inline">Connect</p>
  </div>
);

const PROFILE_DETAILS_BUTTONS = [
  <Heart
    key={1}
    size="40"
    variant="Bulk"
    className="active:ring-blueTheme active:ring-2 hover:shadow-md rounded-full text-blueTheme"
  />,
  <Share
    key={2}
    size="40"
    className="active:ring-blueTheme active:ring-2 hover:shadow-md rounded-full text-blueTheme"
    variant="Bold"
  />,
  <MoreCircle
    key={3}
    size="40"
    className="active:ring-blueTheme active:ring-2 hover:shadow-md rounded-full text-blueTheme"
    variant="Bulk"
  />,
];

const ProfileDescription = ({
  variableValues,
  user,
}: {
  variableValues: ContentFormUpdateSchemaType &
    DesignFormUpdateSchemaType &
    VariableValueType;
  user?: UserType;
}) => {
  return (
    <div className="grid gap-x-4 my-5">
      <div className="flex items-center justify-stretch gap-4">
        <div className="relative bg-zinc-100 overflow-hidden h-[105px] w-[105px] rounded-full">
          <Image
            src={user?.avatar ?? '/profile/profile.png'}
            alt="image"
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            objectFit="cover"
          />
        </div>
        <div className="grow flex flex-col gap-1 bg-slate-500">
          <h1 className="sm:text-2xl text-lg font-extrabold ">
            {user?.fullname}
          </h1>
          <p>
            {variableValues?.designation} - {variableValues?.company} |{' '}
            {variableValues?.address}
          </p>
          <div className="flex gap-2">
            <ButtonRounded
              label={buttonLabel}
              isHeader={false}
              href="http://localhost:3000/dashboard/myCards/builder/contents"
            />
          </div>
        </div>
      </div>
      <p>{variableValues?.bio}</p>
    </div>
  );
};

export default ProfileDescription;
