'use client';
import { Activity, Logout, Notification1, UserSquare } from 'iconsax-react';
import Link from 'next/link';

export default function SettingPage() {
  return (
    <div className="mx-auto px-2 py-5 max-lg:max-w-sm">
      <div className="flex flex-col gap-4">
        <h5 className="text-xs font-medium text-gray-600">
          How you use Cardaxe
        </h5>
        <div className="flex flex-col gap-2 *:text-sm">
          <Link
            href={'/dashboard/account/me/update'}
            className="relative flex cursor-pointer items-center gap-2 py-2 before:absolute before:-left-2 before:-right-2 before:-z-10 before:h-full before:w-full before:rounded-md hover:before:bg-slate-200"
          >
            <UserSquare size={32} variant="Outline" /> Edit Profile
          </Link>
          <Link
            href="#"
            className="relative flex cursor-pointer items-center gap-2 py-2 before:absolute before:-left-2 before:-right-2 before:-z-10 before:h-full before:w-full before:rounded-md hover:before:bg-slate-200"
          >
            <Activity size={30} variant="Outline" className="text-black" />{' '}
            Statistics
          </Link>
          <Link
            href="#"
            className="relative flex cursor-pointer items-center gap-2 py-2 before:absolute before:-left-2 before:-right-2 before:-z-10 before:h-full before:w-full before:rounded-md hover:before:bg-slate-200"
          >
            <Notification1 size={30} variant="Outline" className="text-black" />{' '}
            Notifications
          </Link>
        </div>
        <Link
          href="#"
          className="relative flex cursor-pointer items-center gap-2 py-2 text-sm text-red-500 before:absolute before:-left-2 before:-right-2 before:-z-10 before:h-full before:w-full before:rounded-md hover:before:bg-slate-200"
        >
          <Logout size="30" />
          Log Out
        </Link>
      </div>
    </div>
  );
}
