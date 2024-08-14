'use client';

import Tabwrapper from '@/components/TabWrapper';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import teamsApi from '@/module/teams/teamApi';
import { Team } from '@/module/teams/teamTypes';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const TAB_ELEMENTS = ['Team', 'Members', 'Analytics', 'Security', 'Settings'];

const MyTeamsLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { teamId: number };
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const changeRoute = (index: number) =>
    index
      ? router.push(`/dashboard/teams/all/${TAB_ELEMENTS[index].toLowerCase()}`)
      : router.push(`/dashboard/teams/all/`);

  const team = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getEachTeam-${params.teamId}`]?.data as Team
  );

  useEffect(() => {
    dispatch(teamsApi.endpoints.getEachTeam.initiate(params.teamId.toString()));
  }, [dispatch, params.teamId]);
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col justify-center gap-4 p-4">
      <h2 className="w-full font-bold">{team.name}</h2>
      <Tabwrapper tabElements={TAB_ELEMENTS} changeRoute={changeRoute} />
      {children}
    </div>
  );
};

export default MyTeamsLayout;
