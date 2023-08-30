import clsx from 'clsx';
import { BoxAdd, Colorfilter, DocumentText1, Grid7 } from 'iconsax-react';
import React, { useState } from 'react';

const MY_APP_SIDE_BAR_ELEMENTS = [
  {
    icon: <DocumentText1 size="40" variant="Bulk" />,
    name: 'Layouts',
  },
  {
    icon: <Grid7 size="40" variant="Bulk" />,
    name: 'Contents',
  },
  {
    icon: <Colorfilter size="40" variant="Bulk" />,
    name: 'Designs',
  },
  {
    icon: <BoxAdd size="40" variant="Bulk" />,
    name: 'Infos',
  },
];

const SideBarMyApp = () => {
  const [toggleTab, setToggleTab] = useState<number>(0);
  return (
    <div className="w-28 flex flex-col gap-4 h-full text-slate-600">
      {MY_APP_SIDE_BAR_ELEMENTS.map((item, index) => (
        <button
          onClick={() => setToggleTab(index)}
          className={clsx(
            'flex flex-col items-center h-24 justify-center rounded-md hover:text-blue-600',
            toggleTab !== index ? 'text-slate-600' : 'text-blue-700 bg-blue-200'
          )}
        >
          {item.icon}
          <p>{item.name}</p>
        </button>
      ))}
    </div>
  );
};

export default SideBarMyApp;
