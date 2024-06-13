import {
  ArrowRight2,
  Bookmark,
  InfoCircle,
  LogoutCurve,
  NotificationBing,
  Star1,
  UserEdit,
} from 'iconsax-react';
import Image from 'next/image';

const page = () => {
  return (
    <section className="max-w-3xl mx-auto mb-20">
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
                  <button className="bg-slate-100 text-sm font-medium text-blueTheme/75 mx-auto w-5/12 h-10 rounded-full hover:shadow">
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

      <div className="border-b border-slate-200 my-5 w-full"></div>

      <div className="bg-white px-5 py-5">
        <h3 className="text-base font-semibold mb-4">Settings</h3>
        <div className="flex flex-col items-stretch justify-start gap-3">
          <div className="flex items-center justify-between bg-slate-100 h-12 px-4 rounded-lg">
            <div className="flex items-center gap-4">
              <UserEdit size="24" variant="Bulk" className="text-slate-600" />
              <span className="text-slate-600 text-sm font-normal">
                Edit Profile
              </span>
            </div>
            <ArrowRight2
              size="20"
              variant="TwoTone"
              className="text-grayfont"
            />
          </div>
          <div className="flex items-center justify-between bg-slate-100 h-12 px-4 rounded-lg">
            <div className="flex items-center gap-4">
              <NotificationBing
                size="24"
                variant="Bulk"
                className="text-slate-600"
              />
              <span className="text-slate-600 text-sm font-normal">
                Notifications
              </span>
            </div>
            <ArrowRight2
              size="20"
              variant="TwoTone"
              className="text-grayfont"
            />
          </div>
          <div className="flex items-center justify-between bg-slate-100 h-12 px-4 rounded-lg">
            <div className="flex items-center gap-4">
              <Bookmark size="24" variant="Bulk" className="text-slate-600" />
              <span className="text-slate-600 text-sm font-normal">Saved</span>
            </div>
            <ArrowRight2
              size="20"
              variant="TwoTone"
              className="text-grayfont"
            />
          </div>
          <div className="flex items-center justify-between bg-redError/20 h-12 px-4 rounded-lg">
            <div className="flex items-center gap-4">
              <LogoutCurve size="24" variant="Bulk" className="text-redError" />
              <span className="text-redError text-sm font-normal">Logout</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-slate-200 my-5 w-full"></div>

      <div className="bg-white px-5 py-5">
        <h3 className="text-base font-semibold mb-4">Feedback</h3>
        <div className="flex flex-col items-stretch justify-start gap-3">
          <div className="flex items-center justify-between bg-slate-100 h-12 px-4 rounded-lg">
            <div className="flex items-center gap-4">
              <Star1 size="24" variant="Bulk" className="text-slate-600" />
              <span className="text-slate-600 text-sm font-normal">
                Rate Us
              </span>
            </div>
            <ArrowRight2
              size="20"
              variant="TwoTone"
              className="text-grayfont"
            />
          </div>
          <div className="flex items-center justify-between bg-slate-100 h-12 px-4 rounded-lg">
            <div className="flex items-center gap-4">
              <InfoCircle size="24" variant="Bulk" className="text-slate-600" />
              <span className="text-slate-600 text-sm font-normal">
                Report a bug
              </span>
            </div>
            <ArrowRight2
              size="20"
              variant="TwoTone"
              className="text-grayfont"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
