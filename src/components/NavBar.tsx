import { HEADER_HEADINGS } from '@/constants/appConstants';
import Button from './ButtonRounded';

const NavBar = () => {
  return (
    <nav className="flex lg:flex-row flex-col w-full lg:w-auto lg:bg-transparent">
      {HEADER_HEADINGS.map((heading, index) => (
        <Button
          key={index}
          label={heading.headingName}
          isHeader
          href={heading.headingHref}
        />
      ))}
    </nav>
  );
};

export default NavBar;
