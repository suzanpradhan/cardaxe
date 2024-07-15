import {
  ContentFormUpdateSchemaType,
  DesignFormUpdateSchemaType,
} from '@/module/cards/cardsType';
import { UserType } from '@/module/user/userType';
import { Flash, Heart, More, MoreCircle, Share } from 'iconsax-react';
import Image from 'next/image';
import { VariableValueType } from '../CardLayouts.server';
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
    // <div className="my-5 grid gap-x-4">
    //   <div className="flex items-center justify-stretch gap-4">
    //     <div className="relative h-[105px] w-[105px] overflow-hidden rounded-full bg-zinc-100">
    //       <Image
    //         src={user?.avatar ?? '/profile/profile.png'}
    //         alt="image"
    //         fill
    //         sizes="(max-width: 768px) 100vw, 700px"
    //         objectFit="cover"
    //       />
    //     </div>
    //     <div className="flex grow flex-col gap-1 bg-slate-500">
    //       <h1 className="text-lg font-extrabold sm:text-2xl">
    //         {user?.fullname}
    //       </h1>
    //       <p>
    //         {variableValues?.designation} - {variableValues?.company} |{' '}
    //         {variableValues?.address}
    //       </p>
    //       <div className="flex gap-2">
    //         <ButtonRounded
    //           label={buttonLabel}
    //           isHeader={false}
    //           href="http://localhost:3000/dashboard/myCards/builder/contents"
    //         />
    //       </div>
    //     </div>
    //   </div>
    //   <p>{variableValues?.bio}</p>
    // </div>
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-start gap-4">
        <div className="shrink-0 basis-16 sm:basis-24">
          <div className="relative aspect-square overflow-hidden rounded-full">
            <Image
              src={user?.avatar ?? '/profile/profile.png'}
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
              Istanbul, Turkey | Creative Director - Compelling
            </span>
          </div>
          <div className="hidden grid-cols-12 gap-x-2 gap-y-2 sm:grid">
            <div className="col-span-6">
              <button className="flex h-8 w-full items-center justify-center gap-1 rounded-full bg-blueTheme text-sm font-medium text-white shadow-md shadow-blueTheme/60">
                <Flash size="21" variant="Bulk" />
                Connect
              </button>
            </div>
            <div className="flex items-start justify-start gap-2 sm:col-span-5">
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
        <div className="flex shrink-0 items-start justify-start gap-2 md:col-span-5">
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
        <div className="basis-36">
          <button className="flex h-8 w-full items-center justify-center gap-1 rounded-full bg-blueTheme text-sm font-medium text-white shadow-md shadow-blueTheme/60">
            <Flash size="21" variant="Bulk" />
            Connect
          </button>
        </div>
      </div>
      <div>
        <Description text={variableValues?.bio} />
      </div>
    </div>
  );
};

export default ProfileDescription;
