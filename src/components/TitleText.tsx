import { cn } from '@/lib/utils';
import { Activity, NotificationBing } from 'iconsax-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

type TitleTextProps = {
  isSideBarComp?: boolean;
};

const TitleText = ({ isSideBarComp }: TitleTextProps) => {
  const pathname = usePathname();
  const [isNotificationroute, toggleIsNotificationRouter] = useState(false);

  useEffect(() => {
    if (pathname.includes('notification')) {
      toggleIsNotificationRouter(true);
    } else {
      toggleIsNotificationRouter(false);
    }
  }, [pathname]);

  console.log('pathname', isNotificationroute);

  return (
    <div className="fixed top-0 z-50 w-full border-b border-zinc-200 bg-white lg:hidden">
      <div className="mx-auto flex h-14 w-full max-w-sm items-center justify-between px-2 lg:max-w-none">
        <Link href={'/'} className="">
          <h1 className={cn('text-xl font-extrabold lg:text-3xl')}>cardaxe.</h1>
        </Link>
        {isSideBarComp && (
          <div className="flex items-center gap-4">
            <Link href={'/dashboard/notification'}>
              <NotificationBing
                size="30"
                variant="Bulk"
                className={cn(
                  'lg:hidden',
                  isNotificationroute ? 'text-blueTheme' : 'text-grayfont'
                )}
              />
            </Link>
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
