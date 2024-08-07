import CardTempSide from '@/components/dashboard/HomeCardTemplate';
import TeamCard from '@/components/teams/TeamCard';
import { BoxAdd, Edit, Eye, MouseSquare, Scanning, Share } from 'iconsax-react';

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

const page = () => {
  return (
    <div className="flex justify-center gap-6">
      <div className="max-w-lg shrink basis-1/2 rounded-xl border-1 border-componentBgGrey">
        <TeamCard />
        <div className="px-6 pb-6">{/* <ProfileDetails isTeamComp /> */}</div>
      </div>
      <div className="grid h-min shrink basis-120 gap-4 rounded-xl border-1 border-componentBgGrey p-6">
        <div className="rounded-md shadow-lg">
          <CardTempSide userName={'1'} />
        </div>
        <div>
          <p className="flex justify-between">
            <strong>My Roft.ru Card</strong>
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
        <div className="flex justify-between gap-2">
          {BUTTON_LIST.map((item, index) => (
            <button
              key={index}
              className="flex items-center gap-1 rounded-md border-1 border-componentBgGrey px-2 py-1 text-grayfont"
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

export default page;
