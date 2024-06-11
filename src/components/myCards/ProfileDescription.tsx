import {
  ContentFormUpdateSchemaType,
  DesignFormUpdateSchemaType,
} from '@/module/cards/cardsType';
import { Flash, Heart, MoreCircle, Share } from 'iconsax-react';
import ButtonRounded from '../ButtonRounded';
import { VariableValueType } from '../CardLayouts';

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
  card,
}: {
  card: ContentFormUpdateSchemaType &
    DesignFormUpdateSchemaType &
    VariableValueType;
}) => {
  return (
    <div className="grid gap-4">
      <div className="flex gap-4 bg-transparent">
        <div className="bg-blueTheme h-[120px] w-[120px] relative rounded-full"></div>
        <div className="flex flex-col h-full justify-center gap-1">
          <h1 className="sm:text-2xl text-lg font-extrabold ">
            {card?.firstName} {card?.middleName} {card?.lastName}
          </h1>
          <p>
            Istanbul, Turkey | {card?.designation} - {card?.company}
          </p>
          <div className="flex gap-2">
            <ButtonRounded
              label={buttonLabel}
              isHeader={false}
              href="http://localhost:3000/dashboard/myCards/builder/contents"
            />
            {/* {PROFILE_DETAILS_BUTTONS.map((item) => item)} */}
          </div>
        </div>
      </div>
      <p>{card?.bio}</p>
    </div>
  );
};

export default ProfileDescription;
