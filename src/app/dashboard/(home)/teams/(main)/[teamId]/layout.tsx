'use client';

import Tabwrapper from '@/components/TabWrapper';
import { useRouter } from 'next/navigation';
import React from 'react';

const TAB_ELEMENTS = ['Team', 'Members', 'Analytics', 'Security', 'Settings'];

const MyTeamsLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const changeRoute = (index: number) =>
    index
      ? router.push(`/dashboard/teams/all/${TAB_ELEMENTS[index].toLowerCase()}`)
      : router.push(`/dashboard/teams/all/`);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col justify-center gap-4 p-4">
      <h2 className="w-full font-bold">Roft.ru</h2>
      <Tabwrapper tabElements={TAB_ELEMENTS} changeRoute={changeRoute} />
      {children}
    </div>
  );
};

export default MyTeamsLayout;
