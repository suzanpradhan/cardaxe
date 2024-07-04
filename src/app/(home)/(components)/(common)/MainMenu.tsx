'use client';
import { MenuData } from '@/constants/appConstants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MenuItems from './MenuItems';

const MainMenu = () => {
  const currentPath = usePathname();
  const navButtonClass =
    '!text-blueTheme before:bg-blueTheme/10 before:rounded-full hover:before:ring-2 hover:before:ring-blueTheme/60 before:bg-gradient-to-r before:from-blue-700 before:via-[#3366e8] before:to-blue-400 !text-white  before:hover:from-blue-800 before:hover:to-blue-500';
  const navActiveClass =
    '!text-blueTheme before:bg-blueTheme/10 before:ring-1 before:ring-blueTheme/50 hover:before:!ring-blueTheme/50';
  const navHoverClass =
    'hover:text-slate-900 before:absolute before:top-1/2 before:left-0 before:transform before:-translate-y-1/2 before:w-full before:h-10 before:rounded-full hover:before:ring-slate-900/75 hover:before:ring-1 before:-z-10';
  return (
    <nav className="hidden lg:block">
      <ul className="flex justify-end gap-2 h-full uppercase text-xs font-medium text-slate-900">
        {MenuData && MenuData.length > 0
          ? MenuData.map((item, index) => (
              <MenuItems key={index}>
                <li
                  className={`relative px-5 group text-slate-600 ${navHoverClass} ${(item.link === '/login' || item.link === '/register') && navButtonClass} ${currentPath === item.link ? navActiveClass : ''}`} // add active class letter
                >
                  <Link href={item.link} className="flex items-center h-full">
                    {item.title}
                  </Link>
                  {item.sub_menu && item?.sub_menu?.length > 0 ? (
                    <div className="hidden group-hover:block group-hover:shadow absolute top-full -left-[6px] min-w-full w-max bg-custom-blue/90">
                      <ul className="flex flex-col justify-end h-full uppercase text-xs font-semibold text-white">
                        {item.sub_menu.map((subItem, subIndex) => (
                          <li
                            key={subIndex}
                            className="relative hover:bg-custom-primary/30 before:absolute before:top-0 before:left-0 hover:before:bottom-0 hover:before:w-2 before:bg-blueTheme"
                          >
                            <Link
                              href={subItem.link}
                              className="flex items-center h-full py-2 px-3"
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
      </ul>
    </nav>
  );
};

export default MainMenu;
