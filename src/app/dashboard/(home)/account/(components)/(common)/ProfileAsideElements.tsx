'use client';
import clsx from 'clsx';
import Link from 'next/link';
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
    router.push('/dashboard/account/me' + item.link);
  };
  useEffect(() => {
    if (pathName.endsWith(item.link)) {
      setIsActive(true);
    }
  }, [pathName, setIsActive, item]);
  return (
    <li
      className={clsx(
        'w-full min-w-fit rounded-lg p-3 hover:text-blueTheme',
        isActive ? 'bg-blueBg text-blueTheme' : 'text-grayfont',
        item.label == 'Notification' && 'hidden sm:block'
      )}
    >
      <Link
        href={item.link}
        // onClick={() => handleClick()}
        className="flex w-full items-center justify-center gap-3 md:justify-normal"
      >
        {item.icon}
        <span className="hidden md:block">{item.label}</span>
      </Link>
    </li>
  );
};

export default ProfileAsideElements;
