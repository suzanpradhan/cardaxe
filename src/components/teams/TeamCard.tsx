import { Heart, More, ScanBarcode, Share } from 'iconsax-react';
import Image from 'next/image';
import logo from '../../../public/logo.png';

const DETAILS = [
  {
    title: 'Founders',
    description: 'Sujan Pradhan, Saroj Khanal',
  },
  {
    title: 'CEO',
    description: 'Niwesh Shrestha',
  },
  {
    title: 'Founded',
    description: 'Jan 1 2023',
  },
  {
    title: 'Headquater',
    description: 'Kathmandu, Nepal',
  },
];

const TeamCard = () => {
  return (
    <div className="relative border border-slate-100 overflow-hidden rounded-xl shadow-sm h-full">
      <div className="-z-10 absolute h-14 bg-green-500 top-0 w-full"></div>
      <div className="px-5 py-6 flex flex-col justify-between items-stretch h-full gap-2">
        <div className="flex items-end gap-4">
          <div className="relative w-44 h-44 z-10 shadow-lg rounded-lg">
            <Image
              src={logo}
              alt="Background Image"
              fill
              objectFit="cover"
              sizes="(max-width: 768px) 100vw, 300px"
              className="-z-10 rounded-lg"
            />
          </div>
          <div className="py-6 grid gap-4">
            <div className="flex flex-col">
              <h2 className="text-slate-900 font-bold text-lg">Roft.ru</h2>
              <p className="text-base text-slate-400 font-medium">
                Technology Company
              </p>
            </div>
            <div className="flex gap-3">
              <Heart
                size="42"
                color="#ff1843"
                variant="Bulk"
                className="bg-componentBgGrey rounded-full p-2"
              />
              <Share
                size="42"
                variant="Bulk"
                className="bg-componentBgGrey rounded-full p-2 text-grayfont"
              />
              <ScanBarcode
                size="42"
                variant="Bulk"
                className="bg-componentBgGrey rounded-full p-2 text-grayfont"
              />
              <More
                size="42"
                variant="Bulk"
                className="bg-componentBgGrey rounded-full p-2 text-grayfont"
              />
            </div>
          </div>
        </div>
        <p className="text-base text-slate-500 font-normal">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia
          corrupti error nesciunt quasi, dicta libero accusamus iste cum
          suscipit commodi dolor voluptates doloribus laudantium vel iusto, nemo
          tenetur doloremque quibusdam!
        </p>
        <div className="grid gap-2">
          {DETAILS.map((item, index) => (
            <p key={index} className="text-sm font-normal text-slate-500">
              <span className="font-semibold text-slate-900">
                {item.title}:{' '}
              </span>
              {item.description}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
