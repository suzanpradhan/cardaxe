'use client';
import clsx from 'clsx';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ProfileAsideElementsProps } from '../ProfileAside';

const ProfileAsideElements = ({
  item,
}: {
  item: ProfileAsideElementsProps;
}) => {
  const [isActive, setIsActive] = useState<Boolean>(false);
  const pathName = usePathname();
  const router = useRouter();
  const handleClick = () => {
    router.push('/dashboard/profile' + item.link);
  };
  useEffect(() => {
    if (pathName.endsWith(item.link)) {
      setIsActive(true);
    }
  }, [pathName, setIsActive, item]);
  return (
    <li
      className={clsx(
        'p-3 rounded-lg  hover:text-blueTheme min-w-fit w-full',
        isActive ? 'bg-blueBg text-blueTheme' : 'text-grayfont',
        item.label == 'Notification' && 'hidden sm:block'
      )}
    >
      <button
        onClick={() => handleClick()}
        className="flex gap-3 items-center justify-center md:justify-normal w-full"
      >
        {item.icon}
        <span className="hidden md:block">{item.label}</span>
      </button>
    </li>
  );
};

export default ProfileAsideElements;
