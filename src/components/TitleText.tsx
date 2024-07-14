import clsx from 'clsx';
import { Activity, NotificationBing } from 'iconsax-react';
import Link from 'next/link';

type TitleTextProps = {
  isSideBarComp?: boolean;
};

const TitleText = ({ isSideBarComp }: TitleTextProps) => {
  return (
    <div className='border-b border-zinc-200'>
      <div className="lg:hidden max-w-sm lg:max-w-none w-full mx-auto flex justify-between items-center h-14 px-2">
        <Link href={'/'} className="">
          <h1 className={clsx('lg:text-3xl text-xl font-extrabold')}>cardaxe.</h1>
        </Link>
        {isSideBarComp && (
          <div className="flex items-center gap-4">
            <NotificationBing
              size="30"
              variant="Bulk"
              className="text-grayfont lg:hidden"
            />
            <Activity
              size="30"
              variant="Bulk"
              className="text-grayfont lg:hidden"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TitleText;
