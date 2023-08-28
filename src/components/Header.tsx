import Button from './Button';
import TitleText from './TitleText';

interface HEADER_HEADING_PROPS {
  headingName: string;
  headingHref: string;
}

const Header = () => {
  const HEADER_HEADINGS: HEADER_HEADING_PROPS[] = [
    { headingName: 'About', headingHref: '/' },
    { headingName: 'Pricing', headingHref: '/' },
    { headingName: 'Services', headingHref: '/' },
    { headingName: 'Login', headingHref: '/login' },
    { headingName: 'Register', headingHref: '/register' },
  ];
  return (
    <div className="flex justify-between py-8">
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
