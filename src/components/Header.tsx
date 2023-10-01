import { useScrollDirection } from '@/hooks/useScrollDirection';
import Button from './ButtonRounded';
import TitleText from './TitleText';
import clsx from 'clsx';

interface HEADER_HEADING_PROPS {
  headingName: string;
  headingHref: string;
}

const Header = () => {
  const HEADER_HEADINGS: HEADER_HEADING_PROPS[] = [
    { headingName: 'About', headingHref: '/' },
    { headingName: 'Pricing', headingHref: '/pricing' },
    { headingName: 'Services', headingHref: '/' },
    { headingName: 'Login', headingHref: '/login' },
    { headingName: 'Register', headingHref: '/register' },
  ];

  const scrollDirection = useScrollDirection();
  return (
    <div
      className={clsx(
        'mx-auto max-w-7xl flex justify-between pb-8 pt-4 sticky z-10 px-2',
        scrollDirection === 'down' ? '-top-24' : 'top-0'
      )}
    >
      <TitleText />
      <nav className="flex">
        {HEADER_HEADINGS.map((heading, index) => (
          <Button
            key={index}
            label={heading.headingName}
            isHeader
            href={heading.headingHref}
          />
        ))}
      </nav>
    </div>
  );
};

export default Header;
