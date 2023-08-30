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
    if (item.label !== 'Home') {
      setToggle(pathName.startsWith('/dashboard/' + item.link) ? true : false);
    } else {
      setToggle(pathName.endsWith('/dashboard') ? true : false);
    }
  }, [pathName, setToggle, item]);
  return (
    <li
      className={clsx(
        'p-3 rounded-lg  hover:text-blue-700',
        toggle ? 'bg-blue-200 text-blue-700' : 'text-slate-700'
      )}
    >
      <button
        onClick={() => handleClick()}
        className="flex gap-3 items-center w-full"
      >
        {item.icon}
        <span className="hidden md:inline">{item.label}</span>
      </button>
    </li>
  );
};

export default SidebarElements;
