import { HEADER_HEADINGS } from '@/constants/appConstants';
import clsx from 'clsx';
import Link from 'next/link';
import { MutableRefObject } from 'react';

interface MobileNavBarTypes {
  mobileNavRef: MutableRefObject<HTMLDivElement | null>;
  isMobileNavOpen: boolean;
}

const MobileNavBar = ({ mobileNavRef, isMobileNavOpen }: MobileNavBarTypes) => {
  return (
    <nav
      ref={mobileNavRef}
      className={clsx(
        'absolute top-0 lg:hidden backdrop-blur-lg block w-72 bg-white h-screen overflow-hidden transition-all duration-500',
        isMobileNavOpen ? '-right-10' : '-right-[40rem]'
      )}
    >
      <ul className="flex flex-col gap-2 px-2 py-4 mr-4">
        {HEADER_HEADINGS.map((heading, index) => (
          <li
            key={index}
            className={`z-10 py-2  hover:bg-blueTheme/10 hover:ring-black hover:ring-2 px-2 rounded-md ${
              index === 0 && 'border-t-1'
            } ${index === 2 && 'border-b-1'}`}
          >
            <Link href={heading.headingHref}>{heading.headingName}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MobileNavBar;
