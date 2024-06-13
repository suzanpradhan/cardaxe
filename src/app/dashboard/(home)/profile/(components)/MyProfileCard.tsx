'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const MyProfileCard = () => {
  const router = useRouter();
  return (
    <div className="bg-white px-5 py-5">
      <div className="grid grid-cols-12 mb-5">
        <div className="col-span-3">
          <div className="relative overflow-hidden w-24 h-24 rounded-full">
            <Image
              src={`/profile/profile.png`}
              alt="profile-image"
              objectFit="cover"
              layout="fill"
              sizes="(max-width: 2000px) 75vw, 33vw"
            />
          </div>
        </div>
        <div className="col-span-9">
          <div className="grid grid-cols-12 grid-rows-2 gap-y-2 gap-x-2">
            <div className="col-span-4 row-span-1">
              <div className="flex flex-col items-center justify-stretch gap-1">
                <span className="font-bold text-base">634</span>
                <span className="font-normal text-xs text-grayfont">
                  Connections
                </span>
              </div>
            </div>
            <div className="col-span-4 row-span-1">
              <div className="flex flex-col items-center justify-stretch gap-1">
                <span className="font-bold text-base">1.5k</span>
                <span className="font-normal text-xs text-grayfont">
                  Followers
                </span>
              </div>
            </div>
            <div className="col-span-4 row-span-1">
              <div className="flex flex-col items-center justify-stretch gap-1">
                <span className="font-bold text-base">256</span>
                <span className="font-normal text-xs text-grayfont">
                  Following
                </span>
              </div>
            </div>
            <div className="col-span-12 row-span-2">
              <div className="flex items-center justify-evenly h-full">
                <button
                  className="bg-slate-100 text-sm font-medium text-blueTheme/75 mx-auto w-5/12 h-10 rounded-full hover:shadow"
                  onClick={() => router.push('/dashboard/profile/update')}
                >
                  Edit
                </button>
                <button className="bg-slate-100 text-sm font-medium text-blueTheme/75 mx-auto w-5/12 h-10 rounded-full hover:shadow">
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start gap-1 w-full">
        <h3 className="text-xl font-bold">Niwesh Shrestha</h3>
        <p className="font-normal text-sm text-grayfont">
          Kathmandu, Nepal | Creative Director - Kurma Tech
        </p>
        <p className="font-normal text-sm text-grayfont">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
          minus debitis dicta dolorem magni fuga vel sint? Minus, quibusdam
          repellat.
        </p>
      </div>
    </div>
  );
};

export default MyProfileCard;
