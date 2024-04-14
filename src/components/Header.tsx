'use client';

import useDetectOutsideClick from '@/hooks/useDetectOutsideClick';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { CgDetailsMore } from 'react-icons/cg';
import MobileNavBar from './MobileNavBar';
import NavBar from './NavBar';
import TitleText from './TitleText';

const Header = () => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [isMobileNavOpen, toggleMobileNav] = useState<boolean>(false);
  const mobileNavRef = useRef<HTMLDivElement | null>(null);
  const scrollDirection = useScrollDirection();
  console.log('scrollDirection', scrollDirection);
  const handleOutsideClick = (e: Event) => {
    toggleMobileNav(false);
    console.log(isMobileNavOpen);
  };

  useDetectOutsideClick(mobileNavRef, handleOutsideClick);

  useEffect(() => {
    console.log('scroll position', scrollPosition);
    const handleScroll = () => {
      const scrollTop = window.scrollY || window.pageYOffset;
      toggleMobileNav(false);
      setScrollPosition(scrollTop);
    };

    // Attach the scroll event listener to the window
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <header
      className={clsx(
        'lg:px-auto px-10 flex justify-center w-full  pb-4 pt-4 z-10   transition-all duration-500 backdrop-blur-2xl ',
        scrollDirection === 'down' ? '0' : '-24',
        scrollPosition <= 600 ? 'bg-transparent ' : 'bg-white/80 ',
        scrollPosition <= 60 ? 'absolute' : 'sticky'
      )}
    >
      <div className="w-full overflow-x-hidden flex max-w-7xl justify-between items-center ">
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
    </header>
  );
};

export default Header;
