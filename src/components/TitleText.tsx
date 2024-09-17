import { cn } from '@/lib/utils';
import { NotificationBing, Setting } from 'iconsax-react';
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

  return (
    <div
      className={cn(
        'fixed top-0 z-50 block w-full border-b border-zinc-200 bg-white lg:hidden',
        pathname.includes('builder') ? 'hidden' : 'block'
      )}
    >
      <div className="mx-auto flex h-14 w-full max-w-sm items-center justify-between max-sm:px-4 lg:max-w-none">
        <Link href={'/'} className="">
          <h1 className={cn('text-xl font-extrabold lg:text-3xl')}>cardaxe.</h1>
        </Link>
        {isSideBarComp && (
          <div className="flex items-center gap-4">
            {!pathname.endsWith('settings') &&
              !pathname.includes('notification') && (
                <Link href={'/dashboard/notification'}>
                  <NotificationBing
                    size="23"
                    variant="Bulk"
                    className={cn(
                      'lg:hidden',
                      isNotificationroute ? 'text-blueTheme' : 'text-grayfont'
                    )}
                  />
                </Link>
              )}

            {pathname.endsWith('me') && (
              <Link href={'/dashboard/settings'}>
                <Setting
                  size="23"
                  variant="Bulk"
                  className={cn(
                    'lg:hidden',
                    isNotificationroute ? 'text-blueTheme' : 'text-grayfont'
                  )}
                />
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TitleText;
