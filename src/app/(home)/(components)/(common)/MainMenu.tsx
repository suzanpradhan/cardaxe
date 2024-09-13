'use client';

import { MenuData } from '@/constants/appConstants';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MenuItems from './MenuItems';

const MainMenu = () => {
  const { data: session } = useSession();
  const currentPath = usePathname();
  const navButtonClass =
    '!text-blueTheme before:bg-blueTheme/10 before:rounded-full hover:before:ring-2 hover:before:ring-blueTheme/60 before:bg-gradient-to-r before:from-blue-700 before:via-[#3366e8] before:to-blue-400 !text-white  before:hover:from-blue-800 before:hover:to-blue-500';
  const navActiveClass =
    '!text-blueTheme before:bg-blueTheme/10 before:ring-1 before:ring-blueTheme/50 hover:before:!ring-blueTheme/50';
  const navHoverClass =
    'hover:text-slate-900 before:absolute before:top-1/2 before:left-0 before:transform before:-translate-y-1/2 before:w-full before:h-10 before:rounded-full hover:before:ring-slate-900/75 hover:before:ring-1 before:-z-10';
  return (
    <nav className="hidden lg:block">
      <ul className="flex h-full justify-end gap-2 text-xs font-medium uppercase text-slate-900">
        {MenuData && MenuData.length > 0
          ? MenuData.map((item, index) => (
              <MenuItems key={index}>
                <li
                  className={`group relative px-5 text-slate-600 ${navHoverClass} ${(item.link === '/login' || item.link === '/register') && navButtonClass} ${currentPath === item.link ? navActiveClass : ''}`} // add active class letter
                >
                  <Link href={item.link} className="flex h-full items-center">
                    {item.title}
                  </Link>
                  {item.sub_menu && item?.sub_menu?.length > 0 ? (
                    <div className="bg-custom-blue/90 absolute -left-[6px] top-full hidden w-max min-w-full group-hover:block group-hover:shadow">
                      <ul className="flex h-full flex-col justify-end text-xs font-semibold uppercase text-white">
                        {item.sub_menu.map((subItem, subIndex) => (
                          <li
                            key={subIndex}
                            className="hover:bg-custom-primary/30 relative before:absolute before:left-0 before:top-0 before:bg-blueTheme hover:before:bottom-0 hover:before:w-2"
                          >
                            <Link
                              href={subItem.link}
                              className="flex h-full items-center px-3 py-2"
                            >
                              {subItem.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </li>
              </MenuItems>
            ))
          : null}
        {session ? (
          <MenuItems>
            <li
              className={`group relative px-5 text-slate-600 ${navHoverClass} ${
                currentPath === '/dashboard' ? navActiveClass : ''
              } ${navButtonClass}`}
            >
              <Link
                href="/dashboard"
                className="flex h-16 items-center justify-center text-sm uppercase"
              >
                Dashboard
              </Link>
            </li>
          </MenuItems>
        ) : (
          <MenuItems>
            <li
              className={`group relative px-5 text-slate-600 ${navHoverClass} ${navButtonClass} ${
                currentPath === '/login' ? navActiveClass : ''
              }`}
            >
              <Link
                href="/login"
                className="flex h-16 items-center justify-center text-sm uppercase"
              >
                Login
              </Link>
            </li>
            <li
              className={`group relative px-5 text-slate-600 ${navHoverClass} ${
                currentPath === '/register' ? navActiveClass : ''
              } ${navButtonClass}`}
            >
              <Link
                href="/register"
                className="flex h-16 items-center justify-center text-sm uppercase"
              >
                Register
              </Link>
            </li>
          </MenuItems>
        )}
      </ul>
    </nav>
  );
};

export default MainMenu;
