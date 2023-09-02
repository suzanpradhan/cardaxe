import clsx from 'clsx';
import { Mobile, Monitor } from 'iconsax-react';
import React, { useState } from 'react';

type ValueProps = {
  value: string;
  icon: React.JSX.Element;
  label: string;
};

const ICON_SIZE = '28';

const MOBILE_DESKTOP_SWITCH_VALUES: ValueProps[] = [
  {
    value: 'mobile',
    icon: <Mobile size={ICON_SIZE} variant="Bulk" className="inline" />,
    label: 'Mobile',
  },
  {
    value: 'desktop',
    icon: <Monitor size="32" variant="Bulk" className="inline" />,
    label: 'Desktop',
  },
];
const MobileDesktopSwitch = () => {
  const [view, setView] = useState<string>('desktop');
  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    item: ValueProps
  ) => {
    setView(item.value);
  };
  return (
    <div className="flex mx-auto ">
      {MOBILE_DESKTOP_SWITCH_VALUES.map((item, index) => (
        <button
          key={index}
          onClick={(e) => handleClick(e, item)}
          className={clsx(
            ' rounded flex px-3 py-2 mb-16',
            view === item.value
              ? 'text-white bg-black '
              : 'text-slate-500 bg-componentBgGrey'
          )}
        >
          {item.icon}
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default MobileDesktopSwitch;
