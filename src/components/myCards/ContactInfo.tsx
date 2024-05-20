import { CardState, CardTemplatesType } from '@/module/cards/cardsType';
import { Call, Location, Send2, Sms } from 'iconsax-react';
import HeadingTitles from '../HeadingTitles';

const ICON_SIZE = '32';
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
  cardFields,
  isTeamComp,
}: {
  cardFields: CardState<CardTemplatesType>['card']['cardFields'];
  isTeamComp: boolean;
}) => {
  const cardFielddDetails = [
    cardFields?.phone,
    cardFields?.email,
    cardFields?.website,
    undefined,
  ];
  const cardInfoWithDetails = CONTACT_INFO.map((item, index) => {
    return { ...item, value: cardFielddDetails[index] };
  });
  return (
    <div>
      {!isTeamComp &&
        cardInfoWithDetails.every((item) => item.value?.length != 0) && (
          <HeadingTitles label={'Contact Info'} />
        )}
      <div className="grid divide-y-2 border-2 rounded-lg gap-2">
        {cardInfoWithDetails
          .filter((item) => item.value != undefined && item.value.length != 0)
          .map((item, index) => (
            <div key={index} className="flex justify-between p-2">
              <div className="grid">
                <p className="text-grayfont">{item.contactType}</p>
                <h2 className="text-lg font-bold">{item.value}</h2>
              </div>
              <div className="hover:shadow-md hover:scale-110 text-grayfont rounded-full bg-componentBgGrey h-12 w-12 flex justify-center items-center">
                {item.icon}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ContactInfo;
