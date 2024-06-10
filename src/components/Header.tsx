'use client';

import useDetectOutsideClick from '@/hooks/useDetectOutsideClick';
import { useScroll } from '@/hooks/useScrollDirection';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { CgDetailsMore } from 'react-icons/cg';
import MobileNavBar from './MobileNavBar';
import NavBar from './NavBar';
import TitleText from './TitleText';

const Header = () => {
  const [isMobileNavOpen, toggleMobileNav] = useState<boolean>(false);
  const mobileNavRef = useRef<HTMLDivElement | null>(null);
  const { direction: scrollDirection, position: scrollPosition } = useScroll();
  const handleOutsideClick = (e: Event) => {
    toggleMobileNav(false);
  };
  useDetectOutsideClick(mobileNavRef, handleOutsideClick);

  useEffect(() => {
    const handleScroll = () => {
      toggleMobileNav(false);
    };
    handleScroll();
  }, [scrollPosition]);

  console.log(scrollPosition, scrollDirection);

  return (
    <header
      className={clsx(
        ' z-10  transition-all sticky duration-500 backdrop-blur-xl',
        scrollDirection === 'down' ? '-top-24' : 'top-0',
        scrollPosition <= 40 ? '-mt-24' : ''
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between  items-center">
        <div className="w-full lg:w-fit px-8 lg:px-2 py-2 overflow-x-hidden flex max-w-7xl justify-between items-center ">
          <TitleText />
          <button onClick={() => toggleMobileNav(true)}>
            <CgDetailsMore className=" h-12 w-12 p-0 m-0 lg:hidden block" />
          </button>
          <MobileNavBar
            isMobileNavOpen={isMobileNavOpen}
            mobileNavRef={mobileNavRef}
          />
        </div>
        <div className="hidden lg:block">
          <NavBar />
        </div>
      </div>
    </header>
  );
};

export default Header;
