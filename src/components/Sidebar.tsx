import React, { Dispatch, SetStateAction } from 'react';
import {
  Activity,
  Cards,
  Home,
  Messages3,
  NotificationBing,
  Profile2User,
  ProfileCircle,
} from 'iconsax-react';
import TitleText from './TitleText';
import clsx from 'clsx';

interface SidebarProps {
  activeTab: number;
  setActiveTab: Dispatch<SetStateAction<number>>;
}

const ICONS_SIZE = '30';
const ICONS_VARIANT = 'Bold';
const ICONS_CLASSNAME = 'inline';

const SIDEBAR_NAV_ELEMENTS = [
  {
    id: 1,
    label: 'Home',
    icon: (
      <Home
        size={ICONS_SIZE}
        variant={ICONS_VARIANT}
        className={ICONS_CLASSNAME}
      />
    ),
  },
  {
    id: 2,
    label: 'My Cards',
    icon: (
      <Cards
        size={ICONS_SIZE}
        variant={ICONS_VARIANT}
        className={ICONS_CLASSNAME}
      />
    ),
  },
  {
    id: 3,
    label: 'Messages',
    icon: (
      <Messages3
        size={ICONS_SIZE}
        variant={ICONS_VARIANT}
        className={ICONS_CLASSNAME}
      />
    ),
  },
  {
    id: 4,
    label: 'Teams',
    icon: (
      <Profile2User
        size={ICONS_SIZE}
        variant={ICONS_VARIANT}
        className={ICONS_CLASSNAME}
      />
    ),
  },
  {
    id: 5,
    label: 'Notification',
    icon: (
      <NotificationBing
        size={ICONS_SIZE}
        variant={ICONS_VARIANT}
        className={ICONS_CLASSNAME}
      />
    ),
  },
  {
    id: 6,
    label: 'Analytics',
    icon: (
      <Activity
        size={ICONS_SIZE}
        variant={ICONS_VARIANT}
        className={ICONS_CLASSNAME}
      />
    ),
  },
  {
    id: 7,
    label: 'Profile',
    icon: (
      <ProfileCircle
        size={ICONS_SIZE}
        variant={ICONS_VARIANT}
        className={ICONS_CLASSNAME}
      />
    ),
  },
];
const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  return (
    <div className="w-96  flex flex-col gap-8 border-r-2 h-screen p-8">
      <TitleText />
      <ul className="flex flex-col gap-2">
        {SIDEBAR_NAV_ELEMENTS.map((item) => (
          <li
            key={item.id}
            className={clsx(
              'p-3 rounded-lg',
              activeTab === item.id
                ? 'bg-blue-200 text-blue-700'
                : 'text-slate-700'
            )}
          >
            <button
              onClick={() => setActiveTab(item.id)}
              className="flex gap-3 items-center w-full"
            >
              {item.icon}
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
