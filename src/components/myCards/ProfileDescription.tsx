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
    <div className="my-5 grid gap-x-4">
      <div className="flex items-center justify-stretch gap-4">
        <div className="relative h-[105px] w-[105px] overflow-hidden rounded-full bg-zinc-100">
          <Image
            src={user?.avatar ?? '/profile/profile.png'}
            alt="image"
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            objectFit="cover"
          />
        </div>
        <div className="flex grow flex-col gap-1 bg-slate-500">
          <h1 className="text-lg font-extrabold sm:text-2xl">
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
