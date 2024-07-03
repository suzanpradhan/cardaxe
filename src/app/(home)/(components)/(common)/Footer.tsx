import List from '@/components/List';
import { format } from 'date-fns';
const LIST1: string[] = ['About', 'Services', 'Pricing', 'Blog'];
const LIST2: string[] = [
  'Help and Support',
  'Terms and Conditions',
  'Privacy Policy',
  'Careers',
  'Security',
];

const Footer = () => {
  const currentDate = format(new Date(), 'yyyy');
  return (
    <div className="bg-zinc-900 text-sm">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-5 md:gap-0 border-b-zinc-800 border-b-1 py-10">
          <div className="shrink-0 basis-full md:basis-2/6">
            <div className="max-w-xs flex flex-col gap-2">
              <h2 className="text-white font-extrabold text-2xl">cardaxe.</h2>
              <p className=" text-white/60 text-sm leading-6">
                CardAxe is your modern solution for digital business cards and
                company portfolios. Replace traditional paper cards with a
                seamless, eco-friendly, and shareable digital experience.
              </p>
            </div>
          </div>
          <div className="basis-full md:basis-3/6 lg:basis-2/6 flex flex-col md:flex-row justify-between lg:justify-end items-start gap-5 md:gap-0">
            <List listItems={LIST1} />
            <List listItems={LIST2} />
          </div>
        </div>
        <p className="text-white/60 py-5 text-center md:text-left">
          &copy; Copyright {currentDate}{' '}
          <span className="text-white">CardAxe</span>. All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
