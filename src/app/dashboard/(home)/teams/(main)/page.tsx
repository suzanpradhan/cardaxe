'use client';

import ButtonForm from '@/components/ButtonForm';
import { SearchNormal1 } from 'iconsax-react';
import React from 'react';
import logo from '../../../../../../public/logo.png';
import image1 from '../../../../../../public/staticImages/1.jpg';
import image2 from '../../../../../../public/staticImages/2.jpg';
import image3 from '../../../../../../public/staticImages/3.jpg';
import image4 from '../../../../../../public/staticImages/4.jpg';
import image5 from '../../../../../../public/staticImages/5.jpg';
import MyTeamsCard from '@/components/teams/MyTeamsCard';
import { useRouter } from 'next/navigation';

const MY_CARDS_ITEMS = [
  {
    themeColor: 'black',
    organizationName: 'Compeling',
    logo: logo,
    images: [image1, image2, image3, image4, image5],
  },
  {
    themeColor: 'red',
    organizationName: 'WebsiteUrl',
    logo: logo,
    images: [image1, image2, image3, image4, image5],
  },
  {
    themeColor: 'green',
    organizationName: 'Roft.ru',
    logo: logo,
    images: [image1, image2, image3, image4, image5],
  },
];

const Page = () => {
  const router = useRouter();
  const handleClick = () => router.push('/dashboard/teams/createNewTeam');
  const handleCardClick = () => router.push('/dashboard/teams/myTeams');

  return (
    <div className="max-w-5xl mx-auto grid gap-4 p-4">
      <h2 className="font-bold">My Teams</h2>
      <div className="flex gap-2">
        <label
          htmlFor="input"
          className="flex  items-center  focus-within:border-blueTheme focus-within:text-blueTheme text-grayfont border-1 border-borderMain rounded-md grow"
        >
          <SearchNormal1 size="36" className="px-2 " variant="Bulk" />
          <input
            className="grow h-full rounded-md focus:outline-0"
            id="input"
            placeholder="Search"
          />
        </label>
        <div className="shadow-md shadow-blueTheme rounded-lg">
          <ButtonForm
            label="Create Team"
            bluebackground
            handleClick={handleClick}
          />
        </div>
      </div>
      <div className="flex justify-between gap-4">
        {MY_CARDS_ITEMS.map((item, index) => (
          <MyTeamsCard
            handleCardClick={handleCardClick}
            themeColor={item.themeColor}
            key={index}
            images={item.images}
            logo={item.logo}
            organizationName={item.organizationName}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
