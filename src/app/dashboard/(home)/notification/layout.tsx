'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NotificationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <div className="mx-auto flex h-screen max-w-xl flex-col pt-6">
      <h2 className="mb-5 text-xl font-semibold">Notification</h2>
      <div className="flex gap-2">
        <Link
          href={'/dashboard/notification'}
          className={clsx(
            'min-w-[5rem] rounded-md p-2 text-center',
            pathname.endsWith('notification')
              ? 'bg-blueBg text-blueTheme'
              : 'bg-white text-black'
          )}
        >
          All
        </Link>
        <Link
          href={'/dashboard/notification/requests'}
          className={clsx(
            'min-w-[5rem] rounded-md p-2 text-center',
            pathname.endsWith('requests')
              ? 'bg-blueBg text-blueTheme'
              : 'bg-white text-black'
          )}
        >
          Request
        </Link>
      </div>
      {/* <div className="mt-8 flex-1 overflow-scroll rounded-md bg-inputBgGrey/50">
        {children}
      </div> */}
      {children}
    </div>
  );
}
