import clsx from 'clsx';
import { Activity, NotificationBing } from 'iconsax-react';
import Link from 'next/link';

type TitleTextProps = {
  isSideBarComp?: boolean;
};

const TitleText = ({ isSideBarComp }: TitleTextProps) => {
  return (
    <div className="md:hidden w-full flex justify-between items-center h-16 px-2 border-b border-zinc-200">
      <Link href={'/'} className="">
        <h1 className={clsx('md:text-3xl text-xl font-extrabold')}>cardaxe.</h1>
      </Link>
      {isSideBarComp && (
        <div className="flex items-center gap-4">
          <NotificationBing
            size="30"
            variant="Bulk"
            className="text-grayfont md:hidden"
          />
          <Activity
            size="30"
            variant="Bulk"
            className="text-grayfont md:hidden"
          />
        </div>
      )}
    </div>
  );
};

export default TitleText;
