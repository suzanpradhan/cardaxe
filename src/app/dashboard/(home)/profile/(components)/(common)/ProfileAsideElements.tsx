'use client';
import clsx from 'clsx';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { ProfileAsideElementsProps } from '../ProfileAside';

const ProfileAsideElements = ({
  item,
}: {
  item: ProfileAsideElementsProps;
}) => {
  const [toggle, setToggle] = useState<Boolean>(false);
  const pathName = usePathname();
  const router = useRouter();
  const handleClick = () => {
    router.push('/dashboard/profile' + item.link);
  };
  //   useEffect(() => {
  //     if (item.label === 'Edit Profile') {
  //       setToggle(pathName.endsWith('/dashboard'));
  //     } else if (item.label === 'My Cards') {
  //       setToggle(
  //         pathName.startsWith('/dashboard/' + item.link) ||
  //           pathName.includes('/dashboard/builder')
  //       );
  //     } else {
  //       setToggle(pathName.startsWith('/dashboard/' + item.link));
  //     }
  //   }, [pathName, setToggle, item]);
  return (
    <li
      className={clsx(
        'p-3 rounded-lg  hover:text-blueTheme min-w-fit',
        toggle ? 'bg-blueBg text-blueTheme' : 'text-grayfont',
        item.label == 'Notification' && 'hidden sm:block'
      )}
    >
      <button
        onClick={() => handleClick()}
        className="flex gap-3 items-center w-full"
      >
        {item.icon}
        <span className="hidden sm:block">{item.label}</span>
      </button>
    </li>
  );
};

export default ProfileAsideElements;
