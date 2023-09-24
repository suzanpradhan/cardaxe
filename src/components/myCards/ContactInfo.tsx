import { Call, Sms, Location, Send2 } from 'iconsax-react';
import React from 'react';

const ICON_SIZE = '32';
// const ICON_CLASSNAME = 'text-grey-200';

const CONTACT_INFO = [
  {
    contactType: 'Phone',
    contactID: 1321465489,
    icon: <Call size={ICON_SIZE} variant="Bulk" />,
  },
  {
    contactType: 'Email',
    contactID: 'avishek@some.com',
    icon: <Sms size={ICON_SIZE} variant="Bulk" />,
  },
  {
    contactType: 'Website',
    contactID: 'www.some.com',
    icon: <Send2 size={ICON_SIZE} variant="Bulk" />,
  },
  {
    contactType: 'Location',
    contactID: 'Istanbul, Turkey',
    icon: <Location size={ICON_SIZE} variant="Bulk" />,
  },
];

const ContactInfo = () => {
  return (
    <div className="grid divide-y-2 border-2 rounded-lg gap-2">
      {CONTACT_INFO.map((item, index) => (
        <div key={index} className="flex justify-between p-2">
          <div className="grid">
            <p className="text-grayfont">{item.contactType}</p>
            <h2 className="text-lg font-bold">{item.contactID}</h2>
          </div>
          <div className="text-grayfont rounded-full bg-componentBgGrey h-12 w-12 flex justify-center items-center">
            {item.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactInfo;
