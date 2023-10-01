'use client';

import Tabwrapper from '@/components/TabWrapper';
import CardTempSide from '@/components/dashboard/CardTempSide';
import ProfileDetails from '@/components/myCards/ProfileDetails';
import TeamCard from '@/components/teams/TeamCard';
import { BoxAdd, Edit, Eye, MouseSquare, Scanning, Share } from 'iconsax-react';
import React from 'react';

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

const TAB_ELEMENTS = ['Team', 'Members', 'Analytics', 'Security', 'Settings'];

const page = () => {
  return (
    <div className="grid gap-4 justify-center pt-4">
      <h2 className="font-bold">Roft.ru</h2>
      <Tabwrapper tabElements={TAB_ELEMENTS} />

      <div className="flex gap-6 justify-center">
        <div className="basis-1/2 shrink max-w-lg border-1 rounded-xl border-componentBgGrey">
          <TeamCard />
          <div className="px-6 pb-6">
            <ProfileDetails isTeamComp />
          </div>
        </div>
        <div className="grid gap-4 shrink h-min basis-120 p-6 rounded-xl border-1 border-componentBgGrey">
          <div className="shadow-lg rounded-md">
            <CardTempSide />
          </div>
          <div>
            <p className="flex justify-between">
              <strong>My Roft.ru Card</strong>
              <span className="text-green-600 text-sm">Active</span>
            </p>
            <div className="flex gap-4">
              {REACTION_LIST.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-2 items-center text-grayfont"
                >
                  {item.icon}
                  <span>{item.reactions}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-2 justify-between">
            {BUTTON_LIST.map((item, index) => (
              <button
                key={index}
                className="rounded-md gap-1 px-2 py-1 flex border-1 items-center border-componentBgGrey text-grayfont"
              >
                {item.icon}
                <span className="text-sm">{item.description}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
