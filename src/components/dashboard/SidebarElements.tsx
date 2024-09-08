'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SidebarNavElementsProps } from './Sidebar';

const SidebarElements = ({ item }: { item: SidebarNavElementsProps }) => {
  const [toggle, setToggle] = useState<Boolean>(false);
  const pathName = usePathname();
  const router = useRouter();
  const handleClick = () => {
    router.push('/dashboard/' + item.link);
  };
  useEffect(() => {
    if (item.label === 'Home') {
      setToggle(pathName.endsWith('/dashboard'));
    } else if (item.label === 'My Cards') {
      setToggle(
        pathName.startsWith('/dashboard/' + item.link) ||
          pathName.includes('/dashboard/builder')
      );
    } else {
      setToggle(pathName.startsWith('/dashboard/' + item.link));
    }
  }, [pathName, setToggle, item]);
  return (
    <li
      className={cn(
        'h-12 w-12 rounded-lg hover:bg-blueBg/60 hover:text-blueTheme/60 lg:w-full',
        toggle ? 'bg-blueBg text-blueTheme' : 'text-grayfont',
        (item.label == 'Notification' || item.label == 'Analytics') &&
          'hidden lg:block'
      )}
    >
      <Link
        href={'/dashboard/' + item.link}
        className="flex h-full w-full items-center justify-center gap-4 lg:justify-start lg:px-4"
      >
        {item.icon}
        <p className="hidden text-sm lg:block">{item.label}</p>
      </Link>
    </li>
  );
};

export default SidebarElements;
