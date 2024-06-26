// 'use client';
import { CardPos, NotificationBing, Setting, UserEdit } from 'iconsax-react';
import ProfileAsideElements from './(common)/ProfileAsideElements';

export type ProfileAsideElementsProps = {
  id: number;
  label: string;
  link: string;
  icon: React.JSX.Element;
};

const ICONS_SIZE = '30';
const ICONS_VARIANT = 'Bulk';
const ICONS_CLASSNAME = 'inline';

const SIDEBAR_NAV_ELEMENTS: ProfileAsideElementsProps[] = [
  {
    id: 2,
    label: 'Edit Profile',
    link: 'update',
    icon: (
      <UserEdit
        size={ICONS_SIZE}
        variant={ICONS_VARIANT}
        className={ICONS_CLASSNAME}
      />
    ),
  },
  {
    id: 3,
    label: 'Payments',
    link: 'payments',

    icon: (
      <CardPos
        size={ICONS_SIZE}
        variant={ICONS_VARIANT}
        className={ICONS_CLASSNAME}
      />
    ),
  },
  {
    id: 4,
    label: 'Notifications',
    link: 'notifications',

    icon: (
      <NotificationBing
        size={ICONS_SIZE}
        variant={ICONS_VARIANT}
        className={ICONS_CLASSNAME}
      />
    ),
  },
  {
    id: 5,
    label: 'Settings',
    link: 'settings',

    icon: (
      <Setting
        size={ICONS_SIZE}
        variant={ICONS_VARIANT}
        className={ICONS_CLASSNAME}
      />
    ),
  },
];

const ProfileAside = () => {
  return (
    <nav className="w-full md:h-screen border-b pb-2 md:border-b-0 md:pb-0">
      <h3 className="text-xl font-semibold mt-9 mb-5 md:px-3">Profile</h3>
      <ul className="flex md:flex-col items-center md:items-stretch justify-evenly md:justify-start">
        {SIDEBAR_NAV_ELEMENTS.map((item) => (
          <ProfileAsideElements item={item} key={item.id} />
        ))}
      </ul>
    </nav>
  );
};

export default ProfileAside;
