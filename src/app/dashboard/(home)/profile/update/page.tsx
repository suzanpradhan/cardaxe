import { Edit } from 'iconsax-react';
import Image from 'next/image';

const UpdateProfile = () => {
  return (
    <section className="max-w-3xl mx-auto mb-20">
      <div className="bg-white px-5 py-9">
        <div className="flex flex-col items-stretch gap-5">
          <h3 className="text-xl font-semibold mb-5">Edit Profile</h3>
          <div className="flex items-center justify-between w-full rounded-lg bg-slate-100 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="relative overflow-hidden w-14 h-14 rounded-full">
                <Image
                  src={`/profile/profile.png`}
                  alt="profile-image"
                  objectFit="cover"
                  layout="fill"
                  sizes="(max-width: 2000px) 75vw, 33vw"
                />
              </div>
              <div>
                <h3 className="text-base font-semibold">Niwesh Shrestha</h3>
                <p className="text-sm font-normal">Free Plan</p>
              </div>
            </div>
            <button className="block md:hidden h-10 bg-blueTheme text-white px-2 rounded shadow-lg shadow-blueTheme/60">
              <Edit size="24" variant="Bulk" className="text-white" />
            </button>
            <button className="hidden md:block h-10 bg-blueTheme text-white px-2 rounded shadow-lg shadow-blueTheme/60">
              Change Profile
            </button>
          </div>
          <div className="flex flex-col justify-stretch gap-1">
            <label htmlFor="username" className="text-grayfont">
              Username
            </label>
            <div className="h-12 border bg-slate-100 flex items-stretch rounded focus-within:ring-2">
              <div className="px-4 bg-slate-300 flex items-center">
                cardaxe.com/
              </div>
              <input
                type="text"
                placeholder="niwesh_shrestha"
                className="w-full bg-transparent indent-3 outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col justify-stretch gap-1">
            <label htmlFor="username" className="text-grayfont">
              Full name
            </label>
            <div className="h-12 border bg-slate-100 flex items-stretch rounded focus-within:ring-2">
              <input
                type="text"
                placeholder="eg. Niwesh Shrestha"
                className="w-full bg-transparent indent-3 outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col justify-stretch gap-1">
            <label htmlFor="username" className="text-grayfont">
              Location
            </label>
            <div className="h-12 border bg-slate-100 flex items-stretch rounded focus-within:ring-2">
              <input
                type="text"
                placeholder="Istanbul, Turkey"
                className="w-full bg-transparent indent-3 outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col justify-stretch gap-1">
            <label htmlFor="username" className="text-grayfont">
              Gender
            </label>
            <div className="h-12 border bg-slate-100 flex items-stretch rounded focus-within:ring-2">
              <select
                placeholder="Istanbul, Turkey"
                className="w-full bg-transparent indent-3 outline-none"
              >
                <option value="1">Male</option>
                <option value="2">Female</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col justify-stretch gap-1">
            <label htmlFor="username" className="text-grayfont">
              Bio
            </label>
            <div className="border bg-slate-100 flex items-stretch rounded focus-within:ring-2">
              <textarea
                rows={5}
                placeholder="Tell something about you..."
                className="w-full bg-transparent indent-3 outline-none py-2"
              ></textarea>
            </div>
          </div>
          <button className="h-10 bg-blueTheme text-white px-2 rounded shadow-lg shadow-blueTheme/60">
            Update Profile
          </button>
        </div>
      </div>
    </section>
  );
};

export default UpdateProfile;
