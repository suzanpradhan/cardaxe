'use client';

import ButtonForm from '@/components/ButtonForm';
import { Calendar, Eye, Flash, Link21, Share } from 'iconsax-react';
import AnalyticsCard from './(components)/AnalyticsCard';
import LineGraph from './(components)/LineGraph';

const analyticsData = [
  {
    icon: <Eye size="32" variant="Bulk" className="text-blueTheme" />,
    label: 'Views',
    count: 230,
    secoundaryCount: 130,
    increase: 15,
  },
  {
    icon: <Share size="32" variant="Bulk" className="text-blueTheme" />,
    label: 'Share',
    count: 13,
    secoundaryCount: 20,
    increase: -5,
  },
  {
    icon: <Flash size="32" variant="Bulk" className="text-blueTheme" />,
    label: 'Connections',
    count: 230,
    secoundaryCount: 130,
    increase: 15,
  },
  {
    icon: <Link21 size="32" variant="Bulk" className="text-blueTheme" />,
    label: 'Link Taps',
    count: 230,
    secoundaryCount: 130,
    increase: 15,
  },
];

const page = () => {
  return (
    <div className="p-4 pt-6">
      <div className="flex gap-2">
        <h2 className="mb-5 grow text-xl font-semibold">Analytics</h2>
        {/* <button
          label="Jul 08, 2023 - Jul 14, 2023"
          className="max-w-[16rem]"

        /> */}
        <button className="flex h-10 items-center gap-2 rounded-md border-1 border-blueTheme bg-white px-2 py-1 text-blueTheme">
          <Calendar variant="Bulk" size={20} />
          Jul 08, 2023 - Jul 14, 2023
        </button>
        <ButtonForm label="Export" className="max-w-[6rem]" />
      </div>
      <div className="mt-2 flex w-full gap-2">
        {analyticsData.map((item, index) => (
          <AnalyticsCard
            key={index}
            count={item.count}
            secoundaryCount={item.secoundaryCount}
            icon={item.icon}
            increase={item.increase}
            label={item.label}
          />
        ))}
      </div>
      <div>
        <LineGraph />
      </div>
    </div>
  );
};

export default page;
