import { RootState } from '@/app/GlobalRedux/store';
import React from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import ButtonRounded from '../ButtonRounded';
import { Flash, Heart, MoreCircle, Share } from 'iconsax-react';

const buttonLabel = (
  <div className="flex flex-nowrap">
    <Flash size="20" variant="Bulk" className="inline" />{' '}
    <p className="inline">Connect</p>
  </div>
);

const PROFILE_DETAILS_BUTTONS = [
  <Heart
    key={1}
    size="50"
    variant="Bulk"
    className="active:ring-blueTheme active:ring-2 hover:shadow-md rounded-full text-blueTheme"
  />,
  <Share
    key={2}
    size="50"
    className="active:ring-blueTheme active:ring-2 hover:shadow-md rounded-full text-blueTheme"
    variant="Bold"
  />,
  <MoreCircle
    key={3}
    size="50"
    className="active:ring-blueTheme active:ring-2 hover:shadow-md rounded-full text-blueTheme"
    variant="Bulk"
  />,
];

const ProfileDescription = () => {
  const cardState = useSelector((state: RootState) => state.card);

  return (
    <div className="grid gap-4">
      <div className="flex gap-4 bg-transparent">
        <div className="bg-blueTheme h-[120px] w-[120px] relative rounded-full">
          {cardState.designForm.logoUrl && (
            <Image
              src={cardState.designForm.logoUrl}
              alt="Profile pic"
              fill
              sizes="(max-width: 768px) 100vw, 300px"
              objectFit="contain"
            />
          )}
        </div>
        <div className="grid">
          <h1 className="font-extrabold text-2xl">
            {cardState.contentForm.firstName} {cardState.contentForm.middleName}{' '}
            {cardState.contentForm.lastName}
          </h1>
          <p>
            Istanbul, Turkey | {cardState.contentForm.designation} -{' '}
            {cardState.contentForm.company}
          </p>
          <div className="flex gap-2">
            <ButtonRounded
              label={buttonLabel}
              isHeader={false}
              href="http://localhost:3000/dashboard/myCards/builder/contents"
            />
            {PROFILE_DETAILS_BUTTONS.map((item) => item)}
          </div>
        </div>
      </div>
      <p>{cardState.contentForm.bio}</p>
    </div>
  );
};

export default ProfileDescription;
