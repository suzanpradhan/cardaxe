import {
  Activity,
  Cards,
  Home,
  Messages3,
  NotificationBing,
  Profile2User,
  ProfileCircle,
} from 'iconsax-react';
import Link from 'next/link';
import React from 'react';
import SidebarElements from './SidebarElements';

export type SidebarNavElementsProps = {
  id: number;
  label: string;
  link: string;
  icon: React.JSX.Element;
};

const ICONS_SIZE = '24';
const ICONS_VARIANT = 'Bulk';
const ICONS_CLASSNAME = 'inline';

const SIDEBAR_NAV_ELEMENTS: SidebarNavElementsProps[] = [
  {
    id: 1,
    label: 'Home',
    link: '',
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
    link: 'mycards',
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
    link: 'messages',

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
    link: 'teams',

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
    link: 'notification',

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
    link: 'analytics',

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
    link: 'profile',

    icon: (
      <ProfileCircle
        size={ICONS_SIZE}
        variant={ICONS_VARIANT}
        className={ICONS_CLASSNAME}
      />
    ),
  },
];
const Sidebar = () => {
  return (
    <ul className="max-w-sm lg:max-w-none w-full mx-auto flex lg:flex-col justify-between lg:justify-normal lg:gap-y-2">
      <Link href={'/'} className="hidden lg:block h-14">
        <h1 className="lg:text-3xl text-xl font-extrabold">cardaxe.</h1>
      </Link>
      {SIDEBAR_NAV_ELEMENTS.map((item) => (
        <SidebarElements item={item} key={item.id} />
      ))}
    </ul>
  );
};

export default Sidebar;
