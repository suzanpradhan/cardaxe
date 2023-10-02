import { StaticImageData } from 'next/image';
import React, { useState } from 'react';
import Image from 'next/image';
import { Activity, Eye, More, Scanning } from 'iconsax-react';
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
  const openDialog = () => (
    setIsDialogOpen(true), console.log('>>>here', isDialogOpen)
  );
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <div className="w-[60rem] border-t-1 border-b-1 border-t-borderMain border-b-borderMain">
      <div className="grid py-2 grid-cols-table-grid justify-between items-center ">
        {columnHeadings.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
      <div className="flex flex-col ">
        {data.map((item, index) => (
          <div
            key={index}
            className="py-2 grid grid-cols-table-grid border-t-1 items-center"
          >
            <div className="flex gap-2 items-center">
              <div className="relative w-8 h-8 shadow-lg rounded-full">
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
            <div className="flex text-grayfont justify-between items-center">
              {ACTIONS_BUTTONS.map((item, index) => (
                <button
                  className="bg-componentBgGrey rounded-full p-2"
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
        <ManageMemberDialog closeDialog={closeDialog} />
      </Dialog>
    </div>
  );
};

export default Table;
