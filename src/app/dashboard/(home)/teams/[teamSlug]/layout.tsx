'use client';

import Tabwrapper from '@/components/TabWrapper';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import teamsApi from '@/module/teams/teamApi';
import { Team } from '@/module/teams/teamTypes';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const TAB_ELEMENTS = [
  { name: 'Team', link: '' },
  { name: 'Members', link: 'members' },
  { name: 'Analytics', link: 'analytics' },
  { name: 'Security', link: 'security' },
  { name: 'Settings', link: 'setttings' },
];

const MyTeamsLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { teamSlug: string };
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const team = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getEachTeam-${params.teamSlug}`]?.data as Team
  );

  useEffect(() => {
    dispatch(
      teamsApi.endpoints.getEachTeam.initiate(params.teamSlug.toString())
    );
  }, [dispatch, params.teamSlug]);
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col justify-center gap-4 p-4">
      <h2 className="w-full font-bold">{team?.name}</h2>
      {params.teamSlug ? (
        <Tabwrapper tabElements={TAB_ELEMENTS} slug={params.teamSlug} />
      ) : (
        <></>
      )}
      {children}
    </div>
  );
};

export default MyTeamsLayout;
