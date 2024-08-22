import { Activity, Eye, More, Scanning } from 'iconsax-react';
import Image, { StaticImageData } from 'next/image';
import { useState } from 'react';
import Dialog from '../Dialog';
import ManageMemberDialog from './ManageMemberDialog';

type TabelPropsType = {
  columnHeadings: string[];
  data: {
    profileImage: StaticImageData;
    user: string;
    email: string;
    title: string;
    department: string;
    accessLevel: string;
    actions: string;
  }[];
};

const ACTIONS_BUTTONS = [
  <Eye size="27" variant="Bulk" key={0} />,
  <Activity size="26" variant="Bulk" key={1} />,
  <Scanning size="24" variant="Bulk" key={2} />,
  <More size="26" variant="Bulk" key={3} />,
];

const Table = ({ columnHeadings, data }: TabelPropsType) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <div className="w-[62rem] border-b-1 border-t-1 border-b-borderMain border-t-borderMain">
      <div className="grid grid-cols-table-grid items-center justify-between py-2">
        {columnHeadings.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
      <div className="flex flex-col">
        {data.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-table-grid items-center border-t-1 py-2"
          >
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 rounded-full shadow-lg">
                <Image
                  src={item.profileImage}
                  alt="Background Image"
                  fill
                  objectFit="cover"
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="z-10 rounded-full"
                />
              </div>
              <div>
                <p>{item.user}</p>
                <p className="text-grayfont">{item.email}</p>
              </div>
            </div>
            <div>{item.title}</div>
            <div>{item.department}</div>
            <div>{item.accessLevel}</div>
            <div className="flex items-center justify-between text-grayfont">
              {ACTIONS_BUTTONS.map((item, index) => (
                <button
                  className="rounded-full bg-componentBgGrey p-2"
                  key={index}
                  onClick={() => openDialog()}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Dialog isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen}>
        <ManageMemberDialog />
      </Dialog>
    </div>
  );
};

export default Table;
