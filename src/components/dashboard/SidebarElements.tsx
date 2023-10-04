import clsx from 'clsx';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
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
        'p-3 rounded-lg  hover:text-blueTheme min-w-fit',
        toggle ? 'bg-blueBg text-blueTheme' : 'text-grayfont',
        item.label == 'Notification' && 'hidden sm:block'
      )}
    >
      <button
        onClick={() => handleClick()}
        className="flex gap-3 items-center w-full "
      >
        {item.icon}
        <span className="hidden sm:block">{item.label}</span>
      </button>
    </li>
  );
};

export default SidebarElements;
