import Link from 'next/link';
import MainMenu from './MainMenu';
import MobileNav from './MobileNav';

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 h-16 w-full z-50 bg-white/20 backdrop-blur-md">
      <div className="lg:container mx-auto">
        <div className="flex justify-between">
          <div className="w-max flex justify-center">
            <Link
              href="/"
              className="flex items-center relative h-16 w-full ml-5 sm:ml-0"
            >
              <h1 className={`md:text-3xl text-xl font-extrabold`}>cardaxe.</h1>
            </Link>
          </div>
          <MainMenu />
          <MobileNav />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
