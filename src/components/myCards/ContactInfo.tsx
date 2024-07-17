import {
  ContentFormUpdateSchemaType,
  DesignFormUpdateSchemaType,
} from '@/module/cards/cardsType';
import { Call, Location, Send2, Sms } from 'iconsax-react';
import { VariableValueType } from '../CardLayouts.server';
import HeadingTitles from '../HeadingTitles';

const ICON_SIZE = '24';
// const ICON_CLASSNAME = 'text-grey-200';

const CONTACT_INFO = [
  {
    contactType: 'Phone',
    icon: <Call size={ICON_SIZE} variant="Bulk" />,
  },
  {
    contactType: 'Email',
    icon: <Sms size={ICON_SIZE} variant="Bulk" />,
  },
  {
    contactType: 'Website',
    icon: <Send2 size={ICON_SIZE} variant="Bulk" />,
  },
  {
    contactType: 'Location',
    icon: <Location size={ICON_SIZE} variant="Bulk" />,
  },
];

const ContactInfo = ({
  cardValues,
  isTeamComp,
}: {
  cardValues: ContentFormUpdateSchemaType &
    DesignFormUpdateSchemaType &
    VariableValueType;
  isTeamComp: boolean;
}) => {
  const cardFielddDetails = [
    cardValues.phone,
    cardValues.email,
    cardValues.website,
    undefined,
  ];
  const cardInfoWithDetails = CONTACT_INFO.map((item, index) => {
    return { ...item, value: cardFielddDetails[index] };
  });
  return (
    <div className="flex flex-col gap-4">
      {!isTeamComp &&
        cardInfoWithDetails.every((item) => item.value?.length != 0) && (
          <HeadingTitles label={'Contact Info'} />
        )}
      <div className="rounded-md border-1">
        {cardInfoWithDetails
          .filter((item) => item.value != undefined && item.value.length != 0)
          .map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b border-zinc-200 px-4 py-2 last-of-type:border-b-0"
            >
              <div className="flex flex-col justify-center">
                <p className="text-xs font-normal leading-6 text-zinc-400 md:text-base">
                  {item.contactType}
                </p>
                <h3 className="text-xs font-semibold leading-6 text-zinc-800 md:text-base">
                  {item.value}
                </h3>
              </div>
              <div className="flex aspect-square h-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 hover:scale-110 hover:shadow-md">
                {item.icon}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ContactInfo;
