'use client';

import React from 'react';
import Tabwrapper from '@/components/TabWrapper';
import { useRouter } from 'next/navigation';

const TAB_ELEMENTS = ['Team', 'Members', 'Analytics', 'Security', 'Settings'];

const MyTeamsLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const changeRoute = (index: number) =>
    index
      ? router.push(
          `/dashboard/teams/myTeams/${TAB_ELEMENTS[index].toLowerCase()}`
        )
      : router.push(`/dashboard/teams/myTeams/`);
  return (
    <div className="grid gap-4 justify-center pt-4">
      <h2 className="font-bold">Roft.ru</h2>
      <Tabwrapper tabElements={TAB_ELEMENTS} changeRoute={changeRoute} />
      <div>{children}</div>
    </div>
  );
};

export default MyTeamsLayout;
