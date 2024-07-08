'use client';
import clsx from 'clsx';
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
      className={clsx(
        'w-12 md:w-full h-12 rounded-lg hover:text-blueTheme/60 hover:bg-blueBg/60',
        toggle ? 'bg-blueBg text-blueTheme' : 'text-grayfont',
        (item.label == 'Notification' || item.label == 'Analytics') &&
          'hidden md:block'
      )}
    >
      <button
        onClick={() => handleClick()}
        className="w-full h-full flex items-center justify-center md:justify-start gap-4 md:px-4"
      >
        {item.icon}
        <p className="hidden md:block text-sm">{item.label}</p>
      </button>
    </li>
  );
};

export default SidebarElements;
