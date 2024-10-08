'use client';
import { cn } from '@/lib/utils';
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
      className={cn(
        'w-full min-w-fit rounded-lg p-3 hover:text-blueTheme',
        isActive ? 'bg-blueBg text-blueTheme' : 'text-grayfont',
        item.label == 'Notification' && 'hidden sm:block'
      )}
    >
      <Link
        href={item.link}
        // onClick={() => handleClick()}
        className="flex w-full items-center justify-center gap-3 lg:justify-normal"
      >
        {item.icon}
        <span className="text-sm">{item.label}</span>
      </Link>
    </li>
  );
};

export default ProfileAsideElements;
