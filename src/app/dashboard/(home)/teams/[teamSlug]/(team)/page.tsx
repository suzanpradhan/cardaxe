'use client';

import HomeCardTemplate from '@/components/dashboard/HomeCardTemplate';
import TeamCard from '@/components/teams/TeamCard';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import teamsApi from '@/module/teams/teamApi';
import { Team } from '@/module/teams/teamTypes';
import userApi from '@/module/user/userApi';
import { UserType } from '@/module/user/userType';
import { BoxAdd, Edit, Eye, MouseSquare, Scanning, Share } from 'iconsax-react';
import { useEffect } from 'react';

const BUTTON_LIST = [
  {
    icon: <Edit size="28" variant="Bulk" />,
    description: 'Edit Card',
  },
  {
    icon: <BoxAdd size="28" variant="Bulk" />,
    description: 'Add Infos',
  },
  {
    icon: <Scanning size="28" variant="Bulk" />,
    description: 'Show QR',
  },
  {
    icon: <Share size="28" variant="Bulk" />,
    description: 'Share',
  },
];

const REACTION_LIST = [
  {
    icon: <Eye size="32" variant="Bulk" className="text-grayfont" />,
    reactions: '242',
  },
  {
    icon: <Share size="31" variant="Bulk" className="text-grayfont" />,
    reactions: '24',
  },
  {
    icon: <MouseSquare size="31" variant="Bulk" className="text-grayfont" />,
    reactions: '45k',
  },
];

const Page = ({ params }: { params: { teamSlug: string } }) => {
  const dispatch = useAppDispatch();

  const team = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getEachTeam-${params.teamSlug}`]?.data as Team
  );

  useEffect(() => {
    dispatch(teamsApi.endpoints.getEachTeam.initiate(params.teamSlug));
  }, [dispatch, params.teamSlug]);

  const teamTemplateState = useAppSelector(
    (state: RootState) => state.teamTemplate
  );

  useEffect(() => {
    dispatch(userApi.endpoints.getUser.initiate());
  }, [dispatch]);

  const userProfile = useAppSelector(
    (state: RootState) => state.baseApi.queries[`getUser`]?.data as UserType
  );

  return (
    <div className="flex w-full justify-center gap-6 max-xl:max-w-96 max-xl:flex-col">
      <div className="min-w-[22rem] max-w-lg shrink basis-1/2 rounded-xl border-1 border-componentBgGrey">
        <TeamCard teamCardValues={team} />
      </div>
      <div className="mb-16 grid h-min min-w-[22rem] shrink gap-4 rounded-xl border-1 border-componentBgGrey p-2 lg:mb-0 xl:p-6">
        <div className="rounded-md shadow-lg">
          <HomeCardTemplate userName={userProfile?.username} />
        </div>
        <div>
          <p className="flex justify-between">
            <strong>{team?.title}</strong>
            <span className="text-sm text-green-600">Active</span>
          </p>
          <div className="flex gap-4">
            {REACTION_LIST.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-grayfont"
              >
                {item.icon}
                <span>{item.reactions}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-2">
          {BUTTON_LIST.map((item, index) => (
            <button
              key={index}
              className="flex grow items-center gap-1 rounded-md border-1 border-componentBgGrey px-2 py-1 text-grayfont"
            >
              {item.icon}
              <span className="text-sm">{item.description}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
