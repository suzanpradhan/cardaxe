'use client';
import {
  ArrowRight2,
  Bookmark,
  LogoutCurve,
  NotificationBing,
} from 'iconsax-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

const SettingOptions = () => {
  return (
    <div className="bg-white px-5 py-5">
      <h3 className="text-base font-semibold mb-4">Settings</h3>
      <div className="flex flex-col items-stretch justify-start gap-3">
        {/* <Link href="/dashboard/profile/update">
          <div className="flex items-center justify-between bg-slate-100 h-12 px-4 rounded-lg">
            <div className="flex items-center gap-4">
              <UserEdit size="24" variant="Bulk" className="text-slate-600" />
              <span className="text-slate-600 text-sm font-normal">
                Edit Profile
              </span>
            </div>
            <ArrowRight2
              size="20"
              variant="TwoTone"
              className="text-grayfont"
            />
          </div>
        </Link> */}
        <Link href="/dashboard/profile/update">
          <div className="flex items-center justify-between bg-slate-100 h-12 px-4 rounded-lg">
            <div className="flex items-center gap-4">
              <NotificationBing
                size="24"
                variant="Bulk"
                className="text-slate-600"
              />
              <span className="text-slate-600 text-sm font-normal">
                Notifications
              </span>
            </div>
            <ArrowRight2
              size="20"
              variant="TwoTone"
              className="text-grayfont"
            />
          </div>
        </Link>
        <Link href="/dashboard/profile/update">
          <div className="flex items-center justify-between bg-slate-100 h-12 px-4 rounded-lg">
            <div className="flex items-center gap-4">
              <Bookmark size="24" variant="Bulk" className="text-slate-600" />
              <span className="text-slate-600 text-sm font-normal">Saved</span>
            </div>
            <ArrowRight2
              size="20"
              variant="TwoTone"
              className="text-grayfont"
            />
          </div>
        </Link>
        <button
          onClick={() => {
            signOut({ callbackUrl: '/login', redirect: true });
          }}
          className="flex items-center justify-between bg-redError/20 h-12 px-4 rounded-lg"
        >
          <div className="flex items-center gap-4">
            <LogoutCurve size="24" variant="Bulk" className="text-redError" />
            <span className="text-redError text-sm font-normal">Logout</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default SettingOptions;
