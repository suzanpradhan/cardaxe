// import Portal from '../../hoc/Portal';

import { MenuData } from '@/constants/appConstants';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SideDrawer({ show }: { show: boolean }) {
  const { data: session } = useSession();
  const currentPath = usePathname();
  const toggleOpen = 'left-0';
  const toggleClose = '-left-60';
  const navActiveClass =
    'font-medium before:bg-blueTheme/85 after:bg-blueBg/75 hover:before:bg-blueTheme/85 hover:after:bg-blueBg/75';
  const navHoverClass =
    'hover:font-medium before:absolute before:top-1 before:left-2 before:right-7 hover:before:bg-blueTheme/10 before:h-full before:-z-10 after:absolute after:-top-1 after:left-5 after:right-5 hover:after:bg-blueTheme/10 after:h-full after:-z-10';

  const menuItems = MenuData;

  return (
    <>
      <div
        className={`fixed left-0 top-0 z-0 h-screen w-full bg-black/75 transition-all delay-300 ${show ? 'fixed' : 'hidden'}`}
      ></div>
      <div
        className={`fixed top-0 h-screen w-60 max-w-xs bg-white/90 backdrop-blur-2xl transition-all delay-300 ease-in-out ${show ? toggleOpen : toggleClose}`}
      >
        <div className="flex w-full justify-center bg-white">
          <Link
            href="/"
            className="relative flex h-16 w-full items-center justify-center"
          >
            <h1 className={`text-xl font-extrabold md:text-3xl`}>cardaxe.</h1>
          </Link>
        </div>
        {menuItems && menuItems.length > 0 ? (
          <nav className="h-full overflow-x-scroll bg-white">
            <ul className="mt-5 flex flex-col items-stretch justify-start gap-3">
              {menuItems.map((item, index) =>
                item.link !== '/login' && item.link !== '/register' ? (
                  <li
                    key={index}
                    className={`relative z-10 transition-all duration-300 ease-in-out before:skew-x-6 after:skew-x-6 ${navHoverClass} ${currentPath === item.link ? navActiveClass : ''}`}
                  >
                    <Link
                      href={item.link ?? '#'}
                      className="flex h-16 items-center justify-center text-sm uppercase"
                    >
                      {item.title}
                    </Link>
                  </li>
                ) : (
                  <></>
                )
              )}
              {session ? (
                <li
                  className={`relative z-10 transition-all duration-300 ease-in-out before:skew-x-6 after:skew-x-6 ${navHoverClass} ${
                    currentPath === '/dashboard' ? navActiveClass : ''
                  }`}
                >
                  <Link
                    href="/dashboard"
                    className="flex h-16 items-center justify-center text-sm uppercase"
                  >
                    Dashboard
                  </Link>
                </li>
              ) : (
                <>
                  <li
                    className={`relative z-10 transition-all duration-300 ease-in-out before:skew-x-6 after:skew-x-6 ${navHoverClass} ${
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
                    className={`relative z-10 transition-all duration-300 ease-in-out before:skew-x-6 after:skew-x-6 ${navHoverClass} ${
                      currentPath === '/register' ? navActiveClass : ''
                    }`}
                  >
                    <Link
                      href="/register"
                      className="flex h-16 items-center justify-center text-sm uppercase"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        ) : null}
      </div>
    </>
  );
}
