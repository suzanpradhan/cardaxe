import React from 'react';
import {
  Activity,
  Cards,
  Home,
  Messages3,
  NotificationBing,
  Profile2User,
  ProfileCircle,
} from 'iconsax-react';
import SidebarElements from './SidebarElements';

export type SidebarNavElementsProps = {
  id: number;
  label: string;
  link: string;
  icon: React.JSX.Element;
};

const ICONS_VARIANT = 'Bold';
const ICONS_CLASSNAME = 'inline';

const SIDEBAR_NAV_ELEMENTS: SidebarNavElementsProps[] = [
  {
    id: 1,
    label: 'Home',
    link: '',
    icon: (
      <Home
        // size={ICONS_SIZE}
        variant={ICONS_VARIANT}
        className={ICONS_CLASSNAME}
      />
    ),
  },
  {
    id: 2,
    label: 'My Cards',
    link: 'mycards',
    icon: (
      <Cards
        // size={ICONS_SIZE}
        variant={ICONS_VARIANT}
        className={ICONS_CLASSNAME}
      />
    ),
  },
  {
    id: 3,
    label: 'Messages',
    link: 'messages',

    icon: (
      <Messages3
        // size={ICONS_SIZE}
        variant={ICONS_VARIANT}
        className={ICONS_CLASSNAME}
      />
    ),
  },
  {
    id: 4,
    label: 'Teams',
    link: 'teams',

    icon: (
      <Profile2User
        // size={ICONS_SIZE}
        variant={ICONS_VARIANT}
        className={ICONS_CLASSNAME}
      />
    ),
  },
  {
    id: 5,
    label: 'Notification',
    link: 'notification',

    icon: (
      <NotificationBing
        // size={ICONS_SIZE}
        variant={ICONS_VARIANT}
        className={ICONS_CLASSNAME}
      />
    ),
  },
  {
    id: 6,
    label: 'Analytics',
    link: 'analytics',

    icon: (
      <Activity
        // size={ICONS_SIZE}
        variant={ICONS_VARIANT}
        className={ICONS_CLASSNAME}
      />
    ),
  },
  {
    id: 7,
    label: 'Profile',
    link: 'profile',

    icon: (
      <ProfileCircle
        // size={ICONS_SIZE}
        variant={ICONS_VARIANT}
        className={ICONS_CLASSNAME}
      />
    ),
  },
];
const Sidebar = () => {
  return (
    <ul className="bg-white fixed bottom-0 sm:static flex sm:gap-2 text-base-mobile sm:text-base justify-between rounded-t-xl w-full sm:rounded-none sm:justify-normal sm:flex-col sm:p-2 sm:pt-5 sm:pr-2 sm:h-full">
      {SIDEBAR_NAV_ELEMENTS.map((item) => (
        <SidebarElements item={item} key={item.id} />
      ))}
    </ul>
  );
};

export default Sidebar;
