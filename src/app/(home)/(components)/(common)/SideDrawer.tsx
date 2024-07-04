// import Portal from '../../hoc/Portal';

import { MenuData } from '@/constants/appConstants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SideDrawer({ show }: { show: boolean }) {
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
        className={`fixed top-0 left-0 h-screen w-full z-0 bg-black/75 transition-all delay-300 ${show ? 'fixed ' : 'hidden'}`}
      ></div>
      <div
        className={`fixed top-0 max-w-xs w-60 h-screen transition-all delay-300 ease-in-out bg-white/90 backdrop-blur-2xl ${show ? toggleOpen : toggleClose}`}
      >
        <div className="bg-white w-full flex justify-center">
          <Link
            href="/"
            className="flex items-center justify-center relative h-16 w-full"
          >
            {/* <Image
              alt="cardaxe-logo"
              src="/images/inverse-logo.webp"
              width={100}
              height={100}
              quality={75}
              sizes="(max-width: 768px) 75vw, 33vw"
              className="object-contain"
            /> */}
            <h1 className={`md:text-3xl text-xl font-extrabold`}>cardaxe.</h1>
          </Link>
        </div>
        {menuItems && menuItems.length > 0 ? (
          <nav className="bg-white h-full overflow-x-scroll">
            <ul className="flex flex-col justify-start items-stretch gap-3 mt-5">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className={`relative z-10 before:skew-x-6 after:skew-x-6 transition-all duration-300 ease-in-out ${navHoverClass} ${currentPath === item.link ? navActiveClass : ''}`}
                >
                  <Link
                    href={item.link ?? '#'}
                    className="flex items-center justify-center h-16 uppercase text-sm"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </div>
    </>
  );
}
