import { CardState, CardTemplatesType } from '@/module/cards/cardsType';
import { Flash, Heart, MoreCircle, Share } from 'iconsax-react';
import ButtonRounded from '../ButtonRounded';

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

const ProfileDescription = ({
  card,
}: {
  card: CardState<CardTemplatesType | string>;
}) => {
  return (
    <div className="grid gap-4">
      <div className="flex gap-4 bg-transparent">
        <div className="bg-blueTheme h-[120px] w-[120px] relative rounded-full">
          {/* {card.cardDesign.logoUrl && (
            <Image
              src={card.cardDesign.logoUrl}
              alt="Profile pic"
              fill
              sizes="(max-width: 768px) 100vw, 300px"
              objectFit="contain"
            />
          )} */}
        </div>
        <div className="grid">
          <h1 className="font-extrabold text-2xl">
            {card.cardFields.values.middleName}{' '}
            {card.cardFields.values.middleName}{' '}
            {card.cardFields.values.lastName}
          </h1>
          <p>
            Istanbul, Turkey | {card.cardFields.values.designation} -{' '}
            {card.cardFields.values.company}
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
      <p>{card.cardFields.values.bio}</p>
    </div>
  );
};

export default ProfileDescription;
