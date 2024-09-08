import { HEADER_HEADINGS } from '@/constants/appConstants';
import { cn } from '@/lib/utils';
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
      className={cn(
        'absolute top-0 block h-screen w-72 overflow-hidden bg-white backdrop-blur-lg transition-all duration-500 lg:hidden',
        isMobileNavOpen ? '-right-10' : '-right-[40rem]'
      )}
    >
      <ul className="mr-4 flex flex-col gap-2 px-2 py-4">
        {HEADER_HEADINGS.map((heading, index) => (
          <li
            key={index}
            className={`z-10 rounded-md px-2 py-2 hover:bg-blueTheme/10 hover:ring-2 hover:ring-black ${
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
