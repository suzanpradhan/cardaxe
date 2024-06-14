'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProfileAside from './(components)/ProfileAside';

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const [isProfile, setIsProfile] = useState<boolean>(false);
  const pathName = usePathname();
  useEffect(() => {
    if (pathName.endsWith('profile')) {
      setIsProfile(true);
    } else {
      setIsProfile(false);
    }
  }, [pathName, setIsProfile]);
  return isProfile ? (
    <>{children}</>
  ) : (
    <div className="grid grid-cols-12">
      <div className="col-span-3 md:col-span-4 lg:col-span-2 border-r px-2">
        <ProfileAside />
      </div>
      <div className="col-span-9 md:col-span-8 lg:col-span-10">{children}</div>
    </div>
  );
};

export default ProfileLayout;
