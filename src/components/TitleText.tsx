import { cn } from '@/lib/utils';
import { Activity, NotificationBing } from 'iconsax-react';
import Link from 'next/link';

type TitleTextProps = {
  isSideBarComp?: boolean;
};

const TitleText = ({ isSideBarComp }: TitleTextProps) => {
  return (
    <div className="border-b border-zinc-200 lg:hidden">
      <div className="mx-auto flex h-14 w-full max-w-sm items-center justify-between px-2 lg:max-w-none">
        <Link href={'/'} className="">
          <h1 className={cn('text-xl font-extrabold lg:text-3xl')}>cardaxe.</h1>
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
