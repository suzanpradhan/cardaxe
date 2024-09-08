'use client';

import useDetectOutsideClick from '@/hooks/useDetectOutsideClick';
import { useScroll } from '@/hooks/useScrollDirection';
import { cn } from '@/lib/utils';
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

  return (
    <header
      className={cn(
        'sticky z-10 backdrop-blur-xl transition-all duration-500',
        scrollDirection === 'down' ? '-top-24' : 'top-0',
        scrollPosition <= 40 ? '-mt-24' : ''
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex w-full max-w-7xl items-center justify-between overflow-x-hidden px-8 py-2 lg:w-fit lg:px-2">
          <TitleText />
          <button onClick={() => toggleMobileNav(true)}>
            <CgDetailsMore className="m-0 block h-12 w-12 p-0 lg:hidden" />
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
