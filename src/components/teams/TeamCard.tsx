import { Team } from '@/module/teams/teamTypes';
import { Heart, More, ScanBarcode, Share } from 'iconsax-react';
import Image from 'next/image';
import logo from '../../../public/logo.png';

const TeamCard = ({ teamCardValues }: { teamCardValues: Team }) => {
  console.log('teamCardValues', teamCardValues);
  return (
    <div className="relative">
      <div className="absolute top-0 -z-10 h-14 w-full overflow-hidden rounded-t-xl bg-green-500"></div>
      <div className="grid gap-5 p-6">
        <div className="flex items-end gap-4">
          <div className="relative z-10 h-44 w-44 rounded-lg shadow-lg">
            <Image
              src={
                teamCardValues?.logoFile
                  ? URL.createObjectURL(teamCardValues.logoFile)
                  : (teamCardValues?.logo ?? logo)
              }
              alt="Background Image"
              fill
              objectFit="cover"
              sizes="(max-width: 768px) 100vw, 300px"
              className="-z-10 rounded-lg"
            />
          </div>
          <div className="grid gap-2 py-6">
            <h2 className="">{teamCardValues?.name ?? 'Company name'}</h2>
            <p>{teamCardValues?.category?.title ?? 'Category'}</p>
            <div className="flex gap-3">
              <Heart
                size="42"
                color="#ff1843"
                variant="Bulk"
                className="rounded-full bg-componentBgGrey p-2"
              />
              <Share
                size="42"
                variant="Bulk"
                className="rounded-full bg-componentBgGrey p-2 text-grayfont"
              />
              <ScanBarcode
                size="42"
                variant="Bulk"
                className="rounded-full bg-componentBgGrey p-2 text-grayfont"
              />
              <More
                size="42"
                variant="Bulk"
                className="rounded-full bg-componentBgGrey p-2 text-grayfont"
              />
            </div>
          </div>
        </div>
        <div>
          <p>
            {teamCardValues?.bio ??
              `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia
            corrupti error nesciunt quasi, dicta libero accusamus iste cum
            suscipit commodi dolor voluptates doloribus laudantium vel iusto,
            nemo tenetur doloremque quibusdam!`}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p>
            <strong>Founders : </strong>
            <span>{teamCardValues?.founded_by}</span>
          </p>
          <p>
            <strong>CEO : </strong>
            <span>{teamCardValues?.ceo}</span>
          </p>
          <p>
            <strong>Founded At : </strong>
            <span>{teamCardValues?.founded_at}</span>
          </p>
          <p>
            <strong>Headquater : </strong>
            <span>{teamCardValues?.address}</span>
          </p>
          {/* {DETAILS.map((item, index) => (
            
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
