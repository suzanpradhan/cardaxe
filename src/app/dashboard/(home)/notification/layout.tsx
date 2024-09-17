'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NotificationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <div className="mx-auto flex h-full max-w-xl flex-col px-4 py-4 max-lg:max-w-96">
      <h5 className="text-xs font-medium text-gray-600">Notification</h5>
      <div className="my-2 flex gap-2 rounded-md bg-inputBgGrey p-2">
        <Link
          href={'/dashboard/notification'}
          className={cn(
            'flex h-7 min-w-[5rem] items-center justify-center rounded-md px-2 text-center text-xs',
            pathname.endsWith('notification')
              ? 'bg-blueBg text-blueTheme'
              : 'bg-white text-black/60'
          )}
        >
          All
        </Link>
        <Link
          href={'/dashboard/notification/requests'}
          className={cn(
            'flex h-7 min-w-[5rem] items-center justify-center rounded-md px-2 text-center text-xs',
            pathname.endsWith('requests')
              ? 'bg-blueBg text-blueTheme'
              : 'bg-white text-black'
          )}
        >
          Request
        </Link>
      </div>
      {children}
    </div>
  );
}
