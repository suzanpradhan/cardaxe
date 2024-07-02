// import Portal from '../../hoc/Portal';

import { MenuData } from '@/constants/appConstants';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SideDrawer({ show }: { show: boolean }) {
  const currentPath = usePathname();
  const toggleOpen = 'left-0';
  const toggleClose = '-left-60';
  const navActiveClass =
    'font-medium before:bg-custom-blue/85 after:bg-custom-primary/75 hover:before:bg-custom-blue/85 hover:after:bg-custom-primary/75';
  const navHoverClass =
    'hover:font-medium before:absolute before:top-1 before:left-2 before:right-7 hover:before:bg-custom-blue/10 before:h-full before:-z-10  after:absolute after:-top-1 after:left-5 after:right-5 hover:after:bg-custom-blue/10 after:h-full after:-z-10';

  const menuItems = MenuData;

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-screen w-full z-0 bg-black/75 transition-all delay-300 ${show ? 'fixed ' : 'hidden'}`}
      ></div>
      <div
        className={`fixed top-0 max-w-60 w-full h-screen transition-all delay-300 ease-in-out bg-white/90 backdrop-blur-2xl ${show ? toggleOpen : toggleClose}`}
      >
        <div className="bg-white w-full flex justify-center">
          <Link href="/" className="flex items-center relative h-16 w-16">
            <Image
              alt="cardaxe-logo"
              src="/images/inverse-logo.webp"
              width={100}
              height={100}
              quality={75}
              sizes="(max-width: 768px) 75vw, 33vw"
              className="object-contain"
            />
          </Link>
        </div>
        {menuItems && menuItems.length > 0 ? (
          <nav className="bg-white h-full overflow-x-scroll">
            <ul className="flex flex-col gap-3">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className={`relative z-10 before:skew-x-6 after:skew-x-6 transition-all duration-300 ease-in-out ${navHoverClass} ${currentPath === item.link ? navActiveClass : ''}`}
                >
                  <Link
                    href={item.link ?? '#'}
                    className="flex items-center justify-center h-16"
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
